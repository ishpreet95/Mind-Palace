import Axios from "./axios.service";
import { auth } from "../firebaseConfig";

const verifyUser = async (idToken) => {
  const response = await Axios.axiosAuth.post(
    "/verify",
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response;
};

const getUser = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is signed in");
  }

  const idToken = await user.getIdToken();
  const response = await Axios.axiosAuth.get("/user", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response;
};

const logout = async () => {
  await auth.signOut();
  localStorage.removeItem("user");
};

const AuthService = {
  logout,
  getUser,
  verifyUser,
};

export default AuthService;
