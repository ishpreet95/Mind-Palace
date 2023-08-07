import { useEffect } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Notes from "../Notes/Notes.jsx";
import Todos from "../Todos/Todos.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { exampleOne } from "../../slices/exampleSlice.js";
import { getUser } from "../../slices/authSlice.js";
import classes from "./home.module.css";

const Home = () => {
  // const exampleOut=useSelector()
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUser())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          navigate("/sign-in");
        }
        //else show error message
        console.log(err);
      });
  }, []);

  const exampleDispatch = () => {
    dispatch(exampleOne("is it working?"));
  };

  return (
    <>
      {!auth.userId ? (
        <div className={classes.app}>
          <Navbar />
          <div className={classes.content}>
            <Tabs defaultValue={0} sx={{ display: "flex", flex: "1" }}>
              <TabList>
                <Tab value={0}>To-dos</Tab>
                <Tab value={1}>Notes</Tab>
              </TabList>
              <TabPanel
                value={0}
                sx={{
                  p: 2,
                  // display: "flex",
                  // flex: "1",
                  paddingLeft: "0em",
                  paddingRight: "0em",
                }}
              >
                <Todos />
              </TabPanel>
              <TabPanel
                value={1}
                sx={{
                  p: 2,
                  // display: "flex",
                  // flex: "1",
                  paddingLeft: "0em",
                  paddingRight: "0em",
                }}
              >
                <Notes />
              </TabPanel>
            </Tabs>
            {/* <button onClick={exampleDispatch}>disptach an action</button> */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
