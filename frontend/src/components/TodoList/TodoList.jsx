import { useState } from "react";
import classes from "./todoList.module.css";
import TodoCard from "../TodoCard/TodoCard";
import CreateTodoCard from "../CreateTodoCard/CreateTodoCard";
import { AnimatePresence, motion } from "framer-motion";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectListByType } from "../../slices/todosSlice";

const Todo = (props) => {
  const [showCreateTodoCard, setShowCreateTodoCard] = useState(false);
  const type = props.type;
  const list = useSelector((state) => selectListByType(state, type));
  // console.log(list);
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
          {list.length}
        </div>
      </div>

      <div className={classes.content}>
        <AnimatePresence>
          {showCreateTodoCard ? (
            <motion.div
              key="model"
              initial={{ opacity: 0, y: 20 }} // Initial animation state
              animate={{ opacity: 1, y: 0 }} // Animation when the card appears
              exit={{ opacity: 0, y: -30 }} // Animation when the card exits
              transition={{ duration: 0.2 }} // Animation duration
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
              {list.map((todo, key) => (
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
