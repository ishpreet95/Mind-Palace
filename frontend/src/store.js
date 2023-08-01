import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
// import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  // Other options can be added here, like middleware, enhancers, etc.
});

export default store;
