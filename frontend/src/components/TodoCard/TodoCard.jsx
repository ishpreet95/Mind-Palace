import classes from "./todoCard.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import dayjs from "dayjs";

const TodoCard = (props) => {
  // console.log(props);
  const todo = props.todo;
  const endDate = dayjs(todo.endDate).format("DD MMM YYYY");
  const mapping = {
    2: "High",
    1: "Medium",
    0: "Low",
  };
  const deleteTodoHandler = () => {
    console.log("delete todo");
  };
  return (
    <div className={`${classes.todocard} `}>
      <div className={classes.header}>
        <Dropdown>
          <MenuButton
            size="sm"
            variant="soft"
            color="neutral"
            // slots={{ root: IconButton }}
            // slotProps={{ root: { variant: "outlined", color: "neutral" } }}
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
        <div className={classes.date}>{endDate}</div>
        <div className={`${classes.status} ${mapping[todo.severity]}`}>
          {mapping[todo.severity]}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
