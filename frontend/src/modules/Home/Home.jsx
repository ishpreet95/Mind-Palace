import Loader from "../../components/Loader/Loader.jsx";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const authState = useSelector((state) => state.auth);

  console.log("Auth state:", authState);

  return (
    <>
      {authState.isLoggedIn && authState.user ? (
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
              alignItems: "center",
            }}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: "xl",
                bgcolor: "background.level1",
                width: "25%",
                height: "53px",
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "background.surface",
                },
              }}
            >
              <Link
                to="/todos"
                className="noDecoration"
                style={{ display: "flex", flex: "1" }}
              >
                <Tab
                  value={0}
                  disableIndicator
                  sx={{
                    flex: "1",
                    fontFamily: "Inter",
                    fontSize: "1em",
                    fontWeight: "500",
                  }}
                >
                  Todos
                </Tab>
              </Link>
              <Link
                to="/notes"
                className="noDecoration"
                style={{ display: "flex", flex: "1" }}
              >
                <Tab
                  value={1}
                  disableIndicator
                  sx={{
                    flex: "1",
                    fontFamily: "Inter",
                    fontSize: "1em",
                    fontWeight: "500",
                  }}
                >
                  Notes
                </Tab>
              </Link>
            </TabList>
            <TabPanel
              value={0}
              sx={{
                p: 2,
                // display: "flex",
                // flex: "1",
                paddingLeft: "0em",
                paddingRight: "0em",
                width: "100%",
              }}
            >
              {/* <Todos /> */}
              <Outlet />
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
              {/* <Notes /> */}
              <Outlet />
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
