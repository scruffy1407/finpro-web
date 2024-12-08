import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mobileMenuReducer from "@/store/slices/mobileMenuSlice";
import loginReducer from "@/store/slices/loginSlice";
import registerReducer from "@/store/slices/registerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileMenu: mobileMenuReducer,
    login: loginReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
