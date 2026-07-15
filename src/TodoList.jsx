function TodoList() {
    
  const todoList = [
    {id: 1, title: "celebrate completing coding assignment for week 1"},
    {id: 2, title: "draft mindset assignment for week 1"},
    {id: 3, title: "review week 2 to make todos"},
  ]

    return (
        <ul>
            {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>    );
}

export default TodoList;