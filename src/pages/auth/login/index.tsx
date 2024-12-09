import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/router";

// NOTES FOR NEXT PHASE
// 1. Connect to API after the backend is complete
// 2. Connect to OAuth after the backend is complete
// 3. Create in separate folder, create an Auth folder to handle all function relate to auth

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const router = useRouter();
  // DATA BELOW IS USE TO SIMULATE SOME SCENARIO, DELETE IT IF ITS READY
  const form: boolean = false;
  const isLogin: boolean = false;
  //
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [btnDisable, setBtnDisable] = useState(true);
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  function handleLoginData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBtnDisable(true);

    // SIMULATE THE RESULT OF THE API
    setTimeout(() => {
      if (form) {
        toast.success("Login Success");
      } else {
        toast.error("Email or password invalid");
        setBtnDisable(false);
      }
    }, 2000);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  useEffect(() => {
    setBtnDisable(true);
    if (
      loginForm.email !== "" &&
      loginForm.password !== "" &&
      emailRegex.test(loginForm.email)
    ) {
      setBtnDisable(false);
    }
  }, [loginForm.password, loginForm.email]);

  useEffect(() => {
    if (isLogin) {
      router.push("/"); // Redirect user to home if already login
    }
  }, [isLogin]);

  return (
    <>
      {isLogin ? (
        ""
      ) : (
        <section className="w-full p-4 md:p-0 md:h-screen md:flex md:w-full">
          <div className="hidden md:min-w[350px] md:relative md:max-w-[35%] md:h-full md:p-8 md:flex md:items-end">
            <a href="/">
              <Image
                src="/loginAsset/login_hero-min.webp"
                alt="Image of building"
                width={654.72}
                height={1000}
                className="absolute top-0 left-0 h-full w-full object-cover cursor-pointer "
              />
            </a>

            <div className="w-full rounded-2xl bg-gray-100/13 backdrop-blur-sm p-4">
              <h2 className="text-xl text-white font-bold mb-3">
                Discover 50K+ Jobs and 300+ Companies
              </h2>
              <p className="text-sm text-white font-normal text-opacity-90">
                {`We've helped over 150,000 candidates find their dream jobs.
                Start your career journey here.`}
              </p>
              <div>{/* Component image goes here */}</div>
            </div>
          </div>
          <div className="w-full md:w-[65%]  md:p-12 md:flex md:items-center">
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
                  href={`#`}
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
                  onSubmit={handleLoginData}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <Label htmlFor={`email`} className="block mb-2">
                      Email
                    </Label>
                    <Input
                      name={`email`}
                      onChange={handleFormChange}
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
                      onChange={handleFormChange}
                      value={loginForm.password}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="ml-auto">
                    <Link
                      className="block text-sm text-blue-500 hover:text-blue-700"
                      href={"#"}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type={"submit"}
                    disabled={btnDisable}
                    className={`w-full p-2 text-white rounded-lg ${btnDisable ? `bg-neutral-400` : `bg-blue-500`} `}
                  >
                    Login
                  </button>
                </form>
                <div className={`flex gap-4 items-center`}>
                  <div className={"border-t border-zinc-200 w-full"}></div>
                  <p className={`text-sm text-neutral-400`}>Or</p>
                  <div className={`border-t border-zinc-200 w-full`}></div>
                </div>
                <button
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
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default LoginPage;
