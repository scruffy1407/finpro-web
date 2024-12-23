import React from "react";
import JobPostComponent from "./JobPostComponent";

import { JobListingSuggest } from "@/utils/interface";

import { mapJobType, mapJobSpace } from "../utils/enumMapping";

interface JobDetailSuggestProps {
  listRelatedJob: [];
}

const JobDetailSuggest: React.FC<JobDetailSuggestProps> = ({
  listRelatedJob,
}) => {
  return (
    <div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0">
      {listRelatedJob
        ? listRelatedJob.map((jobPost: JobListingSuggest, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
            >
              <JobPostComponent
                companyId={jobPost.companyId}
                logo={jobPost.company.logo || "/default-logo-url"} // Fallback for null logo
                companyName={jobPost.company.company_name}
                job_title={jobPost.job_title}
                company_province={jobPost.company.company_city}
                jobType={mapJobType(jobPost.job_type)}
                created_at={new Date(jobPost.created_at)} // Ensure it's a Date object
                salaryMin={parseInt(jobPost.salary_min)} // Convert to number
                salaryMax={parseInt(jobPost.salary_max)} // Convert to number
                salaryShow={jobPost.salary_show}
                experienceMin={jobPost.job_experience_min}
                experienceMax={jobPost.job_experience_max}
                jobSpace={mapJobSpace(jobPost.job_space)}
                job_id={String(jobPost.job_id)}
              />
            </div>
          ))
        : ""}
    </div>
  );
};

export default JobDetailSuggest;
