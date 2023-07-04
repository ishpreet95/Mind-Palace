import "./Button.css";
// import { useContext } from "react";
// import { ThemeContext } from "../../App";
const Button = (props) => {
  // const themeColor = useContext(ThemeContext);
  const klass = `customButton ${props.theme} altFont`;
  return (
    <button className={klass} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
