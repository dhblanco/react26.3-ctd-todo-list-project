export function isValidTodoTitle(title) {
  const trimmedTitle = title.trim();

  return trimmedTitle.length > 0 && trimmedTitle.length <= 100;
}

export function getTodoTitleError(title) {
  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    return "Whoops! Please enter a todo. (REQUIRED)";
  }

  if (trimmedTitle.length > 100) {
    return "Sorry, each todo must be 100 characters or less.";
  }

  return "";
}
