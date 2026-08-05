function TodoListItem ({todo,onCompleteTodo}) {
    return (
    <li>
        <input
            type="checked"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
        />
        {todo.title}</li>
};

export default TodoListItem;