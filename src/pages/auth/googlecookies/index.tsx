import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const GoogleCookies = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return; // Wait until the router is ready

    const { access_token, refresh_token } = router.query;
    if (access_token && refresh_token) {
      // Save tokens in cookies
      Cookies.set("accessToken", access_token as string, { expires: 1 / 24 });
      Cookies.set("refreshToken", refresh_token as string, { expires: 7 });

      router.push("/");
    } else if (!access_token && !refresh_token) {
      // Query parameters are missing
      console.error("No tokens found in query parameters.");
      setIsLoading(false);
    }
  }, [router.isReady, router.query]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {isLoading ? (
        <div className="text-center">
          <h1 className="text-xl font-bold text-blue-700">Redirecting...</h1>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-700 mb-3">
            Failed to Redirect!, please try again
          </h1>
          <Button
            onClick={() => router.push("/")}
            variant={"primary"}
            size={"lg"}
          >
            Return To homepage
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoogleCookies;