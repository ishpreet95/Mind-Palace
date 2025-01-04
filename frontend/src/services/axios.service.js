import axios from "axios";

const axiosAuth = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  //don't you ever funcking forget this you idiot
  withCredentials: true,
});

const axiosTodos = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos`,
  headers: {
    "Content-Type": "application/json",
  },
  //don't you ever funcking forget this you idiot
  withCredentials: true,
});

const Axios = { axiosAuth, axiosTodos };

export default Axios;
