import TodoListItem from "./TodoListItem";
import { useMemo } from "react";

const TodoList = ({ todoList, onCompleteTodo, onUpdateTodo, dataVersion }) => {

  const filteredTodoList = useMemo(() => {
    console.log(`Recalculating filtered todos (v${dataVersion})`);
    
    const incompleteTodos = todoList.filter((todo) => !todo.isCompleted);

    return {
      version: dataVersion,
      todos: incompleteTodos,
    };
  }, [todoList, dataVersion]);

  return filteredTodoList.length === 0 ? (
    <p>Add todo above to get started</p>
  ) : (
    <ul>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;