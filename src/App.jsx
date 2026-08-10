import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import { useState } from 'react';

function App() {
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

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
