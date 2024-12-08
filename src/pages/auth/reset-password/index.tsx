import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonComponent from "@/components/ButtonComponent";
import { AuthHandler } from "@/utils/auth.utils";
import { useRouter } from "next/router";
import loadingLoader from "@/components/LoadingLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { newPasswordChange } from "@/store/slices/resetPasswordSlice";
import { toast } from "sonner";

function ResetPassword() {
  const router = useRouter();
  const autHandler = new AuthHandler();
  const initialRender = useRef(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { newPassword } = useSelector(
    (state: RootState) => state.passwordReset,
  );

  // Check when re-render
  // Validate when user landing on page
  async function validateResetToken(token: string) {
    try {
      const response = await autHandler.validateResetToken(token);
      if (response === 200) {
        setResetToken(token);
        setIsValid(true);
      } else {
        router.push("/");
      }
    } catch (err) {
      setIsLoading(false);
      router.push("/login");
    }
  }

  useEffect(() => {
    const listPath = (location.pathname + location.search)
      .substr(1)
      .includes("token");
    !listPath ? router.push("/") : null;

    const token = router.query.token as string;
    if (!initialRender.current) {
      token ? validateResetToken(token) : null;
    }

    initialRender.current = false;
  }, [router.query.token]);

  // Submit New Password
  async function handleSetNewPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await autHandler.setNewPassword(
        newPassword,
        resetToken as string,
      );
      if (response === 200) {
        toast.success("Password successfully updated, Let's login");
        router.push("/auth/login");
      } else {
        setIsLoading(false);
        toast.error("Something went wrong, please try again");
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Something went wrong, please try again");
    }
  }

  return isValid ? (
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
                Set new password
              </h2>
              <p className={`text-neutral-600 leading-[120%]`}>
                {`Please enter your new password, minimum 6 character`}
              </p>
            </div>

            <form
              onSubmit={handleSetNewPassword}
              className="flex flex-col gap-8"
            >
              <div className={`flex flex-col gap-2`}>
                <Label
                  className="font-semibold text-neutral-950"
                  htmlFor="password"
                >
                  New Password
                </Label>
                <Input
                  className="rounded-xl text-sm text-neutral-950"
                  name={`password`}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={newPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(newPasswordChange(e.target.value))
                  }
                />
              </div>

              <ButtonComponent
                isSubmit={true}
                type={"ButtonFilled"}
                container={`Reset Your Password`}
                isFullWidth={true}
                isLoading={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className={`w-full h-screen flex items-center justify-center`}>
      {loadingLoader()}
    </div>
  );
}

export default ResetPassword;
