import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { DragDropContext } from "react-beautiful-dnd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <DragDropContext>
      <App />
    </DragDropContext>
  </Provider>
);
