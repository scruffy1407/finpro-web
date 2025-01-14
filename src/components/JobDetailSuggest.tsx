import React from "react";
import JobPostComponent from "./JobPostComponent";
import { JobListingSuggest } from "@/utils/interface";
import { mapJobType, mapJobSpace } from "../utils/enumMapping";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Bookmark {
  job_id: number;
}

interface JobDetailSuggestProps {
  listRelatedJob: JobListingSuggest[];
  bookmarkedJobs: Bookmark[];
  onAddBookmark: (jobId: number) => void;
  onRemoveBookmark: (jobId: number) => void;
}

export interface JobBookmark {
  wishlist_id: number;
  jobPost: {
    job_id: number;
    job_title: string;
    salary_min: number;
    salary_max: number;
    job_type: string;
    job_space: string;
    job_experience_min: number;
    job_experience_max: number;
    salary_show: boolean;
    created_at: string;
    company: {
      company_name: string;
      company_city: string;
      logo: string;
    };
  };
}

export interface JobPostComponentProps extends JobDetailSuggestProps {
  isBookmarked: boolean;
  onAddBookmark: (jobId: number) => void;
  onRemoveBookmark: (jobId: number) => void;
}

const JobDetailSuggest: React.FC<JobDetailSuggestProps> = ({
  listRelatedJob,
  onAddBookmark,
  onRemoveBookmark,
}) => {
  const { bookmarks } = useSelector((state: RootState) => state.bookmarks);
  return (
    <div className="overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0">
      {listRelatedJob?.map((jobPost: JobListingSuggest, index: number) => {
        const isBookmarked = bookmarks.some(
          (bookmark) => bookmark.jobPostId === Number(jobPost.job_id)
        );

        const salaryMax = isNaN(parseInt(jobPost.salary_max))
          ? null
          : parseInt(jobPost.salary_max);

        return (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
          >
            <JobPostComponent
              companyId={jobPost.companyId}
              logo={jobPost.company.logo || "/default-logo-url"}
              companyName={jobPost.company.company_name}
              job_title={jobPost.job_title}
              company_province={
                jobPost.company.company_city || "Undisclosed Location"
              }
              jobType={mapJobType(jobPost.job_type)}
              created_at={new Date(jobPost.created_at).toISOString()}
              salaryMin={parseInt(jobPost.salary_min)}
              salaryMax={salaryMax}
              salaryShow={jobPost.salary_show}
              experienceMin={jobPost.job_experience_min}
              experienceMax={jobPost.job_experience_max}
              jobSpace={mapJobSpace(jobPost.job_space)}
              job_id={String(jobPost.job_id)}
              isBookmarked={isBookmarked}
              onAddBookmark={() => onAddBookmark(jobPost.job_id)}
              onRemoveBookmark={() => onRemoveBookmark(jobPost.job_id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default JobDetailSuggest;
