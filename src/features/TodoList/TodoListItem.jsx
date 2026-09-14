import { useState, useRef } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };
  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };
  const handleUpdate = (event) => {
    if (isEditing === false) {
      return;
    }
    event.preventDefault();

    if (isValidTodoTitle(workingTitle)) {
      onUpdateTodo({
        ...todo,
        title: workingTitle,
      });
      setIsEditing(false);
    }
  };

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <TextInputWithLabel
            value={workingTitle}
            onChange={handleEdit}
            ref={inputRef}
            elementId={`todoTitle${todo.id}`}
            labelText="Todo"
          />
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}

        {isEditing && (
          <>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
