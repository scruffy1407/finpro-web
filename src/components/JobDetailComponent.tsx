import React, { useState } from "react";
import Image from "next/image";
import ButtonComponent from "./ButtonComponent";
import moment from "moment";
import {
  mapJobType,
  mapJobSpace,
  mapCompanySize,
  mapCompanyIndustry,
} from "../utils/enumMapping";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LoadingLoader from "@/components/LoadingLoader";
import SectionJoinApplicant from "@/components/SectionJoinApplicant";
import { ShareButton } from "@/components/ShareButton";
import { useEffect } from "react";
import { JobApplication } from "@/models/applicant.model";
import { useRouter } from "next/router";
interface JobData {
  company: {
    company_name: string;
    company_id: string;
    logo?: string;
    company_industry: string;
    company_size: string;
    review: Review[];
  };
  job_title: string;
  job_description: string;
  job_type: string;
  job_experience_min: number;
  job_experience_max?: number;
  salary_min: number;
  salary_max?: number;
  salary_show: boolean;
  expired_date: string;
  job_space: string;
  companyId: string;
}

interface Review {
  career_path_rating: number;
  cultural_rating: number;
  facility_rating: number;
  work_balance_rating: number;
}

interface Bookmark {
  job_id: number;
}

interface JobDetailProps {
  jobData: JobData;
  validateUserLoading: boolean;
  alreadyJoined: null | JobApplication;
  jobId?: number;
  onApplyJob: () => void;
  job_id: string;
  bookmarkedJobs: Bookmark[];
}

export interface JobPostComponentProps extends JobDetailProps {
  isBookmarked: boolean;
  onAddBookmark: (jobId: number) => void;
  onRemoveBookmark: (jobId: number) => void;
}

export default function JobDetailComponent({
  jobData,
  onApplyJob,
  alreadyJoined,
  validateUserLoading,
  jobId,
  isBookmarked,
  onAddBookmark,
  onRemoveBookmark,
  job_id,
}: JobPostComponentProps) {
  const router = useRouter();
  const { pendingState } = useSelector((state: RootState) => state.generalInfo);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  // const handleShare = (platform: string) => {};
  const handleShare = () => {};

  const formatSalary = (salary: number) => {
    return `${(salary / 1000000).toFixed(1)} jt`;
  };

  const calculateAverageRating = (reviews: Review[]) => {
    const totalReviews = reviews.length;

    if (totalReviews === 0) return 0;
    const sum = reviews.reduce((acc, review) => {
      return (
        acc +
        review.career_path_rating +
        review.cultural_rating +
        review.facility_rating +
        review.work_balance_rating
      );
    }, 0);
    return (sum / (totalReviews * 4)).toFixed(2);
  };

  const averageRating = calculateAverageRating(jobData?.company?.review || []);

  useEffect(() => {
    if (alreadyJoined && alreadyJoined.completionStatus === "failed") {
      const endDate = moment(alreadyJoined.endDate);
      const rejoinDate = endDate.add(7, "days");
      const now = moment();
      const duration = moment.duration(rejoinDate.diff(now));
      if (duration.asSeconds() > 0) {
        const days = Math.floor(duration.asDays());
        const hours = Math.floor(duration.asHours() % 24);
        const minutes = Math.floor(duration.asMinutes() % 60);

        setRemainingTime(`${days} days, ${hours} hours, ${minutes} minutes`);
      } else {
        setRemainingTime(null);
      }
    } else {
      setRemainingTime(null);
    }
  }, [alreadyJoined]);

  return (
    <section>
      <div className="flex flex-col justify-between gap-10 p-4 md:p-8 bg-white rounded-xl md:flex-row">
        <div className="flex flex-col gap-6 md:gap-2 w-[100%] md:w-[60%]">
          {/* Breadcrumb */}
          <div className="text-sm text-neutral-600 gap-2 items-center hidden md:flex">
            <Link href={"/"} className="text-xs cursor-pointer hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link
              href={"/jobs"}
              className="text-xs cursor-pointer hover:underline"
            >
              Find Jobs
            </Link>
            <span>/</span>
            <Link
              href={`/company/${jobData?.companyId}`}
              className="text-xs cursor-pointer hover:underline"
            >
              {jobData?.company?.company_name}
            </Link>
            <span>/</span>
            <span className="text-xs text-neutral-600 font-semibold">
              {jobData?.job_title}
            </span>
          </div>
          {/* Company Info */}
          <div className="flex gap-2 mt-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={jobData?.company?.logo || "/company.logo"} // Use company logo if available
                alt="company Logo"
                width={30}
                height={30}
                className={"w-6 h-6"}
              />
              <p className="text-neutral-600">
                {jobData?.company?.company_name}
              </p>
            </div>
            <div className="flex justify-center items-center md:hidden">
              <ButtonComponent type="ButtonBookmark" container="Bookmarks" />
            </div>
          </div>
          <h2 className="font-bold text-2xl">{jobData?.job_title}</h2>
        </div>
        {/* Right Section */}
        {alreadyJoined ? (
          alreadyJoined.completionStatus === "failed" &&
          alreadyJoined.applicationStatus === "rejected" ? (
            remainingTime ? (
              <div className="flex items-center justify-end rounded-xl p-4 ">
                <p className="text-red-500">
                  You&apos;ve Failed the Previous Test. Please wait until{" "}
                  <strong>{remainingTime}</strong> to rejoin.
                </p>
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-2 items-start md:items-end">
                <div className="flex gap-6">
                  <div className="items-center justify-center hidden md:flex">
                    <ButtonComponent
                      type="ButtonBookmark"
                      container="Bookmarks"
                    />
                  </div>
                  {validateUserLoading ? (
                    <div
                      className={
                        "h-10 w-48 bg-gray-200 animate-pulse rounded-2xl"
                      }
                    ></div>
                  ) : (
                    <Button
                      disabled={pendingState.actionDisableLocation}
                      className={"w-full md:w-fit"}
                      onClick={onApplyJob}
                      variant={"primary"}
                      size={"default"}
                    >
                      {pendingState.actionLoadingLocation
                        ? LoadingLoader()
                        : "Apply Now"}
                    </Button>
                  )}
                </div>
                <p className="w-full text-xs text-center">
                  Job expires on:{" "}
                  <span className=" text-red-500">
                    {jobData?.expired_date &&
                      moment(jobData?.expired_date).format("MMMM Do YYYY")}
                  </span>
                </p>
              </div>
            )
          ) : (
            ""
          )
        ) : (
          <div className="flex flex-col justify-center gap-2 items-start md:items-end">
            <div className="flex gap-6">
              <div className="items-center justify-center hidden md:flex">
                <ButtonComponent
                  type="ButtonBookmark"
                  isBookmarked={isBookmarked}
                  onClickBookmark={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (isBookmarked) {
                      onRemoveBookmark(Number(job_id));
                    } else {
                      onAddBookmark(Number(job_id));
                    }
                  }}
                />{" "}
              </div>
              {validateUserLoading ? (
                <div
                  className={"h-10 w-48 bg-gray-200 animate-pulse rounded-2xl"}
                ></div>
              ) : (
                <Button
                  disabled={pendingState.actionDisableLocation}
                  className={"w-full md:w-fit"}
                  onClick={onApplyJob}
                  variant={"primary"}
                  size={"default"}
                >
                  {pendingState.actionLoadingLocation
                    ? LoadingLoader()
                    : "Apply Now"}
                </Button>
              )}
            </div>
            <p className="w-full text-xs text-center">
              Job expires on:{" "}
              <span className=" text-red-500">
                {jobData?.expired_date &&
                  moment(jobData?.expired_date).format("MMMM Do YYYY")}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <div className="grid md:grid-cols-10 gap-4 mt-5">
        {/* Left Section: Job Overview & Description */}
        <div className="sm:col-span-7">
          {/* Job Overview */}
          <div className="bg-white rounded-xl px-4 md:px-8 py-8 mb-4">
            {/* Title */}
            <h3 className="font-bold text-lg mb-6">Job Overview</h3>

            {/* Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-2">
              {/* Job Type */}
              <div className="flex items-center md:flex-col md:items-start">
                <Image
                  src="/jobAsset/Briefcase.svg"
                  alt="Job Type Icon"
                  width={32}
                  height={32}
                  className="w-6 h-6 mb-0 md:mb-2 md:mr-0 mr-4"
                />
                <div>
                  <p className="text-neutral-400 text-sm mb-1 hidden md:block">
                    Job Type
                  </p>
                  <p className="font-bold text-sm text-neutral-900">
                    {mapJobType(jobData?.job_type)}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center md:flex-col md:items-start">
                <Image
                  src="/jobAsset/Notebook.svg"
                  alt="Experience Icon"
                  width={32}
                  height={32}
                  className="w-6 h-6 mb-0 md:mb-2 md:mr-0 mr-4"
                />
                <div>
                  <p className="text-neutral-400 text-sm mb-1 hidden md:block">
                    Experience
                  </p>
                  <p className="font-bold text-sm text-neutral-900">
                    {jobData?.job_experience_max
                      ? `${jobData?.job_experience_min} - ${jobData?.job_experience_max} yrs Experience`
                      : `Min ${jobData?.job_experience_min} yrs Experience`}
                  </p>
                </div>
              </div>

              {/* Salary */}
              <div className="flex items-center md:flex-col md:items-start">
                <Image
                  src="/jobAsset/Wallet.svg"
                  alt="Salary Icon"
                  width={32}
                  height={32}
                  className="w-6 h-6 mb-0 md:mb-2 md:mr-0 mr-4"
                />
                <div>
                  <p className="text-neutral-400 text-sm mb-1 hidden md:block">
                    Salary
                  </p>
                  <p className="font-bold text-sm text-neutral-900">
                    {jobData?.salary_show ? (
                      jobData?.salary_max ? (
                        `Rp${formatSalary(jobData?.salary_min)} - Rp${formatSalary(jobData?.salary_max)}`
                      ) : (
                        `Minimum Salary Rp${formatSalary(jobData?.salary_min)}`
                      )
                    ) : (
                      <span className="text-neutral-600">
                        Salary not disclosed
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Work Location */}
              <div className="flex items-center md:flex-col md:items-start">
                <Image
                  src="/jobAsset/MapPin.svg"
                  alt="Work Location Icon"
                  width={32}
                  height={32}
                  className="w-6 h-6 mb-0 md:mb-2 md:mr-0 mr-4"
                />
                <div>
                  <p className="text-neutral-400 text-sm mb-1 hidden md:block">
                    Work Location
                  </p>
                  <p className="font-bold text-sm text-neutral-900">
                    {mapJobSpace(jobData?.job_space)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Responsibilities */}
          <div className="bg-white rounded-xl px-4 md:px-8 py-8">
            <div
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: jobData?.job_description }}
            />
          </div>
        </div>

        {/* Right Section: Company Information */}
        <section
          className={"md:h-fit md:col-span-3 sm:col-span-7 flex flex-col gap-6"}
        >
          {isLoggedIn &&
          alreadyJoined &&
          alreadyJoined.completionStatus !== "failed" &&
          alreadyJoined.applicationStatus !== "rejected" ? (
            <SectionJoinApplicant
              applicationId={alreadyJoined.applicationId}
              applicationStatus={alreadyJoined.applicationStatus}
              createdAt={alreadyJoined.createdAt}
              jobHunterId={alreadyJoined.jobHunterId}
              resume={alreadyJoined.resume}
              jobId={jobId}
            />
          ) : (
            ""
          )}

          <div className="md:h-fit md:col-span-3 sm:col-span-7 text-neutral-900 bg-white rounded-xl px-4 md:px-8 py-6 flex flex-col gap-6 justify-between">
            <h2 className="font-bold text-lg">Company Information</h2>
            <div className="flex flex-col gap-3">
              <Image
                src={jobData?.company?.logo || "/companies/Tokopedia.svg"}
                alt="Company Logo"
                width={100}
                height={100}
                className="w-14 h-14 object-cover"
              />
              <div className={"flex flex-col gap-1"}>
                <h2 className="text font-bold">
                  {jobData?.company?.company_name}
                </h2>
                <h3 className="text-sm text-neutral-600">
                  {mapCompanyIndustry(jobData?.company?.company_industry)}
                </h3>
              </div>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-yellow-400 mr-2"
              >
                <path d="M12 .587l3.668 7.431 8.215 1.179-5.918 5.775 1.395 8.128L12 18.896l-7.36 3.883 1.395-8.128L.117 9.197l8.215-1.179L12 .587z" />
              </svg>
              <h3 className="text-md font-medium">
                {averageRating}{" "}
                <span className="text-neutral-600 underline">
                  {jobData?.company?.review?.length} Reviews
                </span>
              </h3>
            </div>

            <p className="text-sm text-neutral-600 flex gap-2">
              <span>Company Size:</span>
              <span className="text-neutral-900 text-right">
                {mapCompanySize(jobData?.company?.company_size)}
              </span>
            </p>
            <ShareButton
              jobTitle={jobData?.job_title || "Job Title"}
              companyName={jobData?.company?.company_name || "Company Name"}
              jobUrl={router.pathname}
              onShare={handleShare}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
