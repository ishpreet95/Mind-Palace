import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

const initialState = {
  isLoggedIn: false,
  userId: null,
  status: "idle",
  error: null,
};

export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const response = await AuthService.getUser();
    return response.data;
  } catch (error) {
    // Extract relevant error information for the store
    const errorPayload = {
      message: error.response?.data,
      code: error.response?.status,
    };
    throw errorPayload; // Throw the serializable payload
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        //on successfull response, we update the state with the return value of the action
        state.userId = action.payload;
        //can also return an object, it will be received as a param in the then of action
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
