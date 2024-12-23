import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "./ButtonComponent";
import { formatDistanceToNow } from "date-fns";

export interface JobBookmark {
  wishlist_id: number;
  jobPost: {
    job_id: number;
    job_title: string;
    salary_min: string;
    salary_max: string;
    job_type: string;
    job_space: string;
    job_experience_min: string;
    job_experience_max: string;
    salary_show: boolean;
    created_at: string;
    company: {
      company_name: string;
      company_city: string;
      logo: string;
    };
  };
}

interface BookmarkJobListMappingComponentProps {
  jobPosts: JobBookmark[];
  onRemoveBookmark: (wishlistId: number) => void;
  onAddBookmark: (jobPostId: number) => void;
}

const BookmarkJobListMappingComponent: React.FC<
  BookmarkJobListMappingComponentProps
> = ({ jobPosts, onRemoveBookmark, onAddBookmark }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay for demonstration purposes
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer); // Cleanup the timer
  }, [jobPosts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-neutral-500">Loading...</p>
      </div>
    );
  }

  if (!Array.isArray(jobPosts) || jobPosts.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/NoJobs.svg"
          alt="No jobs available"
          width={300}
          height={200}
        />
      </div>
    );
  }

  const formatSalary = (salary: number) => {
    return `${(salary / 1000000).toFixed(1)} jt`;
  };

  const mappedData = jobPosts.map((job) => ({
    wishlist_id: job.wishlist_id,
    job_id: job.jobPost.job_id,
    job_title: job.jobPost.job_title,
    companyName: job.jobPost.company.company_name || "Unknown",
    company_city: job.jobPost.company.company_city || "Unknown",
    logo: job.jobPost.company.logo || "/burger.svg",
    jobType: job.jobPost.job_type ? [job.jobPost.job_type] : [],
    jobSpace: job.jobPost.job_space,
    created_at: job.jobPost.created_at,
    timeAgo: formatDistanceToNow(new Date(job.jobPost.created_at), {
      addSuffix: true,
    }),
    salaryMin: parseInt(job.jobPost.salary_min, 10),
    salaryMax: parseInt(job.jobPost.salary_max, 10),
    salaryShow: job.jobPost.salary_show,
    experienceMin: parseInt(job.jobPost.job_experience_min, 10),
    experienceMax: parseInt(job.jobPost.job_experience_max, 10),
  }));

  return (
    <div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0 md:overflow-hidden md:flex flex-wrap">
      {mappedData.map((job) => {
        const isBookmarked = !!job.wishlist_id;

        return (
          <Link href={`/jobdetail/${job.job_id}`} key={job.wishlist_id}>
            <div
              key={job.wishlist_id}
              className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
            >
              <div className="p-4 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={job.logo}
                        alt="Company Logo"
                        width={50}
                        height={50}
                      />
                      <p className="text-sm underline text-neutral-400 cursor-pointer">
                        {job.companyName}
                      </p>
                    </div>
                    <ButtonComponent
                      type="ButtonBookmark"
                      isBookmarked={isBookmarked}
                      onClickBookmark={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (isBookmarked) {
                          onRemoveBookmark(job.wishlist_id);
                        } else {
                          onAddBookmark(job.job_id);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl">{job.job_title}</h2>
                    <p className="text-base text-neutral-600">
                      {job.company_city}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <div className="w-fit rounded-xl px-2 py-1 bg-neutral-100">
                      {job.jobType}
                    </div>
                    <div className=" w-fit  rounded-xl px-2 py-1 bg-neutral-100">
                      {job.jobSpace}
                    </div>
                    <div className="w-fit rounded-xl px-2 py-1 bg-neutral-100">
                      <p>
                        {job.experienceMax
                          ? `${job.experienceMin} - ${job.experienceMax} yrs Experience`
                          : `Min ${job.experienceMin} yrs Experience`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-gray-200 w-full"></div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-neutral-400">{job.timeAgo}</p>
                  <p className="text-sky-600 font-semibold">
                    Rp{formatSalary(job.salaryMin)} - Rp
                    {formatSalary(job.salaryMax)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BookmarkJobListMappingComponent;
