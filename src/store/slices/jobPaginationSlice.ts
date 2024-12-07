import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jobListPostDummy } from "@/utils/datadummy";

interface PaginationState {
  currentPage: number;
  jobsPerPage: number;
  totalJobs: number;
  totalPages: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  jobsPerPage: 15,
  totalJobs: jobListPostDummy.length,
  totalPages: Math.ceil(jobListPostDummy.length / 15), // Total pages based on jobsPerPage
};

const jobPaginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = jobPaginationSlice.actions;

export default jobPaginationSlice.reducer;
