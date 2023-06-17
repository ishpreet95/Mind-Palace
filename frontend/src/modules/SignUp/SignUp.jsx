import "./SignUp.css";
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
const SignUp = () => {
  const [open, setOpen] = useState(false);
  const onSignUpHandler = () => {
    setOpen(true);
  };
  const GoogleSignUpHandler = () => {
    alert("Google Sign Up attempt");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="box">
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
          <div className="altFont">Get ready to build your Mind Palace</div>
          <div className="mainFont h1">Sign Up</div>
          <Input label="Email" />
          <PasswordInput label="Password" />
          <PasswordInput label="Confirm Password" />
          <Button text="Sign Up" onClick={onSignUpHandler} />
          <Divider id="divider" style={{ margin: "0.7em", fontFamily: "Lato" }}>
            Or
          </Divider>
          <Button
            backG="light-blue-back"
            text="Sign in with Google"
            onClick={GoogleSignUpHandler}
          />
          <center className="altFont bottomText">
            Already have an account?
            <span style={{ color: "#F72585" }}>Sign In</span>
          </center>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
