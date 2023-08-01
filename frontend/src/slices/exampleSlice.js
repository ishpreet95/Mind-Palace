// src/slices/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import AuthService from "../services/auth.service";
const initialState = {
  // Your initial state goes here
  exampleOne: {},
};

const exampleSlice = createSlice({
  name: "examples", // Slice name
  initialState,
  reducers: {
    // Your slice's reducers go here
    exampleOne: (state, action) => {
      // state.exampleOne.push({ name: "ishiboi", text: action.payload });
      state.exampleOne = { name: "ishiboi", text: action.payload };
    },
  },
});

// Export the generated action creators
export const { exampleOne } = exampleSlice.actions;

// Export the reducer
export default exampleSlice.reducer;
