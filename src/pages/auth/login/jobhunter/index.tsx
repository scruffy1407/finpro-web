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

function JobHunterLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isLoggedIn, error } = useSelector((state: RootState) => state.login);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    user_role: "jobhunter",
  });

  const [btnDisable, setBtnDisable] = useState(false);

  useEffect(() => {
    handleLoginEffect(isLoggedIn, error, router, dispatch);
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
                src="/loginAsset/login_hero-min.webp"
                alt="Image of building"
                width={654.72}
                height={1000}
                className="absolute top-0 left-0 h-full w-full object-cover cursor-pointer"
              />
            </Link>

            <div className="w-full rounded-2xl bg-gray-100/13 backdrop-blur-sm p-4">
              <h2 className="text-xl text-white font-bold mb-3">
                Discover 50K+ Jobs and 300+ Companies
              </h2>
              <p className="text-sm text-white font-normal text-opacity-90">
                {`We've helped over 150,000 candidates find their dream jobs. Start your career journey here.`}
              </p>
            </div>
          </div>
          <div className="w-full md:w-[65%] md:p-12 md:flex md:items-center">
            <div className="bg-white p-6 md:w-full md:max-w-[500px] md:p-8 md:rounded-3xl">
              <div className="flex items-center justify-between w-full mb-12">
                <Image
                  src={"/LogoIpsum.svg"}
                  alt="main-logo"
                  width={100}
                  height={200}
                  className="h-6"
                />
                <Link
                  href={`/auth/login/company`}
                  className="text-xs underline text-neutral-950 hover:text-blue-500 md:text-sm"
                >
                  Looking for candidate?
                </Link>
              </div>
              <div className="flex flex-col gap-8">
                <h2 className="text-2xl text-neutral-950 font-bold">
                  Login to your account
                </h2>
                <form
                  onSubmit={(e) =>
                    handleLogin(e, loginForm, dispatch, setBtnDisable)
                  }
                  className="flex flex-col gap-4"
                >
                  <div>
                    <Label htmlFor={`email`} className="block mb-2">
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
                    <Label htmlFor={`password`} className="block mb-2">
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
                      className="block text-sm text-blue-500 hover:text-blue-700"
                      href={"/auth/forgot"}
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
                    (window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/jobhunter`)
                  }
                  className={`w-full p-2 bg-neutral-950 text-white rounded-lg flex items-center gap-3 justify-center hover:bg-neutral-800`}
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

                <p className="text-center text-sm">
                  Don&apos;t have an account? <></>
                  <Link href="/auth/register/jobhunter" className="text-blue-500 hover:underline">
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

export default JobHunterLogin;
