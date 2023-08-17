import classes from "./todoCard.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const TodoCard = (props) => {
  // console.log(props);
  const todo = props.todo;
  // console.log(props);
  const currentDate = dayjs();
  const endDate = dayjs(todo.endDate);
  let dueDate = endDate.format("DD MMM YYYY");

  const differenceInDays = endDate.diff(currentDate, "days");

  if (differenceInDays === 0) {
    dueDate = "Today";
  } else if (differenceInDays === 1) {
    dueDate = "Tomorrow";
  }

  const mapping = {
    2: "High",
    1: "Medium",
    0: "Low",
  };
  const deleteTodoHandler = () => {
    console.log("delete todo");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation when the card appears
      exit={{ opacity: 0, y: -20 }} // Animation when the card exits
      transition={{ duration: 0.5 }} // Animation duration
      className={classes.todocard}
    >
      {/* <div className={`${classes.todocard} `}> */}
      <div className={classes.header}>
        <div className={classes.altDate}>
          <AccessTimeIcon
            size="sm"
            variant="plain"
            // color="neutral"
            sx={{
              fontSize: "1.3em",
              color: "#868686",
              color:
                dueDate === "Tomorrow"
                  ? "#2564BF"
                  : dueDate === "Today"
                  ? "red"
                  : "#868686",
            }}
          />
          <div
            className={classes.date}
            style={{
              color:
                dueDate === "Tomorrow"
                  ? "#2564BF"
                  : dueDate === "Today"
                  ? "red"
                  : "#868686",
              fontWeight:
                dueDate !== "Today" && dueDate !== "Tomorrow" ? "400" : "500",
            }}
          >
            {dueDate}
          </div>
        </div>
        <Dropdown>
          <MenuButton
            size="sm"
            variant="plain"
            // color="neutral"
            sx={{ minHeight: "0.1em", width: "1em", color: "#868686" }}
          >
            <MoreHorizIcon sx={{ fontSize: "22px" }} />
          </MenuButton>
          <Menu>
            <MenuItem onClick={deleteTodoHandler} sx={{ color: "red" }}>
              Delete
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div className={classes.content}>{todo.title}</div>
      <div className={classes.footer}>
        <div className={`${classes.status} ${mapping[todo.severity]}`}>
          {mapping[todo.severity]}
        </div>
      </div>
      {/* </div> */}
    </motion.div>
  );
};

export default TodoCard;
