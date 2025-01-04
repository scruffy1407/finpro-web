import React, { useState, useEffect } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import JobDetailComponent from "@/components/JobDetailComponent";
import HeadingRelatedComponent from "@/components/HeadingRelatedComponent";
import FooterComponent from "@/components/FooterComponent";
import CompleteProfilePopup from "@/components/CompleteProfilePopup";
import JobApplicationPopup from "@/components/JobApplicationPopup";
import { useRouter } from "next/router";
import JobDetailSuggest from "@/components/JobDetailSuggest";
import Head from "next/head";

function JobDetail() {
  const router = useRouter();
  const { job_id } = router.query; // Extract job_id from URL

  // Just for debugging purposes, log job_id
  console.log("Job ID from Router:", job_id);

  if (!job_id) {
    return <div>Loading...</div>; // Wait until job_id is available
  }

  // Log the job_id to see if it's available
  useEffect(() => {
    console.log("Job ID from Router:", job_id);
  }, [job_id]);

  // Local state to store job details after fetching
  const [jobDetails, setJobDetails] = useState<any>(null);
  // State for Apply Dummy Compplete Profile (popup visible & profile data)
  const [showPopup, setShowPopup] = useState(false);
  // State for Apply Dummy Job Application Apply
  const [showApplyPopup, setShowApplyPopup] = useState(false);

  const [profile, setProfile] = useState<{
    name: string;
    gender: string;
    dob: Date | null;
    location_city: string;
    location_province: string;
  }>({
    name: "",
    gender: "",
    dob: null,
    location_city: "",
    location_province: "",
  });

  // const handleApplyJob = () => {
  //   if (!profile.name || !profile.gender || !profile.dob || !profile.location_city || !profile.location_province) {
  //     // If profile is incomplete, show the complete profile popup
  //     setShowPopup(true);
  //   } else {
  //     // Otherwise, show the apply job popup
  //     setShowApplyPopup(true);
  //   }
  // };

  //Dummy Testing!!
  const handleApplyJob = () => {
    // Always show profile completion popup first as part of the dummy flow
    setShowPopup(true);
  };

  // const handleClosePopup = () => {
  //   setShowPopup(false); // Close the complete profile popup
  // };

  // const handleSubmitProfile = (updatedProfile: typeof profile) => {
  //   setProfile(updatedProfile); // Update the profile
  //   setShowPopup(false); // Close the profile popup after submission
  // };

  //Dummy Testing!!
  const handleSubmitProfile = (updatedProfile: typeof profile) => {
    setProfile(updatedProfile); // Simulate profile update
    setShowPopup(false); // Close the profile popup
    setShowApplyPopup(true); // Open the job application popup immediately
  };

  const handleSubmitApplication = (application: {
    expectedSalary: string | number;
    cvFile: File | null;
  }) => {
    console.log("Job application submitted:", application);
    setShowApplyPopup(false); // Close the job application popup after submission
  };

  return (
    <div className="overflow-hidden mt-5">
       {/* Dynamic Meta Tags HEADING!! */}
       <Head>
        <title>{jobDetails ? `${jobDetails.title} at ${jobDetails.company}` : "Job Details"}</title>
        <meta
          property="og:title"
          content={jobDetails ? `${jobDetails.title} at ${jobDetails.company}` : "Job Details"}
        />
        <meta
          property="og:description"
          content={
            jobDetails
              ? `Exciting job opportunity at ${jobDetails.company}. Click to learn more.`
              : "Job opportunity details."
          }
        />
        <meta
          property="og:image"
          content={jobDetails?.image || "/default-job-image.jpg"} // Fallback to default image
        />
        <meta
          property="og:url"
          content={`https://localhost:3000/jobdetail/${job_id}`}
        />
      </Head>
      {/* SAMPE SINI HEADNYA!!! */}
      <div className="mx-4 w-auto">
        <NavbarComponent
          findJobs="Find Jobs"
          skillAssessment="Skill Assessment"
          exploreCompanies="Explore Companies"
          loginJobHunter="Login"
          loginCompanies="Login as Recruiter"
        />
      </div>

      <div className="mx-4 md:w-auto">
        {/* DUMMY CICK ONAPPLYJOB TO SHOW THE FE!! */}
        <JobDetailComponent
          job_id={String(job_id)} // Pass the job_id as a number to your component
          onApplyJob={handleApplyJob}
        />
      </div>

      <div className=" mx-4 mt-20">
        <HeadingRelatedComponent
          heading="Related Jobs"
          paragraph="Take a look at the jobs we found that are similar to the job you currently have open"
        />
      </div>

      <div className=" mx-4 mt-6">
        <JobDetailSuggest
          job_id={String(job_id)} // Pass the job_id as a number to your component
        />
      </div>

      <div className="mx-4 mt-20 mb-5">
        <FooterComponent />
      </div>

      {/* CompleteProfilePopup Integration */}
      {/* DUMMY TESTING WHEN CLICKING ON PROFILE IT MOVE TO APPLY JOB!!! */}
      {showPopup && (
        <CompleteProfilePopup
          currentProfile={profile}
          onSubmit={handleSubmitProfile} // Leads to job application popup
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* JobApplicationPopup Integration */}
      {showApplyPopup && (
        <JobApplicationPopup
          onSubmit={handleSubmitApplication}
          onClose={() => setShowApplyPopup(false)}
        />
      )}
    </div>
  );
}

export default JobDetail;
