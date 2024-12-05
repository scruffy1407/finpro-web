import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import mobileMenuReducer from '@/store/slices/mobileMenuSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileMenu : mobileMenuReducer
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
