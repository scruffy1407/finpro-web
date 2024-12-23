import React, { useEffect, useState } from "react";
import JobPostComponent from "./JobPostComponent";
import { JobPostProps } from "@/utils/interface";
import { getJobNewLp } from "@/pages/api/api";
import ListSkeleton from "@/components/listSkeleton";
import JobPostComponentSkeleton from "@/components/JobPostSkeleton";

const JobPostSection: React.FC = () => {
  const [jobLpData, SetjobLpData] = useState<JobPostProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getJobNewLp();
        console.log(response); // Make sure you inspect the data

        // Assuming response is an array of job posts:
        const mappedData = response.map((job: any) => ({
          job_id: job.job_id,
          job_title: job.job_title,
          companyName: job.company.company_name || "Unknown", // Use fallback if not available
          company_city: job.company.company_city || "Unnnuown",
          logo: job.logo || "/burger.svg", // Use fallback image
          jobType: job.job_type ? [job.job_type] : [], // Handle jobType if missing
          jobSpace: job.job_space,
          created_at: job.created_at,
          salaryMin: parseInt(job.salary_min, 10), // Ensure salary is a number
          salaryMax: parseInt(job.salary_max, 10),
          salaryShow: job.salary_show, // If salary_show is missing, default to false
          experienceMin: parseInt(job.job_experience_min),
          experienceMax: parseInt(job.job_experience_max),
          companyId: job.company_id,
        }));

        SetjobLpData(mappedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <ListSkeleton
          className={
            "max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0"
          }
          ListItemComponent={JobPostComponentSkeleton}
          numberItem={3}
        />
      ) : (
        <div className="max-w-screen-xl mx-auto overflow-x-auto flex gap-6 justify-start sm:justify-start snap-x sm:snap-none px-4 sm:px-0">
          {/* Ensure jobLpData is not empty or undefined before rendering */}
          {jobLpData && jobLpData.length > 0 ? (
            jobLpData.map((jobPost: JobPostProps, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-[410px] snap-start bg-white rounded-xl hover:shadow-lg"
              >
                <JobPostComponent
                  logo={jobPost.logo}
                  companyName={jobPost.companyName}
                  job_title={jobPost.job_title}
                  company_province={jobPost.company_province}
                  jobType={jobPost.jobType}
                  created_at={jobPost.created_at}
                  salaryMin={jobPost.salaryMin}
                  salaryMax={jobPost.salaryMax}
                  salaryShow={jobPost.salaryShow}
                  experienceMin={jobPost.experienceMin}
                  experienceMax={jobPost.experienceMax}
                  jobSpace={jobPost.jobSpace}
                  job_id={jobPost.job_id}
                  companyId={jobPost.companyId}
                />
              </div>
            ))
          ) : (
            <div>No job listings available</div> // Fallback message if no jobs
          )}
        </div>
      )}
    </>
  );
};

export default JobPostSection;
