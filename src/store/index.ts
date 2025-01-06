import { configureStore } from "@reduxjs/toolkit";
import mobileMenuReducer from "@/store/slices/mobileMenuSlice";
import authReducer from "@/store/slices/authSlice";
import registerReducer from "@/store/slices/registerSlice";
import paginationReducer from "@/store/slices/jobPaginationSlice";
import companyPaginationReducer from "@/store/slices/companyPaginationSlice";
import resetPasswordReducer from "@/store/slices/resetPasswordSlice";
import searchQueryReducer from "@/store/slices/searchQuerySlice";
import modalControllerReducer from "@/store/slices/ModalSlice";
import workExperienceReducer from "@/store/slices/WorkingExpSlice";
import educationReducer from "@/store/slices/EducationSlice";
import searchQueryJobDashReducer from "@/store/slices/searchQueryJobDashSlice"
import bookmarksReducer from "@/store/slices/bookmarkSlice";
import generalInfoReducer from "@/store/slices/generalInfo";
import companySearchReducer from "@/store/slices/companySearchSlice";

const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
    auth: authReducer,
    register: registerReducer,
    pagination: paginationReducer,
    companyPagination: companyPaginationReducer,
    passwordReset: resetPasswordReducer,
    searchQuery: searchQueryReducer,
    modalController: modalControllerReducer,
    workExperience: workExperienceReducer,
    education: educationReducer,
    bookmarks: bookmarksReducer,
    searchQueryJobdash : searchQueryJobDashReducer,
    generalInfo: generalInfoReducer,
    companySearch: companySearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
