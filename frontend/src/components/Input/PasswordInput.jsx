import "./Input.css";
import Show from "../../assets/Show";
import Hide from "../../assets/Hide";
import { useState } from "react";
const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="inputBox">
      <label htmlFor={props.label} style={{ zIndex: 10 }}>
        {props.label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={props.label}
        style={{ fontFamily: "Lato" }}
        required
      />
      {/* <span className="icon" onClick={toggle}>
        {showPassword ? <Show /> : <Hide />}
      </span> */}
    </div>
  );
};

export default PasswordInput;
