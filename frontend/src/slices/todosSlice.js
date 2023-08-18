import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodosService from "../services/todos.service";
import { nanoid } from "nanoid";

const initialState = {
  todo: {},
  all: [],
  noStatus: [],
  upcoming: [],
  inProgress: [],
  completed: [],
};

export const postTodo = createAsyncThunk("todos/postTodo", async (newTodo) => {
  //setting nonce
  let nonce = localStorage.getItem("nonce");
  if (nonce === undefined || nonce === null) {
    nonce = 10000;
  }
  newTodo.nonce = nonce;
  //setting todo id
  newTodo.id = nanoid();

  console.log(newTodo);
  const response = await TodosService.postTodo(newTodo);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", (newTodo) => {
  //setting nonce
  let nonce = localStorage.getItem("nonce");
  console.log(nonce);
  if (nonce === undefined || nonce === null) {
    nonce = 10000;
  }
  newTodo.nonce = nonce;
  //setting todo id
  newTodo.id = nanoid();
  return newTodo;
});

export const reorderTodos = createAsyncThunk("todos/reorderTodo", (data) => {
  return data;
});

export const getTodos = createAsyncThunk("todos/", async () => {
  const response = await TodosService.getTodos();
  localStorage.setItem("nonce", response.data.length * 100000);
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
        state.noStatus = state.all.filter((todo) => todo.type === "noStatus");
        state.upcoming = state.all.filter((todo) => todo.type === "upcoming");
        state.inProgress = state.all.filter(
          (todo) => todo.type === "inProgress"
        );
        state.completed = state.all.filter((todo) => todo.type === "completed");
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log(action.payload);
        const newTodo = action.payload;
        if (newTodo.type === "noStatus") {
          state.noStatus.push(newTodo);
        }
        if (newTodo.type === "upcoming") {
          state.upcoming.push(newTodo);
        }
        if (newTodo.type === "inProgress") {
          state.inProgress.push(newTodo);
        }
        if (newTodo.type === "completed") {
          state.completed.push(newTodo);
        }
      })
      .addCase(reorderTodos.fulfilled, (state, action) => {
        // console.log(action.payload);
        const { source, destination, draggableId } = action.payload;
        if (source.droppableId === destination.droppableId) {
          if (source.droppableId === "noStatus") {
            const [removed] = state.noStatus.splice(source.index, 1);
            state.noStatus.splice(destination.index, 0, removed);
          }
        }
      });
  },
});

export default TodosSlice.reducer;
