import { useState, useEffect, useReducer } from "react";
import expReducer from "../../reducers";
// import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
const Exp = () => {
  //useState
  const [count, setCount] = useState(0);
  const [inpoot, setInpoot] = useState("");
  //useReducer
  const [num, dispatch] = useReducer(expReducer, 0);

  //   const editor = useBlockNote({
  //     onEditorContentChange: (editor) => {
  //       // Log the document to console on every update
  //       console.log(editor.getJSON());
  //     },
  //   });
  const editor = useBlockNote({});

  const increaseCount = () => {
    setCount(count + 1);
  };
  const decreaseCount = () => {
    setCount(count - 1);
  };
  const handleInput = (e) => {
    setInpoot(e.target.value);
  };
  //   useEffect
  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("cleanup");
    };
  }, [count]);
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
      <div style={{ backgroundColor: "yellow" }}>
        useReducer <hr />
        <div>{num}</div>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      </div>
      <BlockNoteView editor={editor} />
      {/* <BlockNoteEditor /> */}
    </>
  );
};

export default Exp;
