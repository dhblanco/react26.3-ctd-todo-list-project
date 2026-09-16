import { useRef, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import {
  isValidTodoTitle,
  getTodoTitleError,
} from "../../utils/todoValidation";

function TodoForm({ onAddTodo }) {
  const inputRef = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [hasTouchedTitle, setHasTouchedTitle] = useState(false);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;

    setWorkingTodoTitle(newTitle);

    if (hasTouchedTitle) {
      setTitleError(getTodoTitleError(newTitle));
    }
  };

  const handleTitleBlur = () => {
    setHasTouchedTitle(true);
    setTitleError(getTodoTitleError(workingTodoTitle));
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    const error = getTodoTitleError(workingTodoTitle);
    setTitleError(error);

    if (error) {
      setHasTouchedTitle(true);
      return;
    }

    onAddTodo(workingTodoTitle.trim());
    setWorkingTodoTitle("");
    setTitleError("");
    setHasTouchedTitle(false);
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleAddTodo} noValidate>
      <TextInputWithLabel
        ref={inputRef}
        value={workingTodoTitle}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        elementId="todoTitle"
        labelText="Add new todo: "
        maxLength={100}
      />

      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>

      {workingTodoTitle.length > 0 && (
        <p role="alert"> {workingTodoTitle.length} / 100 characters </p>
      )}

      {titleError && <p role="alert" onClick={() => setTitleError("")}>{titleError}</p>}

    </form>
  );
}

export default TodoForm;
