import "./Input.css";
// import { useContext } from "react";
// import { ThemeContext } from "../../App";
const Input = (props) => {
  // const klass = `inputBox ${props.caretColor} `;
  // const klass = useContext(ThemeContext);
  // console.log(klass);
  return (
    <div className="inputBox">
      <label htmlFor="customInput" style={{ zIndex: 10, fontWeight: 500 }}>
        {props.label}
      </label>
      <input
        className={props.theme}
        value={props.value}
        type="text"
        id="customInput"
        onChange={props.onChange}
        required
      />
    </div>
  );
};

export default Input;
