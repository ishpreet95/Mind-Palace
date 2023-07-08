import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [user, setUser] = useState(null);
  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/user", {
        //don't you ever funcking forget this you idiot
        withCredentials: true,
      });
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      {user ? (
        <>
          <div>{user.access_token}</div>
          <div>{user.expires_in}</div>
          <div>{user.id_token}</div>
        </>
      ) : (
        <div>Loading.....</div>
      )}
    </div>
  );
};

export default Home;
