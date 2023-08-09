import { useState } from "react";
import classes from "./CreateTodoCard.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Textarea from "@mui/joy/Textarea";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Slider from "@mui/joy/Slider";
import { postTodo } from "../../slices/todosSlice";
import { useDispatch, useSelector } from "react-redux";
const CreateTodoCard = (props) => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [endDate, setEndDate] = useState(dayjs("2021-01-01"));
  const [severity, setSeverity] = useState(0);
  const [sliderColor, setSliderColor] = useState("success");
  const type = props.type;
  const marks = [
    {
      value: 0,
      label: "Low",
    },
    {
      value: 1,
      label: "Medium",
    },

    {
      value: 2,
      label: "High",
    },
  ];

  const severityHandler = (event, value) => {
    setSeverity(value);
    if (value === 0) {
      setSliderColor("success");
    } else if (value === 2) {
      setSliderColor("danger");
    } else {
      setSliderColor("primary");
    }
    console.log(value);
  };

  const createTodoHandler = () => {
    const newTodo = {
      title: todo,
      endDate: endDate,
      severity: severity,
      type: type,
    };
    dispatch(postTodo(newTodo));
  };
  return (
    <div className={classes.createtodocard}>
      <div className={classes.header}>
        <div className={classes.title}>Create Todo</div>
        <div onClick={props.closeCreateTodo}>
          <CloseIcon fontSize="small" sx={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className={classes.content}>
        <Textarea
          size="md"
          placeholder="Write here . . ."
          minRows={4}
          variant="soft"
          sx={{
            backgroundColor: "#f0f0f0",
            fontSize: "16px",
            fontWeight: "400",
          }}
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
      <div
        className={classes.status}
        style={{
          backgroundColor:
            sliderColor === "success"
              ? "#C7FFBE"
              : sliderColor === "danger"
              ? "#FFE2E2"
              : "#BED8FF",
        }}
      >
        <div
          style={{
            width: "90%",
            fontSize: "14px",
          }}
        >
          Task Severity
        </div>
        <Slider
          aria-label="Custom marks"
          defaultValue={0}
          step={1}
          max={2}
          valueLabelDisplay="off"
          marks={marks}
          size="sm"
          sx={{ width: "80%" }}
          color={sliderColor}
          onChange={severityHandler}
        />
      </div>
      <div className={classes.enddate}>
        <div style={{ width: "90%", fontSize: "13px", fontWeight: "500" }}>
          Last Due Date
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            format="LL"
            size="small"
            sx={{
              width: "90%",
              backgroundColor: "white",
              border: "none",
            }}
          />
        </LocalizationProvider>
      </div>
      <button className={classes.btn} onClick={createTodoHandler}>
        Done
      </button>
    </div>
  );
};

export default CreateTodoCard;
