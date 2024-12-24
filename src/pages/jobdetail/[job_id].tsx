import React, { useState, useEffect } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import JobDetailComponent from "@/components/JobDetailComponent";
import HeadingRelatedComponent from "@/components/HeadingRelatedComponent";
import FooterComponent from "@/components/FooterComponent";
import { useRouter } from "next/router";
import JobDetailSuggest from "@/components/JobDetailSuggest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import {
  getGeneralInfo,
  handleGetcity,
  handleGetProvince,
  handleGetUseLocation,
} from "@/store/slices/generalInfo";
import Cookies from "js-cookie";
import axios from "axios";
import GeneralInfoForm from "@/components/Form/generalInfoForm";
import ModalContainer from "@/components/Modal/ModalContainer";
import FormJobApplication from "@/components/Form/FormApplyJob";
import { Button } from "@/components/ui/button";
import { AuthHandler } from "@/utils/auth.utils";

function JobDetail() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();
  const router = useRouter();
  const { job_id } = router.query; // Extract job_id from URL
  const callbackPath = "/auth/login/jobhunter?callback=ini-bosss";
  const [jobData, setJobData] = useState<any | null>(null);
  const [relatedPost, setRelatedPost] = useState<any[] | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { validApply, pendingState, listProvince, listCity, cityId } =
    useSelector((state: RootState) => state.generalInfo);

  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  // Just for debugging purposes, log job_id
  const fetchJobDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/company/jobDetails/${job_id}`,
      );

      if (response.status === 200) {
        setJobData(response.data.jobPostDetail); // Set Detail Job Information
        setRelatedPost(response.data.relatedJobPosts);
      } else {
        setJobData(null);
        setRelatedPost(null);
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
    } finally {
    }
  };

  function handleRedirect() {
    dispatch(closeModalAction());
    router.push(callbackPath);
  }

  const handleApplyJob = async () => {
    if (isLoggedIn) {
      if (validApply) {
        dispatch(openModalAction("applyJobModal"));
      } else {
        console.log(listProvince, listCity);
        if (listProvince.length === 0) {
          await dispatch(handleGetUseLocation(cityId as number));
          await dispatch(handleGetcity(cityId as number));
          await dispatch(handleGetProvince());
        }
        dispatch(openModalAction("completeInformationModal"));
      }
    } else {
      dispatch(openModalAction("needToLoginModal"));
    }
  };

  async function handleGetGeneralInfo() {
    const token = Cookies.get("accessToken");
    await dispatch(getGeneralInfo(token as string));
  }

  useEffect(() => {
    console.log("IS RENDERRR", pendingState.isRender);
    if (isLoggedIn) {
      if (!pendingState.isRender) {
        console.log("exec");
        handleGetGeneralInfo();
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (job_id) {
      fetchJobDetail();
    }
  }, [job_id]);

  return (
    <>
      <ModalContainer
        title={"Apply Job"}
        isOpen={currentModalId === "applyJobModal"}
        onClose={handleCloseModal}
      >
        <>
          <p className="break-words text-neutral-600">
            You will apply to{" "}
            <span className="font-semibold text-neutral-950">
              {jobData?.company?.company_name}
            </span>{" "}
            as
            <span className="font-semibold text-neutral-950">
              {" "}
              {jobData?.job_title}
            </span>
          </p>
          <FormJobApplication jobId={Number(job_id)} />
        </>
      </ModalContainer>

      <ModalContainer
        title={"Before You Continue, Let's Complete Your Profile"}
        description={
          "Having a complete profile makes it easier for recruiters to find the perfect candidate for the job!"
        }
        isOpen={currentModalId === "completeInformationModal"}
        onClose={handleCloseModal}
      >
        <GeneralInfoForm />
      </ModalContainer>
      <ModalContainer
        isOpen={currentModalId === "needToLoginModal"}
        onClose={handleCloseModal}
      >
        <div className={"flex flex-col gap-6"}>
          <div className={"flex flex-col gap-2 text-center"}>
            <h2 className="text-2xl font-bold text-neutral-950">
              Login to apply to this job
            </h2>
            <p className={`text-neutral-600 text-sm`}>
              {` Don't miss out on your next big opportunity. Login now to explore
              10K+ jobs from 200+ top companies. Your dream career is just a
              click away.`}
            </p>
          </div>
          <div className={"flex gap-4"}>
            <Button
              className={`w-full`}
              variant={"outline"}
              onClick={() => router.push("/auth/register/jobhunter")}
            >
              Register
            </Button>
            <Button
              className={`w-full`}
              variant={"primary"}
              onClick={handleRedirect}
            >
              Login
            </Button>
          </div>
        </div>
      </ModalContainer>

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
          <JobDetailComponent
            job_id={String(job_id)} // Pass the job_id as a number to your component
            onApplyJob={handleApplyJob}
            jobData={jobData}
          />
        </div>

        <div className=" mx-4 mt-20">
          <HeadingRelatedComponent
            heading="Related Jobs"
            paragraph="Take a look at the jobs we found that are similar to the job you currently have open"
          />
        </div>

        <div className=" mx-4 mt-6">
          <JobDetailSuggest listRelatedJob={relatedPost as any[]} />
        </div>

        <div className="mx-4 mt-20 mb-5">
          <FooterComponent />
        </div>
      </div>
    </>
  );
}

export default JobDetail;
