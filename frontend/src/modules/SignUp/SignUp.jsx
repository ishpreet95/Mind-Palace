import "./SignUp.css";
// import { useContext } from "react";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/Input/PasswordInput";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Slide } from "@mui/material";
import Divider from "@mui/material/Divider";
import SignUpVector from "../../assets/SignUpVector";
import Logo from "../../assets/Logo";
import Google from "../../assets/google.png";
import { Link } from "react-router-dom";
//theme context
// const theme = {
//   sigin: "pink-theme",
//   signup: "blue-theme",
// };
// export const ThemeContext = createContext(null);
const SignUp = () => {
  //states
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //handlers
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    // console.log(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  //sign up functions
  const onSignUpHandler = () => {
    setOpen(true);
  };
  const GoogleSignUpHandler = () => {
    alert("Google Sign Up attempt");
  };
  //snackbar functions
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="signUpBox">
      {/* for alerts */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Sign Up Attempt
        </Alert>
      </Snackbar>
      {/* Left half of sign up page */}
      <div className="leftPane">
        <div
          style={{
            display: "flex",
            alignContent: "center",
            marginTop: "0.5em",
          }}
        >
          <Logo />
          <span className="title mainFont">Mind Palace</span>
        </div>
        <SignUpVector />
      </div>
      {/* Right half os the sign up page */}
      <div className="rightPane">
        <div className="centerBox">
          <div
            className="altFont"
            style={{
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
            }}
          >
            Get ready to build your Mind Palace
          </div>
          <div className="mainFont h1">Sign Up</div>
          {/* using ThemeContext to pass down pink theme to input and button */}
          {/* <ThemeContext.Provider value="blue-input"> */}
          <Input
            theme="blue-input"
            value={email}
            label="Email"
            onChange={emailChangeHandler}
          />
          {/* <p>{email}</p> */}
          <PasswordInput
            value={password}
            label="Password"
            theme="blue-input"
            onChange={passwordChangeHandler}
          />
          <PasswordInput
            value={confirmPassword}
            label="Confirm Password"
            theme="blue-input"
            onChange={confirmPasswordChangeHandler}
          />
          {/* </ThemeContext.Provider> */}
          {/* <ThemeContext.Provider value="blue-button"> */}
          <Button
            theme="blue-button"
            text="Sign Up"
            onClick={onSignUpHandler}
          />
          {/* </ThemeContext.Provider> */}
          <Divider id="divider" style={{ margin: "0.7em", fontFamily: "Lato" }}>
            Or
          </Divider>
          <div className="googleSignUp altFont" onClick={GoogleSignUpHandler}>
            <img src={Google} height={25} width={25} />
            <span
              style={{
                margin: "0 0.5em",
                textShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
              }}
            >
              Sign Up with Google
            </span>
          </div>

          <center className="altFont bottomText">
            Already have an account?&nbsp;
            <Link className="noDecoration" to="/sign-in">
              <span style={{ color: "#F72585" }}>Sign In</span>
            </Link>
          </center>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
