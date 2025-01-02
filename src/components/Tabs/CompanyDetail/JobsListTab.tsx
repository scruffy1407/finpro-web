import React, { useState } from "react";
import Image from "next/image";
import { TabsContent } from "@/components/ui/tabs";
import { TabsContentProps } from "@/models/page.model";
import JobPostComponent from "@/components/JobPostComponent";
import EmptyResultState from "@/components/EmptyResultState";
import ListSkeleton from "@/components/listSkeleton";
import JobPostComponentSkeleton from "@/components/JobPostSkeleton";
import { JobPost } from "@/models/company.model";

interface jobListProps extends TabsContentProps {
  data: JobPost[] | undefined;
  isLoading: boolean;
  companyName: string;
  companyLogo: string;
  companyProvince: string;
}

function JobListTab({
  value,
  data,
  companyLogo,
  companyProvince,
  companyName,
  isLoading,
}: jobListProps) {
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
                  jobType={job.job_type}
                  company_province={companyProvince}
                  companyName={companyName}
                  created_at={new Date("11/11/2024")}
                  salaryMin={job.salary_min}
                  salaryMax={job.salary_max}
                  jobSpace={job.job_space}
                  experienceMax={job.job_experience_max}
                  experienceMin={job.job_experience_min}
                  salaryShow={job.salary_show}
                  logo={companyLogo}
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
