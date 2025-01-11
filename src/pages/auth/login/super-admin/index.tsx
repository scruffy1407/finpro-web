import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  handleFormChange,
  handleLogin,
  handleLoginEffect,
} from "@/utils/login.utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/models/auth.model";

function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isLoggedIn, error } = useSelector((state: RootState) => state.auth);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    user_role: UserRole.DEVELOPER,
    callback: router.query.callback || "",
  });
  console.log(loginForm.callback);

  const [btnDisable, setBtnDisable] = useState(false);

  useEffect(() => {
    handleLoginEffect(
      loginForm.user_role,
      isLoggedIn,
      error as null,
      router,
      dispatch,
    );
  }, [isLoggedIn, error, router, dispatch]);

  return (
    <main className={"p-4"}>
      <div className="max-w-screen-sm mx-auto bg-white p-6 rounded-2xl ">
        <Image
          src={"/logo/MainLogo.svg"}
          alt="main-logo"
          width={100}
          height={200}
          className="h-6 mb-10"
        />

        <div className="flex flex-col gap-8">
          <h2 className="text-2xl text-neutral-950 font-bold">
            Pathway Admin Login
          </h2>
          <form
            onSubmit={(e) => handleLogin(e, loginForm, dispatch, setBtnDisable)}
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

            <Button type={"submit"} disabled={btnDisable} variant={"primary"}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Index;
