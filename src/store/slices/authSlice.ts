import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSchema } from "@/validators/auth.validator";
import { z } from "zod";
import Cookies from "js-cookie";
import { AuthHandler } from "@/utils/auth.utils";
import { LoginAuth } from "@/models/auth.model";

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
  subscriptionId: number;
  subscriptionActive: boolean;
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
  subscriptionActive: false,
  subscriptionId: 1,
  accessToken: "",
  refreshToken: "",
  callback: "",
  pendingState: {
    dataLoading: false,
  },
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    loginForm: { loginData: LoginAuth },
    { rejectWithValue }: { rejectWithValue: (value: string) => void },
  ) => {
    try {
      loginSchema.parse(loginForm.loginData);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        loginForm.loginData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log("RESPONSE FAREL API", response.data.data);
      const { access_token, refresh_token, data } = response.data.data;

      Cookies.set("accessToken", access_token, { expires: 1 / 24 });
      Cookies.set("refreshToken", refresh_token, { expires: 3 });
      console.log("DATAAA INI FAREL", data);

      return { access_token, refresh_token, data };
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        return rejectWithValue(err.errors[0]?.message || "Validation failed");
      }
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || "Server error");
      }
      return rejectWithValue((err as Error).message || "Unknown error");
    }
  },
);

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

export const refreshUserToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (refreshToken: string) => {
    await authHandler.refreshUserAcessToken(refreshToken);
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
        state.pendingState.dataLoading = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("PAYLOAD", action.payload);
        if (
          action.payload?.data.jobHunter &&
          action.payload?.data.jobHunter.length > 0
        ) {
          state.isLoggedIn = true;
          state.name = action.payload?.data.jobHunter[0].name;
          state.email = action.payload?.data.email;
          state.user_role = "jobhunter";
          state.innerId = action.payload?.data.jobHunter[0].job_hunter_id;
          state.photo = action.payload?.data.jobHunter[0].photo;
          state.subscriptionId =
            action.payload?.data.jobHunter[0].jobHunterSubscription.subscriptionId;
          state.subscriptionActive =
            action.payload?.data.jobHunter[0].jobHunterSubscription.subscription_active;
        } else if (
          action.payload?.data.company &&
          action.payload?.data.company.length > 0
        ) {
          state.isLoggedIn = true;
          state.name = action.payload?.data.company[0].company_name;
          state.email = action.payload?.data.email;
          state.user_role = "company";
          state.innerId = action.payload?.data.company[0].company_id;
          state.photo = action.payload?.data.company[0].logo;
        } else if (
          action.payload?.data.developers &&
          action.payload?.data.developers.length > 0
        ) {
          state.isLoggedIn = true;
          state.name = action.payload?.data.developers[0].developer_name;
          state.email = action.payload?.data.email;
          state.user_role = "developer";
          state.innerId = action.payload?.data.developers[0].developer_id;
        }
        state.isLoading = false;
        state.pendingState.dataLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.pendingState.dataLoading = false;
        state.error = action.payload || "Something wentwrtong,please try again";
      })
      .addCase(validateUserToken.pending, (state) => {
        state.pendingState.dataLoading = true;
      })
      .addCase(validateUserToken.fulfilled, (state, action) => {
        console.log("PAYLOAD", action.payload);
        if (action.payload.jobHunter && action.payload.jobHunter.length > 0) {
          state.isLoggedIn = true;
          state.name = action.payload.jobHunter[0].name;
          state.email = action.payload.email;
          state.user_role = "jobhunter";
          state.innerId = action.payload.jobHunter[0].job_hunter_id;
          state.photo = action.payload.jobHunter[0].photo;
          state.subscriptionId =
            action.payload.jobHunter[0].jobHunterSubscription.subscriptionId;
          state.subscriptionActive =
            action.payload.jobHunter[0].jobHunterSubscription.subscription_active;
        } else if (
          action.payload.company &&
          action.payload.company.length > 0
        ) {
          state.isLoggedIn = true;
          state.name = action.payload.company[0].company_name;
          state.email = action.payload.email;
          state.user_role = "company";
          state.innerId = action.payload.company[0].company_id;
          state.photo = action.payload.company[0].logo;
        } else if (
          action.payload.developers &&
          action.payload.developers.length > 0
        ) {
          state.isLoggedIn = true;
          state.name = action.payload.developers[0].developer_name;
          state.email = action.payload.email;
          state.user_role = "developer";
          state.innerId = action.payload.developers[0].developer_id;
        }
        state.pendingState.dataLoading = false;
        state.isLoading = false;
      })
      .addCase(refreshUserToken.pending, (state) => {
        state.pendingState.dataLoading = true;
      })
      .addCase(refreshUserToken.fulfilled, (state) => {
        state.pendingState.dataLoading = false;
        state.isLoading = false;
      });
  },
});

export const { resetState, updateName, updatePhoto } = authSlice.actions;

export default authSlice.reducer;
