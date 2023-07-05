import { useState } from "react";
import axios from "axios";
const Home = () => {
  const [profile, setProfile] = useState(null);
  // const getProfile = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/profile");
  //     // setProfile(JSON.parse(JSON.stringify(res.data)));
  //     setProfile(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   getProfile();
  // }, []);
  const login = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true,
      });
      console.log(res);
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(profile);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={fetchProfile}>Get profile</button>
      {profile ? (
        <div>
          <h1>Access Token: </h1>
          <p>{profile.access_token}</p>
          <p>temporary profile name: {profile.name}</p>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default Home;
