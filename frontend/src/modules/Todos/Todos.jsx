import classes from "./todos.module.css";
import { getTodos, reorderTodos, updateTodo } from "../../slices/todosSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import TodoList from "../../components/TodoList/TodoList";
const Todos = () => {
  const dispatch = useDispatch();
  const toUpdateData = useSelector((state) => {
    // console.log(state.todos.updateTodo);
    state.todos.toUpdate;
  });

  useEffect(() => {
    dispatch(getTodos())
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(toUpdateData);
    if (toUpdateData !== undefined) {
      console.log(toUpdateData);
      dispatch(updateTodo(toUpdateData))
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, toUpdateData]);

  const types = ["noStatus", "upcoming", "inProgress", "completed"];

  const handleDragAndDrop = (result) => {
    if (!result.destination) {
      return;
    }

    // Determine source and destination lists
    const source = result.source;
    const destination = result.destination;
    const draggableId = result.draggableId;
    // console.log({ source, destination, draggableId });
    dispatch(reorderTodos({ source, destination, draggableId }));

    // dispatch(updateTodo(updatedTodo));
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className={classes.todos}>
        {types.map((type, key) => (
          <TodoList type={type} key={key} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Todos;
