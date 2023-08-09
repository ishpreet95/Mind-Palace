import classes from "./todoCard.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
const TodoCard = (props) => {
  const mapping = {
    danger: "High",
    warning: "Medium",
    success: "Low",
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
