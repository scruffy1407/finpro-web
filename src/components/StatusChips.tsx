import { JobApplicationStatus } from "@/models/applicant.model";
import React from "react";

interface StatusChipProps {
  applicationStatus: JobApplicationStatus;
}

const ChipStatus = ({ applicationStatus }: StatusChipProps) => {
  switch (applicationStatus) {
    case JobApplicationStatus.OnReview:
      return (
        <div
          className={
            "flex text-sm justify-center items-center px-3 py-1 text-neutral-950 bg-gray-200 font-bold rounded-full "
          }
        >
          On Review
        </div>
      );
    case JobApplicationStatus.Accepted:
      return (
        <div
          className={
            "flex text-sm justify-center items-center px-3 py-1 text-white bg-emerald-500 font-bold rounded-full "
          }
        >
          Accepted
        </div>
      );
    case JobApplicationStatus.Interview:
      return (
        <div
          className={
            "flex text-sm justify-center items-center px-3 py-1 text-white bg-emerald-500 font-bold rounded-full "
          }
        >
          Interview Scheduled
        </div>
      );
    case JobApplicationStatus.Rejected:
      return (
        <div
          className={
            "flex text-sm justify-center items-center px-3 py-1 text-white bg-rose-400 font-bold rounded-full "
          }
        >
          Rejected
        </div>
      );
    case JobApplicationStatus.OnTest:
      return (
        <div
          className={
            "flex text-sm justify-center items-center px-3 py-1 text-neutral-950 bg-yellow-400 font-bold rounded-full "
          }
        >
          On Test
        </div>
      );
    case JobApplicationStatus.WaitingSubmission:
      return (
        <div
          className={
            "flex text-sm justify-center items-center px-3 py-1 text-white bg-rose-400 font-bold rounded-full "
          }
        >
          Waiting Submission
        </div>
      );
    case JobApplicationStatus.Failed:
      return "Failed";
    default:
      return applicationStatus;
  }
};

export default ChipStatus;
