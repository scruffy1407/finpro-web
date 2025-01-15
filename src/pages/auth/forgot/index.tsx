import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import ButtonComponent from "@/components/ButtonComponent";
import { emailChange } from "@/store/slices/resetPasswordSlice";
import { AuthHandler } from "@/utils/auth.utils";
import SuccessSendEmailSection from "@/components/SuccessSendEmailSection";
import { toast } from "sonner";

function ForgotPassword() {
  const authHandler = new AuthHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { email, isDisable } = useSelector(
    (state: RootState) => state.passwordReset,
  );

  async function handleSendEmailReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const response: string | number = await authHandler.sendResetEmail(email);
    if (response === 200) {
      setSuccess(true);
    } else if (response === "GOOGLE") {
      setIsLoading(false);
      toast.error("Your email is registered by google");
    }
  }

  return (
    <>
      {isLoggedIn ? null : success ? ( // Nothing to show if logged in
        <SuccessSendEmailSection email={email} />
      ) : (
        <section className="w-full p-4 md:p-0 md:h-screen md:flex md:w-full">
          <div className="w-full md:p-12 md:flex md:items-center justify-center">
            <div className="bg-white p-6 md:w-full md:max-w-[500px] md:p-8 md:rounded-3xl">
              <div className="flex items-center justify-between w-full mb-12">
                <Link className={`cursor-pointer`} href="/">
                  <Image
                    src={"/LogoIpsum.svg"}
                    alt="main-logo"
                    width={100}
                    height={200}
                    className="h-6"
                  />
                </Link>
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl text-neutral-950 font-bold mb-4">
                    Reset Your Password
                  </h2>
                  <p className={`text-neutral-600 leading-[120%]`}>
                    {` Don't worry, it happens! Just enter your email below, and
                  we'll send you a link to reset your password.`}
                  </p>
                </div>

                <form
                  onSubmit={handleSendEmailReset}
                  className="flex flex-col gap-8"
                >
                  <div className={`flex flex-col gap-2`}>
                    <Label
                      className="font-semibold text-neutral-950"
                      htmlFor="email"
                    >
                      Email
                    </Label>
                    <Input
                      className="rounded-xl text-sm text-neutral-950"
                      name={`email`}
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(emailChange(e.target.value))
                      }
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <ButtonComponent
                    isSubmit={true}
                    type={"ButtonFilled"}
                    container={`Reset Your Password`}
                    isFullWidth={true}
                    isDisabled={isDisable}
                    isLoading={isLoading}
                  />
                </form>

                <Link
                  className={`text-center text-neutral-950 text-sm font-semibold`}
                  href={"/auth/login"}
                >
                  Back to login page
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ForgotPassword;
