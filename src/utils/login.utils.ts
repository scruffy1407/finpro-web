import { LoginAuth, UserRole } from "@/models/auth.model";
import { toast } from "sonner";
import { AppDispatch } from "@/store";
import { loginUser, resetState } from "@/store/slices/authSlice";
import { NextRouter } from "next/router";

export const handleFormChange = <T extends Record<string, unknown>>(
  e: React.ChangeEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<T>>,
) => {
  const { name, value } = e.target;
  setter((prev) => ({
    ...prev,
    [name]: name === "callback" && value === undefined ? "" : value,
  }));
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
  callback?: string,
) => {
  if (isLoggedIn) {
    toast.success("Login Successful!");
    if (userRole === UserRole.JOBHUNTER) {
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
      router.push("/developer/analytics");
      dispatch(resetState());
      return;
    } else {
      router.push("/");
      dispatch(resetState());
      return;
    }
  }
  if (error) {
    console.error(error);
    // toast.error(error);
  }
};
