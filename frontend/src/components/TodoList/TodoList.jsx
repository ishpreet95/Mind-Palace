import { useState } from "react";
import classes from "./todoList.module.css";
import TodoCard from "../TodoCard/TodoCard";
import CreateTodoCard from "../CreateTodoCard/CreateTodoCard";
import { AnimatePresence, motion } from "framer-motion";
import { Droppable } from "react-beautiful-dnd";
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
  // console.log(type);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation when the card appears
      exit={{ opacity: 0, y: -20 }} // Animation when the card exits
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        duration: 0.5,
      }}
      className={`${classes.todolist} ${type}`}
    >
      <div className={classes.header}>
        <div
          className={classes.title}
          style={{
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
          }}
        >
          {titles[type]}
        </div>
        <div
          className={classes.count}
          style={{ backgroundColor: `var(--${type})` }}
        >
          {data.length}
        </div>
      </div>

      <div className={classes.content}>
        <AnimatePresence>
          {showCreateTodoCard ? (
            <motion.div
              key="model"
              initial={{ opacity: 0, y: 20 }} // Initial animation state
              animate={{ opacity: 1, y: 0 }} // Animation when the card appears
              exit={{ opacity: 0, y: -10 }} // Animation when the card exits
              transition={{ duration: 0.3 }} // Animation duration
            >
              <CreateTodoCard closeCreateTodo={closeCreateTodo} type={type} />
            </motion.div>
          ) : (
            <>
              <div
                className={`${classes.addTodo} `}
                onClick={() => setShowCreateTodoCard(true)}
              >
                + Add Todo
              </div>
            </>
          )}
        </AnimatePresence>

        <Droppable droppableId={type}>
          {(provided) => (
            <div
              className={classes.cards}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.map((todo, key) => (
                <TodoCard key={todo.id} todo={todo} index={key} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </motion.div>
  );
};

export default Todo;
