import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyListPostDummy } from "@/utils/datadummy";

interface CompanyPaginationState {
	currentPage: number;
	companiesPerPage: number;
	totalJobs: number;
	totalPages: number;
}

const initialState: CompanyPaginationState = {
	currentPage: 1,
	companiesPerPage: 16,
	totalJobs: CompanyListPostDummy.length,
	totalPages: Math.ceil(CompanyListPostDummy.length / 16), // Total pages based on jobsPerPage
};

const companypaginationSlice = createSlice({
	name: "companyPagination",
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
	},
});

export const { setCurrentPage } = companypaginationSlice.actions;

export default companypaginationSlice.reducer;
