import "./Input.css";
const Input = (props) => {
  // const klass = `inputBox ${props.caretColor} `;
  return (
    <div className="inputBox">
      <label htmlFor="customInput" style={{ zIndex: 10, fontWeight: 500 }}>
        {props.label}
      </label>
      <input
        className={props.caretColor}
        type="text"
        id="customInput"
        required
      />
    </div>
  );
};

export default Input;
