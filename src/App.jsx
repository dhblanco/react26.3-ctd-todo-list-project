import './App.css'

function App() {

  const todoList = [
    {id: 1, title: "celebrate completing coding assignment for week 1"},
    {id: 2, title: "draft mindset assignment for week 1"},
    {id: 3, title: "review week 2 to make todos"},
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
