import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "zod";

interface SearchQueryState {
	jobTitle: string;
	categoryId: string;
	jobType: string;
	dateRange: string;
	sortOrder: string;
	companyCity : string;
}

const initialState: SearchQueryState = {
	jobTitle: "",
	categoryId: "",
	jobType: "",
	dateRange: "",
	sortOrder: "",
	companyCity : "",
};

const searchQuerySlice = createSlice({
	name: "searchQuery",
	initialState,
	reducers: {
		setSearchQuery(state, action: PayloadAction<SearchQueryState>) {
			state.jobTitle = action.payload.jobTitle;
			state.categoryId = action.payload.categoryId;
			state.jobType = action.payload.jobType; // Update jobType
			state.dateRange = action.payload.dateRange; // Update dateRange
			state.sortOrder = action.payload.sortOrder; // Update sortOrder
			state.companyCity = action.payload.companyCity
		},
	},
});

export const { setSearchQuery } = searchQuerySlice.actions; // Ensure that we export the action correctly
export default searchQuerySlice.reducer;
