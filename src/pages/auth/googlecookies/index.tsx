import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const GoogleCookies = () => {
  const router = useRouter();

  useEffect(() => {
    const { access_token, refresh_token } = router.query;

    if (access_token && refresh_token) {
      Cookies.set("accessToken", access_token as string, { expires: 1 / 24 });
      Cookies.set("refreshToken", refresh_token as string, { expires: 7 });

      router.push("/");
    } else {
      console.error("No tokens found in query parameters.");
      router.push("/auth/login");
    }
  }, [router]);


  //change with isloading in the redirecting (animation muter)
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-xl font-bold text-blue-700">Redirecting...</h1>
      </div>
    </div>
  );
};

export default GoogleCookies;
