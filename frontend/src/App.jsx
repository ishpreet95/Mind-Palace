import classes from "./App.module.css";
import { createContext } from "react";
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
import { useSelector } from "react-redux";
import Notes from "./modules/Notes/Notes";
const theme = {
  sigin: "pink-theme",
  signup: "blue-theme",
};
export const ThemeContext = createContext(theme);
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
              <Route exact path="/" element={<Home />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/notes" element={<Notes />} />
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
