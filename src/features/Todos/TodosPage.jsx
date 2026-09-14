import { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
import useDebounce from '../../utils/useDebounce';
import FilterInput from '../../shared/FilterInput';
import SortBy from '../../shared/SortBy';

function TodosPage({token}) {
    //todoList holds current state
    //setTodoList updates the new state when called
    const [todoList, setTodoList] = useState([]);

    //stores API error messages
    const [error, setError] = useState("");
    const [filterError, setFilterError] = useState("");

    //tracks whether todo list is loading
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");

    const [filterTerm, setFilterTerm] = useState("");
    
    const debouncedFilterTerm = useDebounce(filterTerm, 300);
    const handleFilterChange = (newTerm) => {
      setFilterTerm(newTerm);
    };

    const [dataVersion, setDataVersion] = useState(0);

    const invalidateCache = useCallback(() => {
      setDataVersion(prev => prev + 1);
    }, []);


    useEffect(() => {
    if (!token) return;

    const fetchTodos = async () => {
      setIsTodoListLoading(true);

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('unauthorized');
        }

        if (!response.ok) {
          throw new Error('Unable to fetch todos');
        }

        const data = await response.json();

        setTodoList(data.tasks);
        setError("");
        setFilterError("");

      } catch (error) {
        if (
          debouncedFilterTerm || 
          sortBy !== "createdAt" || 
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        }  else {
            setError(`Error fetching todos: ${error.message}`);
        }
      } finally {
        setIsTodoListLoading(false);
      }
    };

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);
  
  const addTodo = async (todoTitle) => {
  const newTodo = {
    id: Date.now(),
    title: todoTitle,
    isCompleted: false,
  };

  // Optimistically add the new todo to the list immediately
  setTodoList((previous) => [newTodo, ...previous]);

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        title: todoTitle,
        isCompleted: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Unable to add todo');
    }

    const data = await response.json();

    // Replace temporary todo with the todo returned by the server
    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === newTodo.id ? data : todo
      )
    );

    invalidateCache();

    setError("");
  } catch (error) {
    // Remove the temporary todo if the API request failed
    setTodoList((previous) =>
      previous.filter((todo) => todo.id !== newTodo.id)
    );

    setError(error.message);
  }
};

  const completeTodo = async (id) => {
    // Store the original todo in case we need to roll back
    const originalTodo = todoList.find((todo) => todo.id === id);
    if (!originalTodo) {
    return;
}

    // Optimistically mark the todo as completed
    setTodoList((previous) =>
      previous.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: true };
        }

        return todo;
      })
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to complete todo');
      }
    const data = await response.json();

    setTodoList((previous) =>
    previous.map((todo) =>
        todo.id === id ? data : todo
      )
   );

   invalidateCache();

   setError("");
    } catch (error) {
      // Roll back to the original todo if the API request failed
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === id ? originalTodo : todo
        )
      );

      setError(error.message);
    }
  };

  const updateTodo = async (editedTodo) => {
    // Store the original todo in case we need to roll back
    const originalTodo = todoList.find(
      (todo) => todo.id === editedTodo.id
    );
    if (!originalTodo) {
    return;
}

    // Optimistically update the todo
    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === editedTodo.id ? { ...editedTodo } : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to update todo');
      }
      const data = await response.json();

        setTodoList((previous) =>
        previous.map((todo) =>
            todo.id === editedTodo.id ? data : todo
            )
        );

        invalidateCache();

        setError("");
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo
        )
      );

      setError(error.message);
    }
  };
  
    return(
        <div>
            {error && (
                <div>
                    <p>{error}</p>
                    <button onClick={() => setError('')}>Clear Error</button>
                </div>
           )}

      {filterError && (
        <div>
          <p>{filterError}</p>

          <button onClick={() => setFilterError("")}>
            Clear Filter Error
          </button>

          <button
            onClick={() => {
              setFilterTerm("");
              setSortBy("createdAt");
              setSortDirection("desc");
              setFilterError("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}
            <FilterInput
                filterTerm={filterTerm}
                onFilterChange={handleFilterChange}
            />
            <SortBy
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortByChange={setSortBy}
              onSortDirectionChange={setSortDirection}
            />
            <TodoForm onAddTodo={addTodo} />
            <TodoList 
                todoList={todoList} 
                onCompleteTodo={completeTodo} 
                onUpdateTodo={updateTodo}
                dataVersion={dataVersion}
            />
        </div>
    );
}

export default TodosPage;