import { useRef } from "react";

function TodoForm({ onAddTodo }) {
    const inputRef = useRef(null);
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    const handleAddTodo = (event) => {
        event.preventDefault();
        
        const todoTitle = event.target.todoTitle.value.trim();
        if (todoTitle) {
            onAddTodo(todoTitle);
            event.target.reset();
            inputRef.current.focus();
        }
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input 
                ref={inputRef} 
                type="text" 
                id="todoTitle"
                name="todoTitle"
                placeholder={'Todo text'}
                //prevent browser from submitting with an empty form
                required
                value={workingTodoTitle}
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button 
                type="submit"
                disabled={!workingTodoTitle.trim()}
            >
                Add Todo
            </button>
        </form>
    );
}

export default TodoForm;