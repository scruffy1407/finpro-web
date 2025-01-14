import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSchema } from "@/validators/auth.validator";
import { z } from "zod";
import Cookies from "js-cookie";
import { AuthHandler } from "@/utils/auth.utils";
import { LoginAuth } from "@/models/auth.model";
import { toast } from "sonner"

interface PendingState {
  dataLoading: boolean;
}

interface LoginResponseData {
  jobHunter?: {
    name: string;
    photo: string;
    job_hunter_id: number;
    jobHunterSubscription: {
      subscriptionId: number;
      subscription_active: boolean;
    };
  }[];
  company?: {
    company_name: string;
    logo: string;
    company_id: number;
  }[];
  developers?: {
    developer_name: string;
    developer_id: number;
  }[];
  email: string;
  phone_number?: string;
  verified: boolean;
}

interface LoginState {
  baseId: number | null;
  innerId: number | null;
  photo?: string;
  email: string;
  name?: string;
  phone_number?: string | null;
  password?: string;
  user_role: string | null;
  isLoading?: boolean;
  isLoggedIn: boolean;
  subscriptionId: number;
  isVerified: boolean;
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
  isVerified: false,
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

export const loginUser = createAsyncThunk<
  {
    access_token: string;
    refresh_token: string;
    data: LoginResponseData;
    callBackUrl: string;
  },
  { loginData: LoginAuth },
  { rejectValue: string }
>("auth/loginUser", async (loginForm, { rejectWithValue }) => {
  try {
    loginSchema.parse(loginForm.loginData);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      loginForm.loginData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    const { access_token, refresh_token, data } = response.data.data;
    Cookies.set("accessToken", access_token, { expires: 1 / 24 });
    Cookies.set("refreshToken", refresh_token, { expires: 3 });

    const callBackUrl = loginForm.loginData.callback || "";

    return { access_token, refresh_token, data, callBackUrl };
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
  }
);

export const refreshUserToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (refreshToken: string) => {
    await authHandler.refreshUserAcessToken(refreshToken);
  }
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
    setCallback: (state, action) => {
      state.callback = action.payload;
    },
    updatePhone: (state, action) => {
      state.phone_number = action.payload;
    },
    logoutUser: (state) => {
      // Clear cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      // Reset state
      state.baseId = null;
      state.innerId = null;
      state.photo = "";
      state.email = "";
      state.name = "";
      state.password = "";
      state.user_role = null;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isVerified = false;
      state.error = null;
      state.subscriptionActive = false;
      state.subscriptionId = 1;
      state.accessToken = "";
      state.refreshToken = "";
      state.callback = "";
      state.pendingState = {
        dataLoading: false,
      };
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
        if (
          action.payload?.data.jobHunter &&
          action.payload?.data.jobHunter.length > 0
        ) {
          state.isLoggedIn = true;
          state.name = action.payload?.data.jobHunter[0].name;
          state.email = action.payload?.data.email;
          state.user_role = "jobhunter";
          state.isVerified = action.payload?.data.verified;
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
          state.isVerified = action.payload?.data.verified;
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
        state.phone_number = action.payload?.data.phone_number
          ? String(action.payload?.data.phone_number)
          : null;

        state.callback = action.payload?.callBackUrl;
        state.pendingState.dataLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.pendingState.dataLoading = false;
        state.error =
          action.payload || "Failed to login, please check credentials or role";
        toast.error(state.error);
      })
      .addCase(validateUserToken.pending, (state) => {
        state.pendingState.dataLoading = true;
      })
      .addCase(validateUserToken.fulfilled, (state, action) => {
        if (action.payload.jobHunter && action.payload.jobHunter.length > 0) {
          state.isLoggedIn = true;
          state.name = action.payload.jobHunter[0].name;
          state.email = action.payload.email;
          state.user_role = "jobhunter";
          state.isVerified = action.payload?.verified;
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
          state.isVerified = action.payload?.verified;
          state.innerId = action.payload.company[0].company_id;
          state.photo = action.payload.company[0].logo;
          state.phone_number = action.payload.phone_number || null;
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

export const {
  updatePhone,
  updateName,
  updatePhoto,
  logoutUser,
  resetState,
  setCallback,
} = authSlice.actions;

export default authSlice.reducer;
