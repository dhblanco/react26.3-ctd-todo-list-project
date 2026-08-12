import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem ({todo,onCompleteTodo}) {
    const [isEditing, setIsEditing] = useState("");
    const [workingTitle, setWorkingTitle] = useState(todo.title);
    const handleCancel = () => {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    };
    const handleEdit = (event) => {
        setWorkingTitle(event.target.value);
    }

    return (
    <li>
        <form>
            {isEditing ? (
                <>
                    <TextInputWithLabel 
                        value={workingTitle}
                        onChange={handleEdit}
                    />
                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </>
            ) : ( 
                <>
                    <label>
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => onCompleteTodo(todo.id)}
                         />
                    </label>
                    <span onClick={() => setIsEditing(true)}>
                        {todo.title}
                    </span>
                </>
            )}
        </form>
    </li>
)};

export default TodoListItem;