import {
  useState,
  useEffect,
  //  useReducer
} from "react";
import { Reorder } from "framer-motion";
// import expReducer from "../../reducers";
// import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  // FormattingToolbar,
  // SlashMenu,
  // HyperLinkToolbar,
} from "@blocknote/react";
import { AnimatePresence, motion } from "framer-motion";
import "@blocknote/core/style.css";
import CreateTodoCard from "../../components/CreateTodoCard/CreateTodoCard";
import TodoCard from "../../components/TodoCard/TodoCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import classes from "./Exp.module.css";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 8px 0`,
  padding: "1em",
  // transition: "all 1s ease-in-out",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  width: 250,
  transition: "all 1s ease-in-out",
});
const Exp = () => {
  //useState
  const [count, setCount] = useState(0);
  const [inpoot, setInpoot] = useState("");
  const [toggle, setToggle] = useState(false);
  const todos = [
    {
      id: "1",
      title: "hello",
      endDate: "2023-08-15T18:01:24.436Z",
      severity: 0,
      type: "noStatus",
    },
    {
      id: "2",
      title: "hlo",
      endDate: "2023-08-15T18:01:24.436Z",
      severity: 0,
      type: "noStatus",
    },
    {
      id: "3",
      title: "hllo",
      endDate: "2023-08-15T18:01:24.436Z",
      severity: 0,
      type: "noStatus",
    },
  ];

  // const [items, setItems] = useState([0, 1, 2, 3]);
  // const [items, setItems] = useState([
  //   { id: "0", title: "Item 0" },
  //   { id: "1", title: "Item 1" },
  //   { id: "2", title: "Item 2" },
  //   { id: "3", title: "Item 3" },
  // ]);
  const [items, setItems] = useState(todos);

  const reorder = (startIndex, endIndex) => {
    console.log(startIndex, endIndex);
    const newList = [...items];
    const [removed] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, removed);

    return newList;
  };
  //react-beautiful-dnd
  const onBeforeCapture = () => {
    /*...*/
  };
  const onBeforeDragStart = () => {
    /*...*/
  };
  const onDragStart = () => {
    /*...*/
  };
  const onDragUpdate = () => {
    /*...*/
  };
  const onDragEnd = (result) => {
    // the only one that is required
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setItems(reorder(result.source.index, result.destination.index));
  };
  const handleOrder = (newOrder) => {
    setItems(newOrder);
  };

  //useReducer
  // const [num, dispatch] = useReducer(expReducer, 0);

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
        {/* useReducer <hr />
        <div>{num}</div>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button> */}
      </div>
      <BlockNoteView editor={editor}>
        {/* <FormattingToolbar editor={editor} />
        <SlashMenu editor={editor} />
        <HyperLinkToolbar editor={editor} /> */}
      </BlockNoteView>
      {/* <BlockNoteEditor /> */}
      {/* <div
        style={{
          backgroundColor: "black",
          padding: "1em",
          display: "flex",
          gap: "1em",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "1em",
            display: "flex",
            gap: "1em",
            flexDirection: "column",
          }}
        >
          <div style={{ backgroundColor: "green", padding: "1em" }}>one</div>
          <div style={{ backgroundColor: "yellow", padding: "1em" }}>two</div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "1em",
            display: "flex",
            gap: "1em",
            flexDirection: "column",
          }}
        >
          <AnimatePresence>
            {toggle ? (
              <motion.div
              // key="model"
              // initial={{ opacity: 0, y: 20 }} // Initial animation state
              // animate={{ opacity: 1, y: 0 }} // Animation when the card appears
              // exit={{ opacity: 0, y: -20 }} // Animation when the card exits
              // transition={{ duration: 0.5 }} // Animation duration
              >
                <div style={{ backgroundColor: "green", padding: "1em" }}>
                  one
                </div>
                <div style={{ backgroundColor: "yellow", padding: "1em" }}>
                  two
                </div>
                <CreateTodoCard
                  closeCreateTodo={() => setToggle((prev) => !prev)}
                  type="noStatus"
                />
              </motion.div>
            ) : (
              <></>
            )}
          </AnimatePresence>
          <button
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            toggle
          </button>
        </div>
      </div> */}

      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <div className={`${classes.boxRow} ${classes.blue}`}>
          <Droppable droppableId="droppableOne">
            {(provided, snapshot) => (
              <div
                className={`${classes.boxCol} ${classes.red}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <TodoCard key={item.id} todo={item} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default Exp;
