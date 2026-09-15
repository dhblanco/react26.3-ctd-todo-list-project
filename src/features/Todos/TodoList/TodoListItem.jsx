import { useState, useRef } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle,  getTodoTitleError } from "../../../utils/todoValidation";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [titleError, setTitleError] = useState("");

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
    setTitleError("");
  };

  const handleUpdate = (event) => {
    if (isEditing === false) {
      return;
    }

    event.preventDefault();

    const error = getTodoTitleError(workingTitle);

    if (error) {
      return;
    }

    onUpdateTodo({
      ...todo,
      title: workingTitle.trim(),
    });

    setIsEditing(false);
  };

  return (
    <li>
      {titleError && <p role="alert">{titleError}</p>}
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <TextInputWithLabel
            value={workingTitle}
            onChange={handleEdit}
            ref={inputRef}
            elementId={`todoTitle${todo.id}`}
            labelText="Todo"
            maxLength={100}
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
              type="submit"
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
            <button type="button" onClick={() => onDeleteTodo(todo.id)}>
              Delete
            </button>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
