import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

const initialState = {
  isLoggedIn: false,
  user: null,
  status: "idle",
  error: null,
};

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const response = await AuthService.getUser();
  return response.data;
});

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (idToken) => {
    const response = await AuthService.verifyUser(idToken);
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.status = "idle";
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
