import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  name: string;
  userRole: "jobhunter" | "company" | "";
}

const initialState: AuthState = {
  isLoggedIn: false,
  name: "",
  userRole: "",
};

const authSlice_tes = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice_tes.actions;

export default authSlice_tes.reducer;
