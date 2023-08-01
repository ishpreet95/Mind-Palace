import Axios from "./axios.service";

// register user
const register = async (name, email, password, confirmPassword) => {
  const response = await Axios.axiosAuth.post("/users/register", {
    name,
    email,
    password,
    confirmPassword,
  });

  return response;
};

// login user
const login = async (email, password) => {
  const response = await Axios.axiosAuth.post("/users/signin", {
    email,
    password,
  });
  if (response.data.user.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response;
};

const googleAuth = async (response) => {
  const res1 = await Axios.axiosAuth.post(`/google`, response);

  if (res1.data.user.token) {
    localStorage.setItem("user", JSON.stringify(res1.data.user));
  }
  return res1;
};

const verifyEmail = async (token) => {
  const response = await Axios.axiosAuth.get(`/users/verify/${token}`);
  return response;
};

const sendResetEmail = async (email) => {
  const response = await Axios.axiosAuth.post(`/users/forgotpassword`, {
    email,
  });
  return response;
};

const checkUser = async (id, token) => {
  const response = await Axios.axiosAuth.get(
    `/users/resetpassword/${id}/${token}`
  );
  return response;
};

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

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout,
  verifyEmail,
  sendResetEmail,
  checkUser,
  resetPass,
  googleAuth,
};

export default AuthService;
