import axios from "axios";
import { auth } from "../firebaseConfig";

const axiosAuth = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosTodos = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add interceptor to attach Firebase token to todos requests
axiosTodos.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Axios = { axiosAuth, axiosTodos };

export default Axios;
