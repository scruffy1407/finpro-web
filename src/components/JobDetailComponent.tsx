import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonComponent from "./ButtonComponent";
import axios from "axios";
import moment from "moment";
import {
  mapJobType,
  mapJobSpace,
  mapCompanySize,
  mapCompanyIndustry,
} from "../utils/enumMapping";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShareButton } from "@/components/ShareButton";

interface JobDetailProps {
  job_id: string;
  onApplyJob: () => void;
}

export default function JobDetailComponent({
  job_id,
  onApplyJob,
}: JobDetailProps) {
  const [jobData, setJobData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleShare = (platform: string) => {
    console.log(`Shared on ${platform}`);
  };

  useEffect(() => {
    // Debug log: Ensure we see job_id when the component is rendered
    console.log("Job ID in JobDetailComponent:", job_id);

    if (!job_id) {
      console.log("Job ID is not available yet. Skipping API call.");
      return; // Skip API call if job_id is undefined
    }

    const fetchJobDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/company/jobDetails/${job_id}`,
        );
        console.log("Fetched job data:", response.data); // Log the response to see the data
        setJobData(response.data.jobPostDetail);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [job_id]); // This effect runs only when `job_id` changes
  console.log(jobData);

  const formatSalary = (salary: number) => {
    return `${(salary / 1000000).toFixed(1)} jt`; // Format to 1 decimal place
  };
  const calculateAverageRating = (reviews: any[]) => {
    // Extract the ratings for each review
    const totalReviews = reviews.length;
    console.log("INI ADALAH REVIEWS ", reviews);

    if (totalReviews === 0) return 0; // If no reviews, return 0

    const sum = reviews.reduce((acc, review) => {
      return (
        acc +
        review.career_path_rating +
        review.cultural_rating +
        review.facility_rating +
        review.work_balance_rating
      );
    }, 0);

    // Return the average rating
    return (sum / (totalReviews * 4)).toFixed(2); // 4 ratings per review
  };

  const averageRating = calculateAverageRating(jobData?.company?.review || []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!jobData) return <div>No job details found.</div>;
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-10 max-w-screen-xl p-4 md:p-8 mx-auto bg-white mt-5 rounded-xl md:flex-row">
        <div className="flex flex-col gap-6 md:gap-2 w-[100%] md:w-[60%]">
          {/* Breadcrumb */}
          <div className="text-sm text-neutral-600 gap-2 items-center hidden md:flex">
            <Link href={"/"} className="text-sm cursor-pointer hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link
              href={"/jobs"}
              className="text-sm cursor-pointer hover:underline"
            >
              Find Jobs
            </Link>
            <span>/</span>
            <Link
              href={`/company/${jobData?.companyId}`}
              className="text-sm cursor-pointer hover:underline"
            >
              {jobData?.company?.company_name}
            </Link>
            <span>/</span>
            <span className="text-sm text-neutral-600 font-semibold">
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
        <div className="flex flex-col justify-center gap-2 items-start md:items-end">
          <div className="flex gap-6">
            <div className="items-center justify-center hidden md:flex">
              <ButtonComponent type="ButtonBookmark" container="Bookmarks" />
            </div>
            <Button
              className={"w-full md:w-fit"}
              onClick={onApplyJob}
              variant={"primary"}
              size={"default"}
            >
              Apply Now
            </Button>
          </div>
          <p className="w-full text-xs text-center">
            Job expires on:{" "}
            <span className=" text-red-500">
              {jobData?.expired_date &&
                moment(jobData?.expired_date).format("MMMM Do YYYY")}
            </span>{" "}
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-10 gap-4 mt-5">
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
          jobTitle="Senior Frontend Developer"
          companyName="TechCorp Inc."
          jobUrl={window.location.href}
          onShare={handleShare}
        />
        </div>
      </div>
    </div>
  );
}
