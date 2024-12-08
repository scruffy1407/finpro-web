import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mobileMenuReducer from "@/store/slices/mobileMenuSlice";
import resetPasswordReducer from "@/store/slices/resetPasswordSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileMenu: mobileMenuReducer,
    passwordReset: resetPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
