import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const VerifyEmail = () => {
  const router = useRouter();
  const { verificationToken } = router.query; // Extract the token from URL params
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (verificationToken) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email/${verificationToken}`)
        .then(() => {
          setStatus("success");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [verificationToken]); // Dependency on verificationToken

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
        <div className="flex justify-center mb-6">
          <Image
            src="/jobAsset/SuccessHero.svg"
            alt="Hero Success Image"
            width={240}
            height={240}
          />
        </div>
        {status === "success" ? (
          <>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              Your Email Has Been Verified!
            </h2>
            <p className="text-lg text-neutral-600 mb-6">
              Thank you for verifying your Pathway account. You can now log in.
            </p>
            <Link href="/auth/login/jobhunter">
              <button className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-xl text-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                Login
              </button>
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              Verification Failed
            </h2>
            <p className="text-lg text-neutral-600 mb-6">
              The verification link is invalid or has expired. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
