import classes from "./notes.module.css";
import Note from "../../components/Note/Note";
const Notes = () => {
  return (
    <div className={classes.notes}>
      <Note />
    </div>
  );
};

export default Notes;
