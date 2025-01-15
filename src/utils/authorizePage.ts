import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { refreshUserToken, validateUserToken } from "@/store/slices/authSlice";

function AuthorizeUser(pagePermission?: "jobhunter" | "company" | "developer") {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  async function handleAuthrorize() {
    // Check the user have token or not when it access the page
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken) {
      if (!refreshToken) {
        if (pagePermission) {
          router.push("/auth/login/jobhunter");
          return;
        } else {
          return;
        }
      } else {
        await dispatch(refreshUserToken(refreshToken as string));
        const newAccessToken = Cookies.get("accessToken"); // get the newest token
        await dispatch(validateUserToken(newAccessToken as string));
      }
      return;
    }
    try {
      if (!isLoggedIn) {
        await dispatch(validateUserToken(accessToken as string));
      }
    } catch (e: unknown) {
      console.error(e);

      router.push("/");
      return;
    }
    // Change any to a valid user response interface
  }
  useEffect(() => {
    handleAuthrorize();
  }, [router]);

  // useEffect(() => {
  //   if (!initialRender.current) {
  //     if (!isLoggedIn) {
  //       router.push("/");
  //       return;
  //     }
  //     if (pagePermission) {
  //       if (user_role !== pagePermission) {
  //         router.push("/");
  //         return;
  //       }
  //     }
  //     return;
  //   }
  //   initialRender.current = false;
  // }, [isLoggedIn]);
}

export default AuthorizeUser;
