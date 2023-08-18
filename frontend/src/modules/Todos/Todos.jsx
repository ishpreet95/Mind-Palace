import classes from "./todos.module.css";
import TodoList from "../../components/TodoList/TodoList";
import { getTodos, reorderTodos } from "../../slices/todosSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const Todos = () => {
  const dispatch = useDispatch();
  const noStatusTodos = useSelector((state) => state.todos.noStatus);
  const upcomingTodos = useSelector((state) => state.todos.upcoming);
  const inProgressTodos = useSelector((state) => state.todos.inProgress);
  const completedTodos = useSelector((state) => state.todos.completed);

  useEffect(() => {
    dispatch(getTodos())
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   setNoStatusTodos(allTodos.filter((todo) => todo.type === "noStatus"));
  //   setUpcomingTodos(allTodos.filter((todo) => todo.type === "upcoming"));
  //   setInProgressTodos(allTodos.filter((todo) => todo.type === "inProgress"));
  //   setCompletedTodos(allTodos.filter((todo) => todo.type === "completed"));
  // }, [allTodos]);

  const listMapping = {
    noStatus: noStatusTodos,
    upcoming: upcomingTodos,
    inProgress: inProgressTodos,
    completed: completedTodos,
  };

  const handleDragAndDrop = (result) => {
    if (!result.destination) {
      return;
    }

    // Determine source and destination lists
    const source = result.source;
    const destination = result.destination;
    const draggableId = result.draggableId;
    console.log({ source, destination, draggableId });
    dispatch(reorderTodos({ source, destination, draggableId }));
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className={classes.todos}>
        <TodoList type="noStatus" data={noStatusTodos} />
        <TodoList type="upcoming" data={upcomingTodos} />
        <TodoList type="inProgress" data={inProgressTodos} />
        <TodoList type="completed" data={completedTodos} />
      </div>
    </DragDropContext>
  );
};

export default Todos;
