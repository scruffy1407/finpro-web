import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  handleFormChange,
  handleLogin,
  handleLoginEffect,
} from "@/utils/login.utils";
import { UserRole } from "@/models/auth.model";

function CompanyLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isLoggedIn, error } = useSelector((state: RootState) => state.auth);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    user_role: UserRole.COMPANY,
  });

  const [btnDisable, setBtnDisable] = useState(false);

  useEffect(() => {
    handleLoginEffect(
      UserRole.COMPANY,
      isLoggedIn,
      error as null,
      router,
      dispatch,
    );
  }, [isLoggedIn, error, router, dispatch]);

  return (
    <>
      {isLoggedIn ? (
        ""
      ) : (
        <section className="w-full p-4 md:p-0 md:h-screen md:flex md:w-full">
          <div className="hidden md:min-w[350px] md:relative md:max-w-[35%] md:h-full md:p-8 md:flex md:items-end">
            <Link href="/">
              <Image
                src="/loginAsset/COMPANYLOGIN.webp"
                alt="Image of a Building"
                width={654.72}
                height={1000}
                className="absolute top-0 left-0 h-full w-full object-cover cursor-pointer"
              />
            </Link>

            <div className="w-full rounded-2xl bg-gray-100/13 backdrop-blur-sm p-4">
              <h2 className="text-xl text-white font-bold mb-3">
                Hire Top Talent for Your Company
              </h2>
              <p className="text-sm text-white font-normal text-opacity-90">
                {`Join thousands of companies finding the best candidates for their roles. Create a job listing and manage applications efficiently.`}
              </p>
            </div>
          </div>
          <div className="w-full md:w-[65%] md:p-12 md:flex md:items-center">
            <div className="bg-sky-950 p-6 md:w-full md:max-w-[500px] md:p-8 md:rounded-3xl">
              <div className="flex items-center justify-between w-full mb-12">
                <Image
                  src={"/logo/CompanyLogo.svg"}
                  alt="main-logo"
                  width={120}
                  height={240}
                  className=""
                />
                <Link
                  href={`/auth/login/jobhunter`}
                  className="text-xs underline text-white hover:text-blue-500 md:text-sm"
                >
                  Looking for a job?
                </Link>
              </div>
              <div className="flex flex-col gap-8">
                <h2 className="text-2xl text-white font-bold">
                  Login to your account
                </h2>
                <form
                  onSubmit={(e) =>
                    handleLogin(e, loginForm, dispatch, setBtnDisable)
                  }
                  className="flex flex-col gap-4"
                >
                  <div>
                    <Label htmlFor={`email`} className="block mb-2 text-white">
                      Email
                    </Label>
                    <Input
                      name={`email`}
                      onChange={(e) => handleFormChange(e, setLoginForm)}
                      value={loginForm.email}
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`password`}
                      className="block mb-2 text-white"
                    >
                      Password
                    </Label>
                    <Input
                      name={`password`}
                      onChange={(e) => handleFormChange(e, setLoginForm)}
                      value={loginForm.password}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="ml-auto">
                    <Link
                      className="block text-sm text-white hover:text-blue-500"
                      href={"#"}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type={"submit"}
                    disabled={btnDisable}
                    className={`w-full p-2 text-white rounded-lg font-semibold ${
                      btnDisable ? `bg-neutral-400` : `bg-blue-500`
                    }`}
                  >
                    Sign In
                  </button>
                </form>
                <div className={`flex gap-4 items-center`}>
                  <div className={"border-t border-zinc-200 w-full"}></div>
                  <p className={`text-sm text-neutral-400`}>Or</p>
                  <div className={`border-t border-zinc-200 w-full`}></div>
                </div>
                <button
                  onClick={() =>
                    (window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/company`)
                  }
                  className={`w-full p-2 bg-white text-neutral-900 rounded-lg flex items-center gap-3 justify-center hover:bg-neutral-200`}
                >
                  <Image
                    width={24}
                    height={24}
                    src={"/loginAsset/method_google.svg"}
                    alt={"Google logo"}
                    className={`w-5`}
                  />
                  Sign in with Google
                </button>

                <p className="text-center text-sm text-white">
                  Don&apos;t have an account? <></>
                  <Link
                    href="/auth/register/company"
                    className="text-white underline hover:text-blue-500"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CompanyLogin;
