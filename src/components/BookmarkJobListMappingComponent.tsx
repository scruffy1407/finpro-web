import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import JobPostComponent from "./JobPostComponent";

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
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer); 
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
          src="/NoBookmark.svg"
          alt="No bookmarks available"
          width={300}
          height={200}
        />
      </div>
    );
  }

  const mappedData = jobPosts.map((job) => ({
    wishlist_id: job.wishlist_id,
    job_id: job.jobPost.job_id,
    job_title: job.jobPost.job_title,
    companyName: job.jobPost.company.company_name || "Unknown",
    company_city: job.jobPost.company.company_city || "Unknown",
    logo: job.jobPost.company.logo || "/burger.svg",
    jobType: job.jobPost.job_type || "Unknown",
    jobSpace: job.jobPost.job_space,
    created_at: job.jobPost.created_at,
    timeAgo: formatDistanceToNow(new Date(job.jobPost.created_at), {
      addSuffix: true,
    }),
    companyId: job.jobPost.job_id,
    salaryMin: parseInt(job.jobPost.salary_min, 10),
    salaryMax: parseInt(job.jobPost.salary_max, 10),
    salaryShow: job.jobPost.salary_show,
    experienceMin: parseInt(job.jobPost.job_experience_min, 10),
    experienceMax: parseInt(job.jobPost.job_experience_max, 10),
  }));

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:grid-cols-2">
      {mappedData.map((job) => {
        const isBookmarked = !!job.wishlist_id;
        return (
          <JobPostComponent
            key={job.job_id}
            logo={job.logo}
            job_title={job.job_title}
            companyName={job.companyName}
            isBookmarked={isBookmarked}
            onAddBookmark={() => onAddBookmark(job.job_id)}
            onRemoveBookmark={() => onRemoveBookmark(job.wishlist_id)}
            company_province={job.company_city}
            jobType={job.jobType}
            jobSpace={job.jobSpace}
            created_at={job.created_at}
            salaryMin={job.salaryMin}
            salaryMax={job.salaryMax}
            experienceMin={job.experienceMin}
            experienceMax={job.experienceMax}
            salaryShow={job.salaryShow}
            job_id={String(job.job_id)}
            companyId={job.companyId}
          />
        );
      })}
      </div>
    </div>
  );
};

export default BookmarkJobListMappingComponent;
