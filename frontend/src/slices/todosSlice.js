import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodosService from "../services/todos.service";

const initialState = {
  todo: {},
  all: [],
};

export const postTodo = createAsyncThunk("todos/postTodo", async (newTodo) => {
  console.log(newTodo);
  const response = await TodosService.postTodo(newTodo);
  return response.data;
});

export const getTodos = createAsyncThunk("todos/", async () => {
  const response = await TodosService.getTodos();
  // console.log(response.data);
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
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.all = action.payload;
      });
  },
});

export default TodosSlice.reducer;
