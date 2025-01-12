import { LoginAuth, UserRole } from "@/models/auth.model";
import { toast } from "sonner";
import { AppDispatch } from "@/store";
import { loginUser, resetState, setCallback } from "@/store/slices/authSlice";
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
  await dispatch(
    loginUser({
      loginData: loginForm,
    }),
  );
  setBtnDisable(false);
};

export const handleLoginEffect = (
  userRole: UserRole,
  isLoggedIn: boolean,
  error: string | null,
  router: NextRouter,
  dispatch: AppDispatch,
  callback: string,
) => {
  if (isLoggedIn) {
    toast.success("Login successful!");
    if (userRole === UserRole.JOBHUNTER) {
      // Redirect based on callback value
      const redirectTo = callback || "/";
      console.log("REDIRECTTOK", redirectTo);
      router.push(redirectTo);
      dispatch(resetState());
      return;
    } else if (userRole === UserRole.COMPANY) {
      router.push(callback || "/dashboard/company");
      dispatch(resetState());
      return;
    } else if (userRole === UserRole.DEVELOPER) {
      router.push("/dashboard/admin");
      dispatch(resetState());
      return;
    } else {
      router.push("/");
      dispatch(resetState());
      return;
    }
  }
  if (error) {
    toast.error(error);
  }
};
