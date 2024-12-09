import { createSlice } from "@reduxjs/toolkit";

interface ResetPasswordState {
  email: string;
  newPassword: string;
  isSuccess: boolean;
  isDisable: boolean;
  validationMessage: string;
}

// ACTION
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
};

const validateNewPassword = (password: string) => {
  // Basic length check
  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long",
    };
  }

  // Regex-based checks
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (!lowercaseRegex.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one lowercase letter",
    };
  }

  if (!uppercaseRegex.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one uppercase letter",
    };
  }

  if (!numberRegex.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one number",
    };
  }

  if (!specialCharRegex.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one special character",
    };
  }

  // If all checks pass, password is valid
  return {
    valid: true,
    message: "Password is valid",
  };
};
// REDUCERS
const initialState: ResetPasswordState = {
  email: "",
  newPassword: "",
  isSuccess: false,
  isDisable: true,
  validationMessage: "",
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
      const { valid, message } = validateNewPassword(action.payload);
      state.validationMessage = message;
      state.newPassword = action.payload;
      state.isDisable = !valid;
    },
  },
});

export const { emailChange, newPasswordChange } = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
