import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodosService from "../services/todos.service";
import { nanoid } from "nanoid";
function nonceComparator(firstTodo, secondTodo) {
  return firstTodo.nonce - secondTodo.nonce;
}

const initialState = {
  todo: {},
  toUpdate: null,
  all: [],
  noStatus: [],
  upcoming: [],
  inProgress: [],
  completed: [],
};

export const selectListByType = (state, type) => {
  switch (type) {
    case "noStatus":
      return state.todos.noStatus;
    case "upcoming":
      return state.todos.upcoming;
    case "inProgress":
      return state.todos.inProgress;
    case "completed":
      return state.todos.completed;
    default:
      return [];
  }
};

export const getTodos = createAsyncThunk("todos/", async () => {
  const response = await TodosService.getTodos();
  //when no todos, reset nonce to 100000
  if (response.data.length === 0) {
    localStorage.setItem("nonce", 100000);
  }
  // console.log(response.data);
  return response.data;
});

export const postTodo = createAsyncThunk("todos/postTodo", async (newTodo) => {
  //setting nonce
  let nonce = localStorage.getItem("nonce");
  if (nonce === undefined || nonce === null) {
    nonce = 100000;
  }
  newTodo.nonce = Number(nonce);
  //setting todo id
  newTodo.id = nanoid();

  //increase nonce by 100000 for next time
  localStorage.setItem("nonce", Number(nonce) + 100000);

  const response = await TodosService.postTodo(newTodo);
  return response.data;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (data) => {
  const response = await TodosService.updateTodo(data);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  console.log(id);
  const response = await TodosService.deleteTodo(id);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", (newTodo) => {
  //setting nonce
  let nonce = localStorage.getItem("nonce");
  console.log(nonce);
  if (nonce === undefined || nonce === null) {
    nonce = 10000;
  }
  newTodo.nonce = Number(nonce);
  //setting todo id
  newTodo.id = nanoid();
  return newTodo;
});

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reorderTodos: (state, action) => {
      const { source, destination, draggableId } = action.payload;
      const listMapping = {
        noStatus: state.noStatus,
        upcoming: state.upcoming,
        inProgress: state.inProgress,
        completed: state.completed,
      };
      const sourceList = listMapping[source.droppableId];
      const destinationList = listMapping[destination.droppableId];
      //locally reordering for now
      const [removed] = sourceList.splice(source.index, 1);
      removed.type = destination.droppableId;
      //if new list is empty, just push the new one, let the nonce be the previous one
      if (destinationList.length === 0) {
        destinationList.push(removed);
        return;
      }
      let nonceup = 0;
      let noncedown = 0;
      let noncenew = 0;
      if (destination.index === 0) {
        //if coming at the first index
        nonceup = destinationList[destination.index].nonce;
      }
      //if going at the last place
      else if (destination.index === destinationList.length) {
        nonceup = destinationList[destination.index - 1].nonce * 2;
        noncedown = 100000 * 2;
      } else {
        noncedown = destinationList[destination.index].nonce;
        nonceup = destinationList[destination.index - 1].nonce;
      }
      noncenew = (nonceup + noncedown) / 2;
      removed.nonce = noncenew;
      state.toUpdate = removed;
      destinationList.splice(destination.index, 0, removed);
    },
    removeTodo: (state, action) => {
      const { id, type } = action.payload;
      if (type === "noStatus") {
        state.noStatus = state.noStatus.filter((todo) => todo.id !== id);
      }
      if (type === "upcoming") {
        state.upcoming = state.upcoming.filter((todo) => todo.id !== id);
      }
      if (type === "inProgress") {
        state.inProgress = state.inProgress.filter((todo) => todo.id !== id);
      }
      if (type === "completed") {
        state.completed = state.completed.filter((todo) => todo.id !== id);
      }
    },
  },
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
        state.noStatus = state.all
          .filter((todo) => todo.type === "noStatus")
          .sort(nonceComparator);
        state.upcoming = state.all
          .filter((todo) => todo.type === "upcoming")
          .sort(nonceComparator);
        state.inProgress = state.all
          .filter((todo) => todo.type === "inProgress")
          .sort(nonceComparator);
        state.completed = state.all
          .filter((todo) => todo.type === "completed")
          .sort(nonceComparator);
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log(action.payload);
        const newTodo = action.payload;
        if (newTodo.type === "noStatus") {
          state.noStatus.push(newTodo);
          state.noStatus = [...state.noStatus].sort(nonceComparator);
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
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.code = action.error.code;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.code = action.error.code;
      });
  },
});

export const { reorderTodos, removeTodo } = TodosSlice.actions;
export default TodosSlice.reducer;
