// src/store/slices/jobPaginationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  totalJobPosts: number;
  totalPages: number; // Add totalPages to the state type
}

const initialState: PaginationState = {
  currentPage: 1,
  totalJobPosts: 0,
  totalPages: 1, // Set default value for totalPages
};

const jobPaginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    // Modify the setPaginationData reducer to accept both totalJobPosts and totalPages
    setPaginationData(state, action: PayloadAction<{ totalJobPosts: number, totalPages: number }>) {
      state.totalJobPosts = action.payload.totalJobPosts;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setCurrentPage, setPaginationData } = jobPaginationSlice.actions;
export default jobPaginationSlice.reducer;
