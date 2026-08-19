import { useState } from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';

function TodosPage() {
      //todoList holds current state
  //setTodoList updates the new state when called
  const [todoList, setTodoList] = useState([]);
  
  const addTodo = (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    //ask React to update todo list state
    //pass React a callback function
    //then React supplies most updated todo list as "previous"
    setTodoList((previous) => [newTodo, ...previous]);
  };

  const completeTodo = (id) => {
    //declare previous todo list as parameter
    setTodoList((previous) => {
      return previous.map( (todo) => {
        if (todo.id === id) {
          return {...todo, isCompleted: true};
          } 
        return todo;
      })
    });
  };

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((todo) => {
        if (todo.id === editedTodo.id) {
          return {...editedTodo};
        }
        return todo;
    });
    setTodoList(updatedTodos);
  };
  
    return(
        <div>
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