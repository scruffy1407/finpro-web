import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  updateJobhunterForm,
  startSubmitting,
  submitSuccess,
  submitFailure,
  resetForm,
} from "@/store/slices/registerSlice";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { registerSchema } from "@/validators/auth.validator";
import { FormErrorRegister } from "@/models/formError";
import { toast } from "sonner";

const JobhunterRegister: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobhunter, isSubmitting, error, success } = useSelector(
    (state: RootState) => state.register
  );
  const [formErrors, setFormErrors] = useState<FormErrorRegister>({});

  const handleChange = (field: keyof typeof jobhunter, value: string) => {
    dispatch(updateJobhunterForm({ field, value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(startSubmitting());
    setFormErrors({});

    const payload = {
      email: jobhunter.email,
      name: jobhunter.name,
      password: jobhunter.password,
      user_role: "jobhunter",
    };

    try {
      registerSchema.parse(payload);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("userEmail", jobhunter.email);
        dispatch(submitSuccess());
        toast.success(
          "Account registered successfully! Please check your email to verify your account."
        );
        dispatch(resetForm());
        router.push("/auth/register/verify-email");
      } else {
        console.error("Registration failed please try again.");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: FormErrorRegister = {};
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setFormErrors(errors);
        dispatch(
          submitFailure("Registration failed. Please check your input.")
        );
      } else {
        dispatch(submitFailure("Registration failed. Please try again."));
      }
    }
  };

  return (
    <section className="w-full p-4 md:p-0 md:h-screen md:flex md:w-full">
      <div className="hidden md:min-w[350px] md:relative md:max-w-[35%] md:h-full md:p-8 md:flex md:items-end">
        <Link href="/">
          <Image
            src="/loginAsset/USERREGISTER.webp"
            alt="Image of Person Climbing"
            width={654.72}
            height={1000}
            className="absolute top-0 left-0 h-full w-full object-cover cursor-pointer"
          />
        </Link>

        <div className="w-full rounded-2xl bg-gray-100/13 backdrop-blur-sm p-4">
          <h2 className="text-xl text-white font-bold mb-3">
            Find Your Dream Job
          </h2>
          <p className="text-sm text-white font-normal text-opacity-90">
            {`Create an account to access thousands of job opportunities.`}
          </p>
        </div>
      </div>
      <div className="w-full md:w-[65%] md:p-12 md:flex md:items-center">
        <div className="bg-white p-6 md:w-full md:max-w-[500px] md:p-8 md:rounded-3xl">
          <div className="flex items-center justify-between w-full mb-12">
            <Image
              src={"/logo/MainLogo.svg"}
              alt="main-logo"
              width={100}
              height={200}
              className="h-6"
            />
            <Link
              href={`/auth/register/company`}
              className="text-xs underline text-neutral-950 hover:text-blue-500 md:text-sm"
            >
              Register a company instead?
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl text-neutral-950 font-bold">
              Register as a Jobhunter
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label className="block mb-2">Full Name</Label>
                <Input
                  type="text"
                  value={jobhunter.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm">{formErrors.name}</p>
                )}
              </div>

              <div>
                <Label className="block mb-2">Email</Label>
                <Input
                  type="email"
                  value={jobhunter.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>

              <div>
                <Label className="block mb-2">Password</Label>
                <Input
                  type="password"
                  value={jobhunter.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm">{formErrors.password}</p>
                )}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm">
                  Registration successful!
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-2 text-white rounded-lg font-semibold ${
                  isSubmitting ? `bg-neutral-400` : `bg-blue-500`
                }`}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
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
              Already have an account? <></>
              <Link
                href="/auth/login/jobhunter"
                className="text-blue-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobhunterRegister;
