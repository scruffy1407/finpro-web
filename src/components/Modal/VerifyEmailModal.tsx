import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AuthHandler } from "@/utils/auth.utils";
import { AppDispatch, RootState } from "@/store";
import { toast } from "sonner";
import LoadingLoader from "@/components/LoadingLoader";
import Cookies from "js-cookie";
import { logoutUser } from "@/store/slices/authSlice";
import { useRouter } from "next/router";

function VerifyEmailModal() {
  const authHandler = new AuthHandler();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { email } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verifiedEmail, setVerifiedEmail] = useState<boolean>(false);

  const handleResendVerification = async () => {
    if (!email) {
      toast.error(
        "Email is required, please refresh your browser or try to re-login",
      );
      return;
    }
    setIsLoading(true);
    setVerifiedEmail(false);
    const response = await authHandler.resendEmailVerification(email);
    if (response.success) {
      setIsLoading(false);
      setVerifiedEmail(true);
      return;
    } else {
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className={"flex flex-col gap-6 items-center"}>
      <Image
        src={"/emailVerify.svg"}
        width={200}
        height={200}
        className={"w-48"}
        alt={"Subscribe Package"}
      />
      <div className={"flex flex-col gap-2 text-center"}>
        <h2 className="text-2xl font-bold text-neutral-950">
          Let's Verify Your Email First
        </h2>
        <p className={`text-neutral-600 text-sm`}>
          {`We want to make sure it's really you. Verify your email to unlock the full Pathway experience.`}
        </p>
      </div>
      <div className={"flex gap-4"}>
        <Button
          className={`w-full`}
          variant={"primary"}
          onClick={handleResendVerification}
        >
          {isLoading ? (
            <>
              <LoadingLoader /> Sending...
            </>
          ) : (
            "Verify Email"
          )}
        </Button>
        {verifiedEmail ? (
          <Button
            onClick={() => {
              dispatch(logoutUser());
              Cookies.remove("accessToken");
              Cookies.remove("refreshToken");
              router.push("/auth/login/jobhunter");
            }}
            variant={"outline"}
          >
            I Already Verified
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default VerifyEmailModal;
