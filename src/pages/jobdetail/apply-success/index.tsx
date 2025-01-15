import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import FooterComponent from "@/components/FooterComponent";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { Button } from "@/components/ui/button";
import { AuthHandler } from "@/utils/auth.utils";
import { useSearchParams } from "next/navigation";
import LoadingLoader from "@/components/LoadingLoader";
import { CompanyUtils } from "@/utils/company.utils";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const JobApplicationSuccess = () => {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser("jobhunter");
  const companyUtils = new CompanyUtils();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<string | boolean>("");
  const router = useRouter();
  const initialRender = useRef(true);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  async function handleVerifyJob(token: string, jobId: number, apply: string) {
    const response = await companyUtils.verifyApply(token, jobId, apply);
    setIsValid(response);
    setIsLoading(false);
  }
  useEffect(() => {
    const jobId = searchParams.get("job");
    const apply = searchParams.get("apply");

    if (!initialRender.current && isLoggedIn) {
      const token = Cookies.get("accessToken");

      handleVerifyJob(token as string, Number(jobId), apply as string);
      return;
    }
    initialRender.current = false;
  }, [initialRender.current, isLoggedIn]);

  const renderContent = (isValid: boolean) => {
    if (isValid) {
      return (
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 text-center">
          {/* Hero Image */}
          <div className="flex justify-center mb-8">
            <Image
              src="/jobAsset/SuccessHero.svg"
              alt="Hero Image"
              width={250}
              height={250}
            />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Thank you for applying! Your application has been received.
          </h2>
          <p className="text-sm text-neutral-600 mb-10">
            We&apos;re excited to review your application! Please allow 1-3
            business days for us to go through your details. We&apos;ll keep you
            posted via email about the next steps.
          </p>

          <div className={"flex items-center gap-4 justify-center"}>
            <Button
              variant={"primary"}
              onClick={() => router.push("/profile/application-history")}
            >
              View Application History
            </Button>
            <Button variant={"outline"} onClick={() => router.push("/jobs")}>
              Explore More Jobs
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 text-center">
          {/* Hero Image */}
          <div className="flex justify-center mb-8">
            <Image
              src="/jobAsset/SuccessHero.svg"
              alt="Hero Image"
              width={250}
              height={250}
            />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            404 Page
          </h2>
          <p className="text-sm text-neutral-600 mb-10">
            Let get back you to homepage
          </p>

          <Button
            variant={"primary"}
            onClick={() => router.push("/profile/application-history")}
          >
            Back to homepage
          </Button>
        </div>
      );
    }
  };
  return (
    <>
      <Navbar pageRole={"jobhunter"} />
      {/* Main Content */}
      <div className="flex flex-col justify-center items-center mt-10">
        {isLoading
          ? LoadingLoader()
          : isValid === ""
            ? LoadingLoader()
            : renderContent(isValid as boolean)}
      </div>

      <div className="mx-4 mt-20 mb-5">
        <FooterComponent pageRole={"jobhunter"} />
      </div>
    </>
  );
};

export default JobApplicationSuccess;
