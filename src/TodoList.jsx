import TodoListItem from "./TodoListItem";

const TodoList = ({todoList,onCompleteTodo}) => {
    return todoList.length === 0 ? (
      <p>Add todo above to get started</p>
    ) : (
      <ul>
          { todoList.map((todo) => (
              < TodoListItem key={todo.id} todo={todo} completeTodo={onCompleteTodo}/>
            ))
          }
      </ul>    
    );
}

export default TodoList;