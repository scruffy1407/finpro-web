import React from "react";
import JobPostComponent from "./JobPostComponent";
import { JobPostPropsReal } from "@/utils/interface";

import Image from "next/image";

interface JobListMappingComponentProps {
  jobPosts: JobPostPropsReal[]; // Define prop for job posts
}

const JobListMappingComponent: React.FC<JobListMappingComponentProps> = ({
  jobPosts,
}) => {
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
      <div className="max-w-screen-xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Map through the paginated data and render JobPostComponent for each job */}
        {jobPosts.map((jobListPostReal: JobPostPropsReal, index: number) => (
          <JobPostComponent
            key={index}
            companyId={jobListPostReal.companyId}
            job_id={String(jobListPostReal.job_id)}
            logo={jobListPostReal.company.logo || "/burger.svg"}
            companyName={
              jobListPostReal.company.company_name || "something Wrong"
            }
            job_title={jobListPostReal.job_title}
            company_province={
              jobListPostReal.company.company_city || "something Wrong"
            }
            created_at={new Date(jobListPostReal.created_at)}
            salaryMin={jobListPostReal.salary_min}
            salaryMax={jobListPostReal.salary_max}
            salaryShow={jobListPostReal.salary_show}
            jobType={jobListPostReal.job_type}
            jobSpace={jobListPostReal.job_space}
            experienceMin={jobListPostReal.job_experience_min}
            experienceMax={jobListPostReal.job_experience_max}
          />
        ))}
      </div>
    );
  }
};

export default JobListMappingComponent;
