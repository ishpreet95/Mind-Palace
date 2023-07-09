import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader.jsx";
const Home = () => {
  const [userId, setUserId] = useState(null);
  const getUserId = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/user", {
        //don't you ever funcking forget this you idiot
        withCredentials: true,
      });
      setUserId(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserId();
  }, []);
  return (
    <div>
      {userId ? (
        <>
          <div>{userId}</div>
        </>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
