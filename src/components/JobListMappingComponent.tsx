import React from "react";
import JobPostComponent from "./JobPostComponent";
import { JobPostPropsReal } from "@/utils/interface";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Bookmark {
  job_id: number;
}

interface JobListMappingComponentProps {
  jobPosts: JobPostPropsReal[];
  bookmarkedJobs: Bookmark[];
  onRemoveBookmark: (wishlistId: number) => void;
  onAddBookmark: (jobPostId: number) => void;
}

const JobListMappingComponent: React.FC<JobListMappingComponentProps> = ({
  jobPosts,
  onAddBookmark,
  onRemoveBookmark,
}) => {
  const { bookmarks } = useSelector((state: RootState) => state.bookmarks);
  if (jobPosts.length === 0) {
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
  } else {
    return (
      <div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0 md:overflow-hidden md:flex flex-wrap">
        {jobPosts.map((jobListPostReal: JobPostPropsReal) => {
          const isBookmarked = bookmarks.some(
            (bookmark) => bookmark.jobPostId === Number(jobListPostReal.job_id)
          );
          return (
            <div
              key={jobListPostReal.job_id}
              className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
            >
              <JobPostComponent
                companyId={jobListPostReal.companyId}
                job_id={String(jobListPostReal.job_id)}
                isBookmarked={isBookmarked}
                onAddBookmark={onAddBookmark}
                onRemoveBookmark={onRemoveBookmark}
                logo={jobListPostReal.company.logo || "/burger.svg"}
                companyName={
                  jobListPostReal.company.company_name || "something Wrong"
                }
                job_title={jobListPostReal.job_title}
                company_province={
                  jobListPostReal.company.company_city || "something Wrong"
                }
                created_at={jobListPostReal.created_at}
                salaryMin={jobListPostReal.salary_min}
                salaryMax={jobListPostReal.salary_max}
                salaryShow={jobListPostReal.salary_show}
                jobType={jobListPostReal.job_type}
                jobSpace={jobListPostReal.job_space}
                experienceMin={jobListPostReal.job_experience_min}
                experienceMax={jobListPostReal.job_experience_max}
              />
            </div>
          );
        })}
      </div>
    );
  }
};

export default JobListMappingComponent;
