import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice_tes";
import mobileMenuReducer from "@/store/slices/mobileMenuSlice";
import authReducer from "@/store/slices/authSlice";
import registerReducer from "@/store/slices/registerSlice";
import paginationReducer from "@/store/slices/jobPaginationSlice";
import companyPaginationReducer from "@/store/slices/companyPaginationSlice";
import resetPasswordReducer from "@/store/slices/resetPasswordSlice";
import modalControllerReducer from "@/store/slices/ModalSlice";
import workExperienceReducer from "@/store/slices/WorkingExpSlice";
import educationReducer from "@/store/slices/EducationSlice";

const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
    auth: authReducer,
    register: registerReducer,
    pagination: paginationReducer,
    companyPagination: companyPaginationReducer,
    passwordReset: resetPasswordReducer,
    modalController: modalControllerReducer,
    workExperience: workExperienceReducer,
    education: educationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
