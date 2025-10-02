import "./SignIn.css";
import SignInVector from "../../assets/SignInVector";
import { Link, Navigate } from "react-router-dom";
import FirebaseAuthUI from "../../components/Auth/FirebaseAuthUI";
import { useSelector } from "react-redux";

const SignIn = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/todos" replace />;
  }

  return (
    <div className="signInBox">
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
          <FirebaseAuthUI />
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
          {/* <Logo /> */}
          <span className="title chairmanFont">Mind Palace</span>
        </div>
        <SignInVector />
      </div>
    </div>
  );
};

export default SignIn;
