import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader.jsx";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Notes from "../Notes/Notes.jsx";
import Todos from "../Todos/Todos.jsx";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const getUserId = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/auth/user", {
        //don't you ever funcking forget this you idiot
        withCredentials: true,
      });
      setUserId(res.data);
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 403) {
        navigate("/sign-in");
      }
      //else show error message
      console.log(err);
    }
  };
  useEffect(() => {
    getUserId();
  }, []);
  return (
    <>
      {userId ? (
        <>
          <Navbar />
          <Tabs defaultValue={1}>
            <TabList>
              <Tab value={1}>To-dos</Tab>
              <Tab value={2}>Notes</Tab>
            </TabList>
            <TabPanel value={1} sx={{ p: 2 }}>
              <Todos />
            </TabPanel>
            <TabPanel value={2} sx={{ p: 2 }}>
              <Notes />
            </TabPanel>
          </Tabs>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
