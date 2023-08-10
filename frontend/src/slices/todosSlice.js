import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodosService from "../services/todos.service";

const initialState = {
  todo: {},
};

export const postTodo = createAsyncThunk("todos/postTodo", async (newTodo) => {
  console.log(newTodo);
  const response = await TodosService.postTodo(newTodo);
  return response.data;
});

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.code = action.error.code;
      });
  },
});

export default TodosSlice.reducer;
