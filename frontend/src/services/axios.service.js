import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://localhost:5000/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

const Axios = { axiosAuth };

export default Axios;
