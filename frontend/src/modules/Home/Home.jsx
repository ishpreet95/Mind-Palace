import { useEffect } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Notes from "../Notes/Notes.jsx";
import Todos from "../Todos/Todos.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { exampleOne } from "../../slices/exampleSlice.js";
import { getUser } from "../../slices/authSlice.js";
import classes from "./home.module.css";

const Home = () => {
  // const exampleOut=useSelector()
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUser())
      .then(() => {})
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigate("/sign-in");
        }
      });
  }, []);

  if (auth.error === "user not logged in") {
    navigate("/sign-in");
  }

  return (
    <>
      {auth.userId ? (
        // <div className={classes.app}>
        //   <Navbar />
        //   <div className={classes.content}>
        <>
          <Tabs
            aria-label="tabs"
            defaultValue={0}
            sx={{
              display: "flex",
              flex: "1",
              backgroundColor: "transparent",
            }}
          >
            <TabList
              disableUnderline
              tabFlex={1}
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: "xl",
                bgcolor: "background.level1",
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "background.surface",
                },
              }}
            >
              <Tab value={0} disableIndicator onClick={() => navigate("todos")}>
                To-dos
              </Tab>
              <Tab value={1} disableIndicator>
                Notes
              </Tab>
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
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
