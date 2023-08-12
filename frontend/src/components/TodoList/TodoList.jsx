import { useState } from "react";
import classes from "./todoList.module.css";
import TodoCard from "../TodoCard/TodoCard";
import CreateTodoCard from "../CreateTodoCard/CreateTodoCard";
const Todo = (props) => {
  const [showCreateTodoCard, setShowCreateTodoCard] = useState(false);
  const data = props.data;
  const type = props.type;
  // console.log(props);
  const titles = {
    noStatus: "No Status",
    upcoming: "Upcoming",
    inProgress: "In Progress",
    completed: "Completed",
  };
  const closeCreateTodo = () => {
    setShowCreateTodoCard(false);
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
        {data.map((todo, key) => (
          <TodoCard key={key} todo={todo} />
        ))}

        {showCreateTodoCard ? (
          <div className={`transition ${showCreateTodoCard ? "active" : ""}`}>
            <CreateTodoCard closeCreateTodo={closeCreateTodo} type={type} />
          </div>
        ) : (
          <></>
        )}
        <div
          className={`${classes.addTodo} `}
          onClick={() => setShowCreateTodoCard(true)}
        >
          + Add Todo
        </div>
      </div>
    </div>
  );
};

export default Todo;
