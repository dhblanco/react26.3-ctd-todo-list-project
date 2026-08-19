import { useState, useEffect } from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';

function TodosPage({token}) {
    //todoList holds current state
    //setTodoList updates the new state when called
    const [todoList, setTodoList] = useState([]);
    //stores API error messages
    const [error, setError] = useState('');
    //tracks whether todo list is loading
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

    useEffect(() => {
    if (!token) return;

    const fetchTodos = async () => {
      setIsTodoListLoading(true);

      try {
        const params = new URLSearchParams({
          limit: 100,
        });

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
      } catch (error) {
        setError(error.message);
      } finally {
        setIsTodoListLoading(false);
      }
    };

    fetchTodos();
  }, [token]);
  
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

      {isTodoListLoading && <p>Loading todos...</p>}

            <TodoForm onAddTodo={addTodo} />
            <TodoList 
                todoList={todoList} 
                onCompleteTodo={completeTodo} 
                onUpdateTodo={updateTodo}
            />
        </div>
    );
}

export default TodosPage;