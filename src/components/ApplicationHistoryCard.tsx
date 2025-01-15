import React from "react";
import { JobApplicationStatus } from "@/models/applicant.model";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatNumber } from "@/utils/formater.utils";

export interface ApplicationHistoryCardProps {
  applicationId: string;
  jobTitle: string;
  applyDate: string;
  status: string;
  jobType: string;
  jobSpace: string;
  expectedSalary: number;
  resumeLink: string;
}

function ApplicationHistoryCard({
  jobTitle,
  jobType,
  status,
  applyDate,
  jobSpace,
  resumeLink,
  expectedSalary,
}: ApplicationHistoryCardProps) {
  const renderStatus = (status: string) => {
    switch (status) {
      case JobApplicationStatus.OnReview:
        return (
          <div
            className={
              "px-3 py-1 bg-zinc-100 h-fit text-neutral-950 font-bold rounded-2xl text-sm w-fit"
            }
          >
            On Review
          </div>
        );
      case JobApplicationStatus.Interview:
        return (
          <div
            className={
              "px-3 py-1 bg-orange-100 h-fit text-neutral-950 font-bold rounded-2xl text-sm w-fit"
            }
          >
            Process Interview
          </div>
        );
      case JobApplicationStatus.Accepted:
        return (
          <div
            className={
              "px-3 py-1 bg-green-100 h-fit text-neutral-950 font-bold rounded-2xl text-sm w-fit"
            }
          >
            Accepted
          </div>
        );
    }
  };
  return (
    <div className={"rounded-2xl p-5 bg-white w-full flex flex-col gap-6"}>
      <div
        className={
          "flex flex-col-reverse gap-3 md:flex-row md:justify-between md:items-center"
        }
      >
        <div className={"flex flex-col gap-2"}>
          <h3 className={"text-lg text-neutral-950 font-bold"}>{jobTitle}</h3>
          <p className={"text-xs text-neutral-600"}>Apply At {applyDate}</p>
        </div>
        {renderStatus(status)}
      </div>
      <div className={"flex gap-2 items-center"}>
        <p className={"text-xs text-neutral-600"}>{jobType}</p>
        <div className={"h-[10px] w-[1px] bg-zinc-300"}></div>
        <p className={"text-xs text-neutral-600"}>{jobSpace}</p>
        <div className={"h-[10px] w-[1px] bg-zinc-300"}></div>
        <Popover>
          <PopoverTrigger className={"text-xs underline"}>
            View Application Data
          </PopoverTrigger>
          <PopoverContent className={"rounded-2xl min-w-[335px] mr-4 md:mr-0"}>
            <div className={"flex flex-col gap-3"}>
              <div className={"flex flex-col gap-1"}>
                <h5 className={"text-sm font-bold"}>Application Information</h5>
                <p className={"text-xs text-neutral-400"}>
                  Information below is enter when you apply this job
                </p>
              </div>

              <div className={"grid grid-cols-2"}>
                <p className={"text-sm text-neutral-600"}>Expected Salary</p>
                <p className={"text-sm text-neutral-600"}>
                  Rp {formatNumber(expectedSalary)}
                </p>
              </div>
              <div className={"grid grid-cols-2 gap-3"}>
                <p className={"text-sm text-neutral-600"}>Uploaded Resume</p>
                <a
                  href={resumeLink}
                  className={"text-sm underline text-blue-500 cursor-pointer"}
                >
                  View Resume
                </a>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default ApplicationHistoryCard;
