import "./SignIn.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/Input/PasswordInput";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Slide } from "@mui/material";
import Divider from "@mui/material/Divider";
import SignInVector from "../../assets/SignInVector";
import Logo from "../../assets/Logo";
import Google from "../../assets/google.png";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
const SignIn = () => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onSignInHandler = () => {
    setOpen(true);
  };
  const GoogleSignInHandler = () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_self");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="signInBox">
      {/* for alerts */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Sign In Attempt
        </Alert>
      </Snackbar>
      {/* Left half of sign up page */}
      <div className="leftPane">
        <div className="centerBox">
          <div
            className="altFont"
            style={{
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
            }}
          >
            Welcome Back!
          </div>
          <div className="mainFont h1">Sign In</div>
          <Input label="Email" theme="pink-input" />
          <PasswordInput label="Password" theme="pink-input" />
          <Button
            theme="pink-button"
            text="Sign In"
            onClick={onSignInHandler}
          />
          <Divider id="divider" style={{ margin: "0.7em", fontFamily: "Lato" }}>
            Or
          </Divider>
          <div className="googleSignIn altFont" onClick={GoogleSignInHandler}>
            <img src={Google} height={25} width={25} />
            <span
              style={{
                margin: "0 0.5em",
                textShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
              }}
            >
              Sign In with Google
            </span>
          </div>
          <center className="altFont bottomText">
            Don&apos;t have an account?&nbsp;
            <Link className="noDecoration" to="/sign-up">
              <span style={{ color: "#0732FF" }}>Sign Up</span>
            </Link>
          </center>
        </div>
      </div>
      {/* Right half of the sign up page */}
      <div className="rightPane">
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "end",
            marginTop: "0.5em",
          }}
        >
          <Logo />
          <span className="title mainFont">Mind Palace</span>
        </div>
        <SignInVector />
      </div>
    </div>
  );
};

export default SignIn;
