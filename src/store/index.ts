import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mobileMenuReducer from "@/store/slices/mobileMenuSlice";
import paginationReducer from "@/store/slices/jobPaginationSlice";
import companyPaginationReducer from "@/store/slices/companyPaginationSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		mobileMenu: mobileMenuReducer,
		pagination: paginationReducer,
		companyPagination: companyPaginationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
