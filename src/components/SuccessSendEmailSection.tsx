import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SuccessProps {
  email: string;
}

function SuccessSendEmailSection({ email }: SuccessProps) {
  return (
    <section className="w-full p-4 md:p-0 md:h-screen md:flex md:w-full">
      <div className="w-full md:p-12 md:flex md:items-center justify-center">
        <div className="bg-white p-6 md:w-full md:max-w-[500px] md:p-8 md:rounded-3xl">
          <div className="flex flex-col gap-6 w-full mb-12">
            <Link className={`cursor-pointer`} href="/">
              <Image
                src={"/logo/MainLogo.svg"}
                alt="main-logo"
                width={100}
                height={200}
                className="h-6"
              />
            </Link>
            <Image
              src={"/resetPassword/sendRequestEmail.svg"}
              alt="Reset Password Image"
              width={323.35}
              height={250}
            />
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl text-neutral-950 font-bold mb-4">
                Sending to your email
              </h2>
              <p className={`text-neutral-600 leading-[120%]`}>
                We're searching for your Pathway account that linked to
                <strong> {email}</strong>, We're on the case.
                <br />
                <br /> If it's there, you'll receive an email with instructions
                shortly. Otherwise, feel free to double-check the email you
                entered or your spam folder in a few minutes.
              </p>
            </div>

            <Link
              className={`text-center text-neutral-950 text-sm font-semibold`}
              href={"/auth/login/jobhunter"}
            >
              Back to login page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuccessSendEmailSection;
