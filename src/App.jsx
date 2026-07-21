import './App.css';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useState } from 'react';
    
  const todos = [
    {id: 1, title: "celebrate completing coding assignment for week 1"},
    {id: 2, title: "draft mindset assignment for week 1"},
    {id: 3, title: "review week 2 to make todos"},
  ]

function App() {
  const [todoList, setTodoList] = useState(todos);
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
