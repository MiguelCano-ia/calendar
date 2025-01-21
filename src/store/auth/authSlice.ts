import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, User } from "./interfaces/auth.interface";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    setAuthenticated: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    setNotAuthenticated: (state, action: PayloadAction<string | undefined>) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = action.payload;
    },
    setErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});
export const {
  setChecking,
  setAuthenticated,
  setNotAuthenticated,
  setErrorMessage,
} = authSlice.actions;
