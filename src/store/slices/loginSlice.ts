import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSchema } from "@/validators/auth.validator";
import { z } from "zod";
import Cookies from "js-cookie";

interface LoginState {
  email: string;
  password: string;
  user_role: string | null;
  name?: string | null;
  photo?: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: LoginState = {
  email: "",
  password: "",
  user_role: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
  accessToken: "",
  refreshToken: "",
};

export const loginUser = createAsyncThunk<
  {
    access_token: string;
    refresh_token: string;
    user_role: string;
    name: string;
    photo: string | null;
  },
  { email: string; password: string; user_role: string },
  { rejectValue: string }
>("auth/loginUser", async (data, { rejectWithValue }) => {
  try {
    loginSchema.parse(data);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    const { access_token, refresh_token, user } = response.data.data;
    const { user_role, name, photo } = user || {};

    Cookies.set("accessToken", access_token, { expires: 1 / 24 });
    Cookies.set("refreshToken", refresh_token, { expires: 3 });

    return { access_token, refresh_token, user_role, name, photo };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return rejectWithValue(err.errors[0]?.message || "Validation failed");
    }
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
    return rejectWithValue((err as Error).message || "Unknown error");
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetState: (state) => {
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user_role = action.payload.user_role;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.name = action.payload.name;
        state.photo = action.payload.photo;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export const { resetState } = loginSlice.actions;

export default loginSlice.reducer;
