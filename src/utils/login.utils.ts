import { LoginAuth } from "@/models/auth.model";
import { toast } from "sonner";
import { AppDispatch } from "@/store";
import { loginUser, resetState } from "@/store/slices/authSlice";
import { NextRouter } from "next/router";

export const handleFormChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setLoginForm: React.Dispatch<React.SetStateAction<LoginAuth>>,
) => {
  const { name, value } = e.target;
  setLoginForm((prev) => ({ ...prev, [name]: value }));
};

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  loginForm: LoginAuth,
  dispatch: AppDispatch,
  setBtnDisable: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  e.preventDefault();
  setBtnDisable(true);
  await dispatch(loginUser(loginForm));
  setBtnDisable(false);
};

export const handleLoginEffect = (
  isLoggedIn: boolean,
  error: string | null,
  router: NextRouter,
  dispatch: AppDispatch,
) => {
  if (isLoggedIn) {
    toast.success("Login successful!");
    router.push("/");
    dispatch(resetState());
  }
  if (error) {
    toast.error(error);
  }
};
