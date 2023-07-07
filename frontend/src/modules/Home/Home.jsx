import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [profile, setProfile] = useState(null);
  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/user");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      {profile ? (
        <>
          {/* <div>{profile.access_token}</div>
          <div>{profile.expires_in}</div>
          <div>{profile.id_token}</div> */}
          <div>{profile.name}</div>
        </>
      ) : (
        <div>Loading.....</div>
      )}
    </div>
  );
};

export default Home;
