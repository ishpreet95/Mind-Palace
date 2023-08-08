import { useState } from "react";
import classes from "./CreateTodoCard.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Textarea from "@mui/joy/Textarea";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Slider from "@mui/joy/Slider";
const CreateTodoCard = () => {
  const [endDate, setEndDate] = useState(dayjs("2021-01-01"));
  const marks = [
    {
      value: 0,
      label: "Low",
    },
    {
      value: 50,
      label: "Medium",
    },

    {
      value: 100,
      label: "High",
    },
  ];
  return (
    <div className={classes.createtodocard}>
      <div className={classes.header}>
        <div className={classes.title}>Create Todo</div>
        <div>
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
        />
      </div>
      <div className={classes.status}>
        <div style={{ width: "90%", fontSize: "14px" }}>Task Status</div>
        <Slider
          aria-label="Custom marks"
          defaultValue={0}
          step={50}
          valueLabelDisplay="off"
          marks={marks}
          size="sm"
          sx={{ width: "80%" }}
        />
      </div>
      <div className={classes.enddate} sx={{}}>
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
      <button className={classes.btn}>Done</button>
    </div>
  );
};

export default CreateTodoCard;
