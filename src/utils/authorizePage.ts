import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { refreshUserToken, validateUserToken } from "@/store/slices/authSlice";

function AuthorizeUser(pagePermission?: "jobhunter" | "company" | "developer") {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const initialRender = useRef(true);

  const { isLoggedIn, user_role } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleAuthorization = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      // // No tokens, redirect to login
      // if (!accessToken && !refreshToken) {
      //   router.push("/auth/login/jobhunter");
      //   return;
      // }

      // Refresh token exists, get a new access token
      if (!accessToken && refreshToken) {
        await dispatch(refreshUserToken(refreshToken));
        const newAccessToken = Cookies.get("accessToken");
        if (newAccessToken) {
          await dispatch(validateUserToken(newAccessToken));
        } else {
          throw new Error("Failed to refresh access token.");
        }
        return;
      }

      // Access token exists, validate it
      if (accessToken && !isLoggedIn) {
        await dispatch(validateUserToken(accessToken));
      }
    } catch (error) {
      console.error("Authorization error:", error);
      router.push("/auth/login/jobhunter");
    }
  };

  useEffect(() => {
    const authorize = async () => {
      if (!isLoggedIn) {
        await handleAuthorization();
      }

      // Check role permissions
      if (pagePermission && user_role !== pagePermission) {
        console.log("tes");
        router.push("/");
      }
    };

    if (initialRender.current) {
      initialRender.current = false;
      authorize();
    }
  }, [isLoggedIn, pagePermission, user_role, router]);
}

export default AuthorizeUser;