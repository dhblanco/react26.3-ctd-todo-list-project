import './App.css'

function App() {

  const todoList = [
    {id: 1, title: ""},
    {id: 2, title: ""},
    {id: 3, title: ""},
  ]

  return (
    <div>
      <h1>Daniela's Todo List</h1>
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    </div>
  )
}

export default App
