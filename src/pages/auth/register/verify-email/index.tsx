import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleResendVerification = async () => {
    if (!userEmail) return;

    setIsResending(true);
    setResendStatus(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend-verification`,
        { email: userEmail },
      );

      if (response.status === 200) {
        setResendStatus(
          "Success! We've sent the verification email to your inbox.",
        );
      } else {
        setResendStatus(
          "Oops! We couldn't resend the verification email. Please try again later.",
        );
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setResendStatus(
        "Failed to resend verification email. Please try again later.",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-8 rounded-xl text-center w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
        <div className="flex justify-center mb-6">
          <Image
            src="/jobAsset/SuccessHero.svg"
            alt="Hero Success Image"
            width={240}
            height={240}
          />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
          Please Verify Your Email
        </h2>
        <p className="text-sm text-neutral-600 mb-2">
          We have sent a verification email to your inbox. Please click on the
          link in the email to verify your account.
        </p>
        <p className="text-sm text-neutral-600 mb-6">
          If you don&apos;t see the email, check your spam folder or click below
          to resend the email.
        </p>

        <Button
          variant={"outline"}
          onClick={handleResendVerification}
          disabled={isResending}
        >
          {isResending ? "Resending..." : "Resend Verification Email"}
        </Button>

        {resendStatus && (
          <p
            className={`mt-5 text-sm px-6 py-2 w-fit mx-auto rounded-2xl ${resendStatus.includes("Success") ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
          >
            {resendStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
