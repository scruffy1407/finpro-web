import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setSearchQuery } from "./searchQuerySlice";

interface SearchQueryJobDashState {
	jobTitle: string;
	sortOrder: string;
}

const initialState: SearchQueryJobDashState = {
	jobTitle: "",
	sortOrder: "",
};

const searchQueryJobDashSlice = createSlice({
	name: "searchQueryJobDash",
	initialState,
	reducers: {
		setSearchQueryJobDash(
			state,
			action: PayloadAction<Partial<SearchQueryJobDashState>>
		) {
			Object.assign(state, action.payload);
		},
	},
});

export const { setSearchQueryJobDash } = searchQueryJobDashSlice.actions;
export default searchQueryJobDashSlice.reducer;
