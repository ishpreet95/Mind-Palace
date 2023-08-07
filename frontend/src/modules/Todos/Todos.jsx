import classes from "./todos.module.css";
import TodoList from "../../components/TodoList/TodoList";
const Todos = () => {
  return (
    <div className={classes.todos}>
      <TodoList type="noStatus" />
      <TodoList type="upcoming" />
      <TodoList type="inProgress" />
      <TodoList type="completed" />
    </div>
  );
};

export default Todos;
