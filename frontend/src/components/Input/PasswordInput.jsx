import "./Input.css";
// import Show from "../../assets/Show";
// import Hide from "../../assets/Hide";
// import { useState } from "react";
// import { ThemeContext } from "../../App";
const PasswordInput = (props) => {
  // const klass = useContext(ThemeContext);
  // const [showPassword, setShowPassword] = useState(false);
  // const toggle = () => {
  //   setShowPassword(!showPassword);
  // };
  // const klass = `inputBox ${props.caretColor} `;
  return (
    <div className="inputBox">
      <label htmlFor={props.label} style={{ zIndex: 10 }}>
        {props.label}
      </label>
      <input
        className={props.theme}
        value={props.value}
        // type={showPassword ? "text" : "password"}
        type="password"
        id={props.label}
        onChange={props.onChange}
        required
      />
      {/* <span className="icon" onClick={toggle}>
        {showPassword ? <Show /> : <Hide />}
      </span> */}
    </div>
  );
};

export default PasswordInput;
