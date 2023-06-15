import "./Button.css";
const Button = (props) => {
  const klass = `customButton ${props.backG} altFont`;
  return (
    <button className={klass} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
