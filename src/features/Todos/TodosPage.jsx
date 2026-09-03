import { useEffect, useCallback, useReducer } from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
import useDebounce from '../../utils/useDebounce';
import FilterInput from '../../shared/FilterInput';
import SortBy from '../../shared/SortBy';
import { 
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../../reducers/todoReducer';

function TodosPage({token}) {

  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  
  function handleFilterChange(newTerm) {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { newTerm },
    });
  };

/* NOT NEEDED ANYMORE SINCE DATAVERSION BELONGS TO REDUCER NOW

  const invalidateCache = useCallback(() => {
    setDataVersion(prev => prev + 1);
  }, []);
  
*/

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {

      dispatch({ 
        type: TODO_ACTIONS.FETCH_START
      });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        };

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('unauthorized');
        };

        if (!response.ok) {
          throw new Error('Unable to fetch todos');
        };

        const data = await response.json();

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: {
            todos: data.tasks
          },
        });

      } catch (error) {

        const isFilterError = debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "desc";

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError
              ? `Error filtering/sorting todos: ${error.message}`
              : `Error fetching todos: ${error.message}`,
            isFilterError,
          },
        });
      }
    } 

    fetchTodos();

  }, [token, sortBy, sortDirection, debouncedFilterTerm]);
  
  async function addTodo(todoTitle) {

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: { newTodo },
    });


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

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_SUCCESS,
      payload: { 
        newTodo,
        data,
       },
    });

    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          newTodo,
          message: error.message,
        },
      });

    }
  }

  const completeTodo = async (id) => {
    // Store the original todo in case we need to roll back
    const originalTodo = todoList.find((todo) => todo.id === id);
   
    if (!originalTodo) {
      return;
    };

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { id, },
    });

    /* MIGRATE TO COMPELTE_TODO_START
    // Optimistically mark the todo as completed
    setTodoList((previous) =>
      previous.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: true };
        }

        return todo;
      })
    );
    */

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

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      payload: { data, id, },
    });
      /* MIGRRATE TO COMPLETE_TODO_SUCCESS:
        setTodoList((previous) =>
        previous.map((todo) =>
            todo.id === id ? data : todo
          )
      );

      invalidateCache();

      setError("");
      */
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          message: error.message,
        },
      });
      /* MIGRATE TO COMPLETE_TODO_ERROR:
        // Roll back to the original todo if the API request failed
        setTodoList((previous) =>
          previous.map((todo) =>
            todo.id === id ? originalTodo : todo
          )
        );

        setError(error.message);
      */
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
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: { editedTodo, },
    });
    /* MIGRATE TO UPDATE_TODO_START
    // Optimistically update the todo
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? { ...editedTodo } : todo
        )
      );
    */
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
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: { data, editedTodo, },
      });
      /* MIGRATE TO UPDATE_TODO_SUCCESS:
        setTodoList((previous) =>
        previous.map((todo) =>
            todo.id === editedTodo.id ? data : todo
            )
        );

        invalidateCache();

        setError("");
      */
    } catch (error) {
            dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: { 
          editedTodo,
          originalTodo,
          message: error.message, },
      });
      /* MIGRATE TO UPDATE_TODO_ERROR:
        setTodoList((previous) =>
          previous.map((todo) =>
            todo.id === editedTodo.id ? originalTodo : todo
          )
        );

        setError(error.message);
      */
    }
  };
  
    return(
        <div>
            {error && (
                <div>
                    <p>{error}</p>
                    <button onClick={() => {
                      dispatch({ type: TODO_ACTIONS.CLEAR_ERROR, });
                    }}>Clear Error</button>
                </div>
           )}

      {filterError && (
        <div>
          <p>{filterError}</p>

          <button onClick={() => {
            dispatch({ type: TODO_ACTIONS.CLEAR_ERROR, });
          }}>
            Clear Filter Error
          </button>

          <button
            onClick={() => {
+              dispatch({ type: TODO_ACTIONS.RESET_FILTERS, });
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
              onSortByChange={(newSortBy) =>
                dispatch({ 
                  type: TODO_ACTIONS.SET_SORT, 
                  payload: {
                    sortBy: newSortBy,
                    sortDirection: sortDirection,
                },
                })                
              }
              onSortDirectionChange={(newSortDirection) =>
                dispatch({ 
                  type: TODO_ACTIONS.SET_SORT, 
                  payload: {
                    sortBy: sortBy,
                    sortDirection: newSortDirection,
                  },
                })                
              }
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