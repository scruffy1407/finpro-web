import { createSlice } from "@reduxjs/toolkit";

interface MobileMenuState {
	isMobileMenuOpen: boolean;
}

const initialState: MobileMenuState = {
	isMobileMenuOpen: false,
};

const mobileMenuSlice = createSlice({
	name: "mobileMenu",
	initialState,
	reducers: {
		toggleMobileMenu: (state) => {
			state.isMobileMenuOpen = !state.isMobileMenuOpen;
		},
	},
});

export const { toggleMobileMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
