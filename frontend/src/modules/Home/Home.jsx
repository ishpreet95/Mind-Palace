import { useState, useEffect } from "react";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend server URL
});
const Home = () => {
  const [auth, setAuth] = useState(null);
  const getAuth = async () => {
    try {
      const res = await api.get("/auth");
      setAuth(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <div>
      {/* {profile ? (
        <>
          <div>{profile.access_token}</div>
          <div>{profile.expires_in}</div>
          <div>{profile.id_token}</div>
        </>
      ) : (
        <div>Loading.....</div>
      )} */}
      Welcome Home!!
    </div>
  );
};

export default Home;
