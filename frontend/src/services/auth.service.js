import Axios from "./axios.service";

const resetPass = async (id, token, password, confirmPassword) => {
  const response = await Axios.axiosAuth.post(
    `/users/confirmresetpassword/${id}/${token}`,
    {
      password,
      confirmPassword,
    }
  );
  return response;
};

const getUser = async () => {
  const response = await Axios.axiosAuth.get("/user", {});
  return response;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  logout,
  resetPass,
  getUser,
};

export default AuthService;
