import classes from "./todos.module.css";
import TodoList from "../../components/TodoList/TodoList";
import { getTodos } from "../../slices/todosSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Todos = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todos.all);

  useEffect(() => {
    dispatch(getTodos())
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const nostatusTodos = allTodos.filter((todo) => todo.type === "noStatus");
  const upcomingTodos = allTodos.filter((todo) => todo.type === "upcoming");
  const inProgressTodos = allTodos.filter((todo) => todo.type === "inProgress");
  const completedTodos = allTodos.filter((todo) => todo.type === "completed");

  return (
    <div className={classes.todos}>
      <TodoList type="noStatus" data={nostatusTodos} />
      <TodoList type="upcoming" data={upcomingTodos} />
      <TodoList type="inProgress" data={inProgressTodos} />
      <TodoList type="completed" data={completedTodos} />
    </div>
  );
};

export default Todos;
