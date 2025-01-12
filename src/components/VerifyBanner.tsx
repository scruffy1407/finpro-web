import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AuthHandler } from "@/utils/auth.utils";
import LoadingLoader from "@/components/LoadingLoader";

function VerifyBanner() {
  const authHandler = new AuthHandler();
  const { email } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResendVerification = async () => {
    if (!email) {
      toast.error(
        "Email is required, please refresh your browser or try to re-login",
      );
      return;
    }
    setIsLoading(true);
    const response = await authHandler.resendEmailVerification(email);
    if (response.success) {
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      return;
    }
  };

  return (
    <section className={"max-w-screen-xl w-full mx-auto px-4 mt-3 mb-3"}>
      <div
        className={
          "py-2  px-5  bg-sky-100 flex gap-4 justify-center items-center rounded-2xl"
        }
      >
        <p className={"text-xs text-neutral-600 font-bold"}>
          Verify your email to unlock the full Pathway experience.
        </p>
        <Button
          onClick={handleResendVerification}
          className={"w-fit "}
          variant={"outline"}
          size={"xs"}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingLoader /> Sending...
            </>
          ) : (
            "Verify Email"
          )}
        </Button>
      </div>
    </section>
  );
}

export default VerifyBanner;
