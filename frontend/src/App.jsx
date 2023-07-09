import "./App.css";
import { createContext } from "react";
import SignIn from "./modules/SignIn/SignIn";
import SignUp from "./modules/SignUp/SignUp";
import Exp from "./modules/Experiments/Exp";
import Home from "./modules/Home/Home";
import Loader from "./components/Loader/Loader.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const theme = {
  sigin: "pink-theme",
  signup: "blue-theme",
};
export const ThemeContext = createContext(theme);
function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeContext.Provider value={theme}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/exp" element={<Exp />} />
            <Route exact path="/loader" element={<Loader />} />
          </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
