import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ButtonComponent from "@/components/ButtonComponent";
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";

const JobApplicationSuccess = () => {
  const router = useRouter();

  const handleRedirect = () => {
    // REDIRECT TO JOB HISTORY/USER *to be fix
    // penjagaan buat apply doang yang bisa access ini apa gausah? gatau juga
    router.push("/jobhistory");
  };

  return (
    <div className="overflow-hidden mt-5">
      <div className="mx-4 w-auto">
        <NavbarComponent
          findJobs="Find Jobs"
          skillAssessment="Skill Assessment"
          exploreCompanies="Explore Companies"
          loginJobHunter="Login"
          loginCompanies="Login as Recruiter"
        />
      </div>
      {/* Main Content */}
      <div className="flex flex-col pt-20 justify-center items-center">
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 bg-white p-8 rounded-xl text-center">
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
          <p className="text-lg text-neutral-600 mb-8">
            We&apos;re excited to review your application! Please allow 1-3
            business days for us to go through your details. We&apos;ll keep you
            posted via email about the next steps.
          </p>

          {/* Button to View Job History */}
          <ButtonComponent
            type="ButtonFilled"
            container="View Job History"
            onClick={handleRedirect}
          />
        </div>
      </div>

      <div className="mx-4 mt-20 mb-5">
        <FooterComponent
          findJobs="Find Jobs"
          skillAssessment="Skill Assessment"
          exploreCompanies="Explore Companies"
        />
      </div>
    </div>
  );
};

export default JobApplicationSuccess;
