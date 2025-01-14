import React, { useState, useEffect } from "react";
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
import axios from "axios";
import GeneralInfoForm from "@/components/Form/generalInfoForm";
import ModalContainer from "@/components/Modal/ModalContainer";
import FormJobApplication from "@/components/Form/FormApplyJob";
import { Button } from "@/components/ui/button";
import { AuthHandler } from "@/utils/auth.utils";
import Cookies from "js-cookie";
import { JobApplication } from "@/models/applicant.model";
import { Navbar } from "@/components/NavigationBar/Navbar";
import Head from "next/head";
import ForbiddenCompanyAction from "@/components/Modal/ForbiddenCompanyAction";
import VerifyBanner from "@/components/VerifyBanner";
import LoadingLoader from "@/components/LoadingLoader";
import {
  setBookmarks,
  addBookmark,
  removeBookmark,
} from "@/store/slices/bookmarkSlice";
import { toast } from "sonner";


function JobDetail() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser();
  const router = useRouter();
  const { job_id } = router.query;
  const [applicantData, setApplicantData] = useState<null | JobApplication>(
    null
  );
  const [jobData, setJobData] = useState<any | null>(null);

  const [relatedPost, setRelatedPost] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [validateLoading, setValiateLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [callBackPath, setcallBackPath] = useState<string>("");
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController
  );
  const { isLoggedIn, user_role, isVerified } = useSelector(
    (state: RootState) => state.auth
  );
  const { validApply, pendingState, listProvince, cityId } =
    useSelector((state: RootState) => state.generalInfo);

  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  const fetchJobDetail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/jobDetails/${job_id}`
      );

      if (response.status === 200) {
        setJobData(response.data.jobPostDetail);
        setRelatedPost(response.data.relatedJobPosts);
        setIsLoading(false);
      } else {
        setJobData(null);
        setRelatedPost(null);
        setIsLoading(false);
      }

      console.log("THis is response");
      console.log(response);
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };

  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );
  const isBookmarked = bookmarks.some(
    (bookmark) => bookmark.jobPostId === Number(job_id)
  );

  const fetchBookmarks = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Token is missing from cookies.");
        return;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const jobWishlist = response.data.bookmarks?.jobWishlist || [];
      dispatch(setBookmarks(jobWishlist));
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [dispatch]);

  const handleToggleBookmark = async (jobPostId: number) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        toast.error("You need to be logged in to add bookmark");
        return;
      }

      const existingBookmark = bookmarks.find(
        (bookmark) => bookmark.jobPostId === jobPostId
      );

      if (existingBookmark) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark/remove`,
          { wishlist_id: existingBookmark.wishlist_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(removeBookmark(existingBookmark.wishlist_id));
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
          { jobPostId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addBookmark(response.data.bookmark));
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };
  const validateUserJob = async () => {
    const token = Cookies.get("accessToken");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/job-hunter/validate/${job_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200 && response.data.code === "JOIN") {
        setApplicantData({
          jobHunterId: response.data.data.jobHunterId,
          resume: response.data.data.resume,
          createdAt: response.data.data.created_at,
          applicationStatus: response.data.data.application_status,
          applicationId: response.data.data.application_id,
          endDate: response.data.data.resultPreSelection[0]?.end_date,
          completionStatus:
            response.data.data.resultPreSelection[0]?.completion_status,
        });
        console.log("This is applicant data");
      } else if (response.status === 200 && response.data.code === "NOT_JOIN") {
        setApplicantData(null);
        console.log("This is applicant data Failes");
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };

  function handleRedirect() {
    dispatch(closeModalAction());
    router.push(`/auth/login/jobhunter?callback=${callBackPath}`);
  }
  const handleApplyJob = async () => {
    if (isLoggedIn) {
      if (user_role === "jobhunter") {
        if (validApply && jobData.preSelectionTest) {
          router.push(
            `/executionPretest/${jobData.preSelectionTestId}?job_id=${job_id}`,
          );
        } else {
          // Ensure applicationStatus is defined before comparing
          if ((applicantData?.applicationStatus as string) === "pass") {
            dispatch(openModalAction("applyJobModal"));
          }
        }
        if (validApply && !jobData.preSelectionTestId) {
          dispatch(openModalAction("applyJobModal"));
        } else {
          if (listProvince.length === 0) {
            await dispatch(handleGetUseLocation(cityId as number));
            await dispatch(handleGetcity(cityId as number));
            await dispatch(handleGetProvince());
          }
          dispatch(openModalAction("completeInformationModal"));
        }
      } else {
        dispatch(openModalAction("companyForbiddenModal"));
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
    if (router.isReady) {
      // Use asPath for full path (including query), or pathname for the route
      setcallBackPath(router.asPath);
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    if (job_id) {
      setDataLoading(true);
      fetchJobDetail();
      if (isLoggedIn && user_role === "jobhunter") {
        setValiateLoading(true);
        validateUserJob();
        if (!pendingState.isRender) {
          handleGetGeneralInfo();
        }
        setValiateLoading(false);
      }
      setDataLoading(false);
    }
  }, [job_id, isLoggedIn]);

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
          <FormJobApplication
            waitingSubmissionStatus={
              applicantData?.applicationStatus === "waitingSubmission"
            }
            jobId={Number(job_id)}
            applicationId={Number(applicantData?.applicationId ?? 0)} // Provide a default value
          />
        </>
      </ModalContainer>

      <ModalContainer
        isOpen={currentModalId === "companyForbiddenModal"}
        onClose={handleCloseModal}
      >
        <ForbiddenCompanyAction />
      </ModalContainer>

      {/* Dynamic Meta Tags HEADING!! */}
      <Head>
        <title>
          {jobData && jobData.job_title && jobData.company
            ? `${jobData.job_title} at ${jobData.company.company_name}`
            : "Job Details"}
        </title>
        <meta
          property="og:title"
          content={
            jobData ? `${jobData.title} at ${jobData.company}` : "Job Details"
          }
        />
        <meta
          property="og:description"
          content={
            jobData
              ? `Exciting job opportunity at ${jobData.company}. Click to learn more.`
              : "Job opportunity details."
          }
        />
        <meta
          property="og:image"
          content={jobData?.image || "/default-job-image.jpg"} // Fallback to default image
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobdetail/${job_id}`}
        />
      </Head>

      <ModalContainer
        title={" Congratulations! You have successfully passed the test."}
        isOpen={currentModalId === "applyJobModalWaitingSubmission"}
        onClose={handleCloseModal}
      >
        <>
          <p className="break-words text-neutral-600">
            Before proceeding with your application, please complete the
            following information.
          </p>
          <p className={"text-sm p-2 px-4 bg-neutral-100 rounded-2xl"}>
            {" "}
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
          <FormJobApplication
            waitingSubmissionStatus={
              applicantData?.applicationStatus === "waitingSubmission"
            }
            jobId={Number(job_id)}
            applicationId={Number(applicantData?.applicationId ?? 0)} // Provide a default value
          />
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
        <GeneralInfoForm
          selection_test_active={
            jobData && jobData.selection_text_active !== null
              ? jobData.selection_text_active
              : false
          }
          job_id={jobData && jobData.job_id !== null ? jobData.job_id : 0} // Use 0 or any fallback value for job_id
          test_id={jobData?.preSelectionTestId || null} // Pass the test_id here
        />
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

      {/*BODY*/}
      <div className="overflow-hidden ">
        <Navbar pageRole={"jobhunter"} />
        {isLoggedIn && !isVerified && <VerifyBanner />}
        <main
          className={`flex flex-col gap-10 px-4 max-w-screen-xl mx-auto ${!isVerified && isLoggedIn ? "mt-0" : "mt-5"}`}
        >
          {isLoading ? (
            <div className=" h-[300px] w-full flex justify-center items-center">
              <LoadingLoader />
            </div>
          ) : (
            <>
          <JobDetailComponent
            onApplyJob={handleApplyJob}
            jobData={jobData}
            alreadyJoined={applicantData}
            validateUserLoading={validateLoading}
            job_id={String(job_id)}
            isBookmarked={isBookmarked}
            bookmarkedJobs={bookmarks.map((bookmark) => ({
              ...bookmark,
              job_id: bookmark.jobPostId,
            }))}
            onAddBookmark={handleToggleBookmark}
            onRemoveBookmark={handleToggleBookmark}
          />
          <div className="flex flex-col gap-5">
            <HeadingRelatedComponent
              heading="Related Jobs"
              paragraph="Take a look at the jobs we found that are similar to the job you currently have open"
            />
            <JobDetailSuggest
              listRelatedJob={relatedPost as any[]}
              bookmarkedJobs={bookmarks.map((bookmark) => ({
                ...bookmark,
                job_id: bookmark.jobPostId,
              }))}
              onAddBookmark={handleToggleBookmark}
              onRemoveBookmark={handleToggleBookmark}
            />
          </div>
        </main>
        <div className="mx-4 mt-20 mb-5">
          <FooterComponent pageRole={"jobhunter"} />
        </div>
      </div>
    </>
  );
}

export default JobDetail;
