import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthHandler } from "@/utils/auth.utils";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { validateUserToken } from "@/store/slices/authSlice";

function AuthorizeUser(
  pagePermission: "jobhunter" | "company",
  owned?: string, // comparison data
) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, user_role, name } = useSelector(
    (state: RootState) => state.auth,
  );

  async function handleAuthrorize() {
    // Check the user have token or not when it access the page
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      router.push("/auth/login/jobhunter");
      return;
    }
    try {
      await dispatch(validateUserToken(accessToken as string));

      if (!isLoggedIn) {
        router.push("/");
        return;
      }
      if (user_role !== pagePermission) {
        router.push("/");
        return;
      }
      //
      // if (owned) {
      //   if (user.id !== owned) {
      //     router.push("/");
      //     return;
      //   }
      // }
    } catch (e: unknown) {
      router.push("/");
      return;
    }
    // Change any to a valid user response interface
  }
  useEffect(() => {
    handleAuthrorize();
  }, [router]);
}

export default AuthorizeUser;
