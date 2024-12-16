import React, { useState } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import JobDetailComponent from "@/components/JobDetailComponent";
import HeadingRelatedComponent from "@/components/HeadingRelatedComponent";
import JobMappingComponent from "@/components/JobMappingComponent";
import FooterComponent from "@/components/FooterComponent";
import CompleteProfilePopup from "@/components/CompleteProfilePopup";
import JobApplicationPopup from "@/components/JobApplicationPopup";

function JobDetail() {
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
        <JobDetailComponent onApplyJob={handleApplyJob} />
      </div>

      <div className=" mx-4 mt-20">
        <HeadingRelatedComponent
          heading="Related Jobs"
          paragraph="Take a look at the jobs we found that are similar to the job you currently have open"
        />
      </div>

      <div className=" mx-4 mt-6">
        <JobMappingComponent />
      </div>

      <div className="mx-4 mt-20 mb-5">
        <FooterComponent
          findJobs="Find Jobs"
          skillAssessment="Skill Assessment"
          exploreCompanies="Explore Companies"
        />
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
