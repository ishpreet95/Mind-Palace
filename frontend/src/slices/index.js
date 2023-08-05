// src/slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import exampleReducer from "./exampleSlice"; // Import your created slice
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  // Add more slices here if you have multiple
  example: exampleReducer,
  auth: authReducer,
});

export default rootReducer;
