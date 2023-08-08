import classes from "./todoCard.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const TodoCard = (props) => {
  const mapping = {
    danger: "High",
    warning: "Medium",
    success: "Low",
  };
  return (
    <div className={`${classes.todocard} `}>
      <div className={classes.header}>
        <MoreHorizIcon sx={{ fontSize: "22px", cursor: "pointer" }} />
      </div>
      <div className={classes.content}>Content here</div>
      <div className={classes.footer}>
        <div className={classes.date}>24 July</div>
        <div className={`${classes.status} ${props.status} `}>
          {mapping[props.status]}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
