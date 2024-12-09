import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  jobhunter: {
    name: string;
    email: string;
    password: string;
    user_role: string;
  };
  company: {
    companyName: string;
    email: string;
    password: string;
    phoneNumber: string;
    user_role: string;
  };
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  jobhunter: {
    name: "",
    email: "",
    password: "",
    user_role: "jobhunter",
  },
  company: {
    companyName: "",
    email: "",
    password: "",
    phoneNumber: "",
    user_role: "company",
  },
  isSubmitting: false,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateJobhunterForm(
      state,
      action: PayloadAction<{ field: keyof RegisterState["jobhunter"]; value: string }>
    ) {
      state.jobhunter[action.payload.field] = action.payload.value;
    },
    updateCompanyForm(
      state,
      action: PayloadAction<{ field: keyof RegisterState["company"]; value: string }>
    ) {
      state.company[action.payload.field] = action.payload.value;
    },
    startSubmitting(state) {
      state.isSubmitting = true;
      state.error = null;
    },
    submitSuccess(state) {
      state.isSubmitting = false;
      state.success = true;
    },
    submitFailure(state, action: PayloadAction<string>) {
      state.isSubmitting = false;
      state.error = action.payload;
      state.success = false;
    },
    resetForm(state) {
      state.jobhunter = initialState.jobhunter;
      state.company = initialState.company;
      state.isSubmitting = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  updateJobhunterForm,
  updateCompanyForm,
  startSubmitting,
  submitSuccess,
  submitFailure,
  resetForm,
} = registerSlice.actions;

export default registerSlice.reducer;