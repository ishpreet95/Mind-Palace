import { useState, useEffect } from "react";

const Exp = () => {
  //useState
  const [count, setCount] = useState(0);
  const [inpoot, setInpoot] = useState("");
  const increaseCount = (e) => {
    setCount(count + 1);
  };
  const decreaseCount = () => {
    setCount(count - 1);
  };
  const handleInput = (e) => {
    setInpoot(e.target.value);
  };
  //useEffect
  //   useEffect(() => {
  //     console.log("useEffect");
  //     return () => {
  //       console.log("cleanup");
  //     };
  //   }, [count]);
  return (
    <>
      <div style={{ backgroundColor: "aliceblue" }}>
        useState <hr />
        <button onClick={increaseCount}>+</button>
        <button onClick={decreaseCount}>-</button>
        <div>The count is {count}</div>
        <label>
          label:
          <input type="text" onChange={handleInput} />
        </label>
        <div>{inpoot}</div>
      </div>
      <div style={{ backgroundColor: "beige" }}>
        useEffect <hr />
        refer to react docs
      </div>
      <div style={{ backgroundColor: "aliceblue" }}>
        useContext <hr />
        refer to react docs
      </div>
    </>
  );
};

export default Exp;
