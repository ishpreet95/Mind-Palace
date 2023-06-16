import "./SignUp.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Slide } from "@mui/material";
import Divider from "@mui/material/Divider";
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
        <div>icon</div>
        <div className="title mainFont">Mind Palace</div>
      </div>
      {/* Right half os the sign up page */}
      <div className="rightPane">
        <div className="centerBox">
          <div className="altFont">Get ready to build your Mind Palace</div>
          <div className="mainFont">Sign Up</div>
          <Input label="Email" />
          <Input label="Password" />
          <Input label="Confirm Password" />
          <Button text="Sign Up" onClick={onSignUpHandler} />
          <Divider>Or</Divider>
          <Button
            backG="light-blue-back"
            text="Sign in with Google"
            onClick={GoogleSignUpHandler}
          />
          <div className="altFont">Already have an account? Sign In</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
