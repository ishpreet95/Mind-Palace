import "./Input.css";
const Input = (props) => {
  return (
    <div className="inputBox">
      <label htmlFor="customInput" style={{ zIndex: 10 }}>
        {props.label}
      </label>
      <input
        type="text"
        id="customInput"
        style={{ fontFamily: "Lato" }}
        required
      />
    </div>
  );
};

export default Input;
