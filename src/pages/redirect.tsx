import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();
  const { target, role } = router.query;
  const [roleMessage, setRoleMessage] = useState<string>("");

  useEffect(() => {
    if (router.isReady && role) {
      // Check if the router is ready and the role exists
      const message =
        role === "jobhunter"
          ? "It looks like you're signed in as a Jobhunter. Redirecting you to the Company login page."
          : "It looks like you're signed in as a Company. We'll redirect you to the Jobhunter login page.";

      setRoleMessage(message);
    }

    if (target) {
      const timeout = setTimeout(() => {
        router.push(target as string);
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [target, role, router]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-xl font-bold text-blue-700 mb-4">
        {roleMessage && (
          <>
            <p className="text-xl text-blue-700 mb-2">
              {roleMessage.split(".")[0]}
            </p>
            <p className="text-xl text-blue-500">
              {roleMessage.split(".")[1]}
            </p>
          </>
        )}
      </h1>
      <p className="text-blue-500 font-bold text-lg mt-4">Redirecting...</p>
    </div>
  );
};

export default RedirectPage;
