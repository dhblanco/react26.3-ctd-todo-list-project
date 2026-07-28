import { useRef } from "react";

const TodoForm = () => {
    const inputRef = useRef(null);

    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.todoTitle.value.trim();
        console.log(todoTitle);
        inputRef.current.focus();
        console.log(inputRef);
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input ref={inputRef} type="text" id="todoTitle" />
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default TodoForm;