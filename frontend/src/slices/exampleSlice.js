// src/slices/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import AuthService from "../services/auth.service";
const initialState = {
  // Your initial state goes here
  exampleone: {},
  exampletwo: {},
};

const exampleSlice = createSlice({
  name: "examples", // Slice name
  initialState,
  reducers: {
    // Your slice's reducers go here
    exampleOne: (state, action) => {
      // state.push({ name: "ishiboi", text: action.payload });
      state.exampleone = { name: "ishiboi", text: action.payload };
      // // return a new data
      // return [...state, exampleone];
    },
  },
});

// Export the generated action creators
export const { exampleOne } = exampleSlice.actions;

// Export the reducer
export default exampleSlice.reducer;
