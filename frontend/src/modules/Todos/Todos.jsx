import classes from "./todos.module.css";
import { getTodos, reorderTodos } from "../../slices/todosSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import TodoList from "../../components/TodoList/TodoList";
const Todos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos())
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const types = ["noStatus", "upcoming", "inProgress", "completed"];

  const handleDragAndDrop = (result) => {
    if (!result.destination) {
      return;
    }

    // Determine source and destination lists
    const source = result.source;
    const destination = result.destination;
    const draggableId = result.draggableId;
    console.log({ source, destination, draggableId });
    dispatch(reorderTodos({ source, destination, draggableId })).catch(
      (error) => {
        console.log(error);
      }
    );
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
