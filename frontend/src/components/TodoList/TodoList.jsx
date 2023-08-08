import classes from "./todoList.module.css";
import TodoCard from "../TodoCard/TodoCard";
import CreateTodoCard from "../CreateTodoCard/CreateTodoCard";
const Todo = (props) => {
  const type = props.type;
  const titles = {
    noStatus: "No Status",
    upcoming: "Upcoming",
    inProgress: "In Progress",
    completed: "Completed",
  };
  return (
    <div className={`${classes.todolist} ${type}`}>
      <div className={classes.header}>
        <div
          className={classes.title}
          style={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
          }}
        >
          {titles[type]}
        </div>
        <div
          className={classes.count}
          style={{ backgroundColor: `var(--${type})` }}
        >
          0
        </div>
      </div>
      <div className={classes.content}>
        {/* {props.children} */}
        <TodoCard status="warning" />
        <TodoCard status="danger" />
        <CreateTodoCard />
        <div className={`${classes.addTodo} `}>+ Add Todo</div>
      </div>
    </div>
  );
};

export default Todo;
