import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://localhost:5000/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosTodos = axios.create({
  baseURL: "http://localhost:5000/api/v1/todos",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const Axios = { axiosAuth, axiosTodos };

export default Axios;
