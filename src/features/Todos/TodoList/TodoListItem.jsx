import { useState, useRef } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import {
  isValidTodoTitle,
  getTodoTitleError,
} from "../../../utils/todoValidation";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [titleError, setTitleError] = useState("");
  const [hasTouchedTitle, setHasTouchedTitle] = useState(false);

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setTitleError("");
    setHasTouchedTitle(false);
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    const newTitle = event.target.value;
    setWorkingTitle(newTitle);

    if (hasTouchedTitle) {
      setTitleError(getTodoTitleError(newTitle));
    }
  };

  const handleTitleBlur = () => {
    setHasTouchedTitle(true);
    setTitleError(getTodoTitleError(workingTitle));
  };

  const handleUpdate = (event) => {
    if (isEditing === false) {
      return;
    }

    event.preventDefault();

    const error = getTodoTitleError(workingTitle);
    setTitleError(error);

    if (error) {
      setHasTouchedTitle(true);
      return;
    }

    onUpdateTodo({
      ...todo,
      title: workingTitle.trim(),
    });

    setIsEditing(false);
    setTitleError("");
    setHasTouchedTitle(false);
  };

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <TextInputWithLabel
            value={workingTitle}
            onChange={handleEdit}
            onBlur={handleTitleBlur}
            ref={inputRef}
            elementId={`todoTitle${todo.id}`}
            labelText="Todo: "
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
            <button type="submit" disabled={!isValidTodoTitle(workingTitle)}>
              Update
            </button>
            <button type="button" onClick={() => onDeleteTodo(todo.id)}>
              Delete
            </button>
          </>
        )}
      </form>
      {titleError && (
        <p role="alert" onClick={() => setTitleError("")} style={{margin:"auto auto"}}>
          {titleError}
        </p>
      )}
    </li>
  );
}

export default TodoListItem;
