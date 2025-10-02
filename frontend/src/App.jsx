import classes from "./App.module.css";
import { createContext, useEffect, useState } from "react";
import SignIn from "./modules/SignIn/SignIn";
import SignUp from "./modules/SignUp/SignUp";
import Exp from "./modules/Experiments/Exp";
import Home from "./modules/Home/Home";
import Loader from "./components/Loader/Loader.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Todos from "./modules/Todos/Todos";
import Navbar from "./components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Notes from "./modules/Notes/Notes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { getUser, clearUser } from "./slices/authSlice";
const theme = {
  sigin: "pink-theme",
  signup: "blue-theme",
};
export const ThemeContext = createContext(theme);
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Firebase user is signed in:", user.displayName);
        try {
          // User is signed in, fetch user data from backend
          await dispatch(getUser()).unwrap();
        } catch (error) {
          console.error("Error fetching user:", error);
          dispatch(clearUser());
        }
      } else {
        console.log("No Firebase user signed in");
        dispatch(clearUser());
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (authChecking) {
    return <Loader />;
  }

  return (
    <>
      <BrowserRouter>
        <ThemeContext.Provider value={theme}>
          <Routes>
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/exp" element={<Exp />} />
            <Route exact path="/loader" element={<Loader />} />

            <Route
              element={isLoggedIn ? <Layout /> : <Navigate to="/sign-in" />}
            >
              <Route path="/" element={<Navigate to="/todos" replace />} />
              <Route path="/*" element={<Home />}>
                <Route path="todos" element={<Todos />} />
                <Route path="notes" element={<Notes />} />
              </Route>
            </Route>
          </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
const Layout = () => {
  return (
    <>
      <div className={classes.app}>
        <Navbar />
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
