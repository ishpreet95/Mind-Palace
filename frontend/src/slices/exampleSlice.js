// src/slices/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
const initialState = {
  // Your initial state goes here
  example: [],
};

const exampleSlice = createSlice({
  name: "example", // Slice name
  initialState: initialState,
  reducers: {
    // Your slice's reducers go here
    exampleOne: (state, action) => {
      AuthService.setData("example", action.payload);

      state.language = action.payload;
    },
  },
});

// Export the generated action creators
export const { actions } = exampleSlice;

// Export the reducer
export default exampleSlice.reducer;
