import { createSlice } from "@reduxjs/toolkit";

interface ResetPasswordState {
  email: string;
  newPassword: string;
  isSuccess: boolean;
  isDisable: boolean;
}

// ACTION
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
};

const validateNewPassword = (password: string) => {};

// REDUCERS
const initialState: ResetPasswordState = {
  email: "",
  newPassword: "",
  isSuccess: false,
  isDisable: true,
};

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    emailChange: (state, action) => {
      const invalidEmail = validateEmail(action.payload);
      state.email = action.payload;
      state.isDisable = !invalidEmail;
    },
    sendEmailSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    newPasswordChange: (state, action) => {
      state.newPassword = action.payload;
    },
  },
});

export const { emailChange, newPasswordChange } = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
