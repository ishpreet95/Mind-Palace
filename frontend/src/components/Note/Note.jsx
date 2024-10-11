import classes from "./Note.module.css";
const Note = () => {
  return (
    <div className={classes.note}>
      <div className={classes.head}>Heading</div>
      <div className={classes.content}>here lies the content</div>
      <div className={classes.foot}>footer</div>
    </div>
  );
};

export default Note;
