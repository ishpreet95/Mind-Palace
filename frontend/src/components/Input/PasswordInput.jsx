import "./Input.css";
import Show from "../../assets/Show";
import Hide from "../../assets/Hide";
import { useState } from "react";
const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggle = () => {
    setShowPassword(!showPassword);
  };
  // const klass = `inputBox ${props.caretColor} `;
  return (
    <div className="inputBox">
      <label htmlFor={props.label} style={{ zIndex: 10 }}>
        {props.label}
      </label>
      <input
        className={props.caretColor}
        type={showPassword ? "text" : "password"}
        id={props.label}
        required
      />
      {/* <span className="icon" onClick={toggle}>
        {showPassword ? <Show /> : <Hide />}
      </span> */}
    </div>
  );
};

export default PasswordInput;
