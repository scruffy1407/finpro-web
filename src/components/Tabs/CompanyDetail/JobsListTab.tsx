import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { TabsContentProps } from "@/models/page.model";
import JobPostComponent from "@/components/JobPostComponent";
import EmptyResultState from "@/components/EmptyResultState";
import ListSkeleton from "@/components/listSkeleton";
import JobPostComponentSkeleton from "@/components/JobPostSkeleton";
import { JobPost } from "@/models/company.model";

enum JobType {
  fulltime = "Full Time",
  freelance = "Freelance",
  internship = "Internship",
}

enum JobSpace {
  remoteworking = "Remote Working",
  onoffice = "On Office",
  hybrid = "Hybrid",
}

interface jobListProps extends TabsContentProps {
  data: JobPost[] | undefined;
  isLoading: boolean;
  companyName: string;
  companyLogo: string;
  companyProvince: string;
}

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
    created_at: Date;
    company: {
      company_name: string;
      company_city: string;
      logo: string;
    };
  };
}

interface BookmarkJobListProps extends jobListProps {
  onRemoveBookmark: (wishlistId: number) => void;
  onAddBookmark: (jobPostId: number) => void;
}

function JobListTab({
  value,
  data,
  companyLogo,
  companyProvince,
  companyName,
  isLoading,
  onAddBookmark,
  onRemoveBookmark,
}: BookmarkJobListProps) {
  const getJobTypeLabel = (jobType: string): string =>
    JobType[jobType as keyof typeof JobType] || "Unknown Job Type";

  const getJobSpaceLabel = (jobSpace: string): string =>
    JobSpace[jobSpace as keyof typeof JobSpace] || "Unknown Job Space";
  return (
    <TabsContent
      className={`flex flex-col gap-4 mt-0 data-[state=active]:flex data-[state=inactive]:hidden`}
      value={value}
    >
      {isLoading ? (
        <ListSkeleton
          numberItem={6}
          ListItemComponent={JobPostComponentSkeleton}
          className={`grid lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-hidden`}
        />
      ) : (data as JobPost[]).length === 0 ? (
        <EmptyResultState
          image={"/noResult.webp"}
          title={`Sorry, there aren't any jobs available at the moment.`}
          description={`Thanks for your interest in joining our team! While we don't have any openings right now, we'll be sure to post new opportunities here. Stay tuned!`}
        />
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h2 className={"font-bold text-xl text-neutral-950"}>
              Check out what role are currently open
            </h2>
            <p className={"text-neutral-600"}>It might be your next company</p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-hidden">
            {data?.map((job: JobPost, i: number) => {
              return (
                <JobPostComponent
                  key={i}
                  job_id={job.job_id.toString()}
                  companyId={job.companyId as number}
                  job_title={job.job_title}
                  jobType={getJobTypeLabel(job.job_type)}
                  company_province={companyProvince}
                  companyName={companyName}
                  created_at={String(job.created_at)}
                  salaryMin={job.salary_min}
                  salaryMax={job.salary_max}
                  jobSpace={getJobSpaceLabel(job.job_space)}
                  experienceMax={job.job_experience_max}
                  experienceMin={job.job_experience_min}
                  salaryShow={job.salary_show}
                  logo={companyLogo}
                  isBookmarked={job.isBookmarked}
                  onAddBookmark={() => onAddBookmark(job.job_id)}
                  onRemoveBookmark={() => onRemoveBookmark(job.job_id)}
                />
              );
            })}
          </div>
        </>
      )}
    </TabsContent>
  );
}

export default JobListTab;
