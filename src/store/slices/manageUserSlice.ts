import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state interface without optional fields since we initialize them to empty strings

interface PaginationState {
  currentPage: number;
  totalJobPosts: number;
  totalPages: number; // Add totalPages to the state type
}

interface SearchQueryState {
  subsId: string;
  pagination: PaginationState;
}

// Initialize state with default values
const initialState: SearchQueryState = {
  subsId: "",
  pagination: {
    currentPage: 1,
    totalJobPosts: 0,
    totalPages: 1, // Set default value for totalPages
  },
};

const manageUserSlice = createSlice({
  name: "manageUserSlice",
  initialState,
  reducers: {
    setCompanySearch(state, action) {
      // Merge the partial updates with the current state
      Object.assign(state, action.payload);
    },
    resetPaginationState(state) {
      state.pagination.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.pagination.currentPage = action.payload;
    },
    setPaginationData(
      state,
      action: PayloadAction<{ totalJobPosts: number; totalPages: number }>,
    ) {
      state.pagination.totalJobPosts = action.payload.totalJobPosts;
      state.pagination.totalPages = action.payload.totalPages;
    },
  },
});

export const {
  setCompanySearch,
  setCurrentPage,
  setPaginationData,
  resetPaginationState,
} = manageUserSlice.actions;
export default manageUserSlice.reducer;
