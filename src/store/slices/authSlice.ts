import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSchema } from "@/validators/auth.validator";
import { z } from "zod";
import Cookies from "js-cookie";
import { AuthHandler } from "@/utils/auth.utils";

interface PendingState {
  dataLoading: boolean;
}
interface LoginState {
  baseId: number | null;
  innerId: number | null;
  photo?: string;
  email: string;
  name?: string;
  password?: string;
  user_role: string | null;
  isLoading?: boolean;
  isLoggedIn: boolean;
  error?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  callback?: string;
  pendingState: PendingState;
}
const authHandler = new AuthHandler();

const initialState: LoginState = {
  baseId: null,
  innerId: null,
  photo: "",
  email: "",
  name: "",
  password: "",
  user_role: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
  accessToken: "",
  refreshToken: "",
  callback: "",
  pendingState: {
    dataLoading: false,
  },
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
      },
    );

    const { access_token, refresh_token, user } = response.data.data;
    const { user_role, name, photo } = user || {};

    console.log(user);

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

export const validateUserToken = createAsyncThunk(
  "auth/validateToken",
  async (token: string) => {
    try {
      const user = await authHandler.validateUserToken(token);

      if (user.status !== 200) {
        return null;
      } else {
        return user.data;
      }
    } catch (e: unknown) {
      return e;
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.password = "";
    },
    updatePhoto: (state, action) => {
      state.photo = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action, "INI ACTION!!");
        state.isLoading = false;
        state.user_role = action.payload.user_role;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.name = action.payload.name;
        state.photo = action.payload.photo as string;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown error occurred";
      })
      .addCase(validateUserToken.pending, (state) => {
        state.pendingState.dataLoading = true;
      })
      .addCase(validateUserToken.fulfilled, (state, action) => {
        console.log("ACTION PAYLOAD", action);
        if (action.payload.jobHunter && action.payload.jobHunter.length > 0) {
          state.isLoggedIn = true;
          state.name = action.payload.jobHunter[0].name;
          state.email = action.payload.email;
          state.user_role = "jobhunter";
          state.innerId = action.payload.jobHunter[0].job_hunter_id;
          state.photo = action.payload.jobHunter[0].photo;
        } else if (action.payload.company && action.payload.company.length > 0) {
          state.isLoggedIn = true;
          state.name = action.payload.company[0].company_name;
          state.email = action.payload.email;
          state.user_role = "company";
          state.innerId = action.payload.company[0].company_id;
          state.photo = action.payload.company[0].logo;
        }
        state.pendingState.dataLoading = false;
        state.isLoading = false;
      });
      
  },
});

export const { resetState, updateName, updatePhoto } = authSlice.actions;

export default authSlice.reducer;
