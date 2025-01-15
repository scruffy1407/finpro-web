import React from "react";
import { JobApplication, JobApplicationStatus } from "@/models/applicant.model";
import { Button } from "@/components/ui/button";
import ChipStatus from "@/components/StatusChips";
import { format } from "date-fns";
import Link from "next/link";
import { openModalAction } from "@/store/slices/ModalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useRouter } from "next/router";

function SectionJoinApplicant({
  applicationId,
  applicationStatus,
  createdAt,
  jobId,
}: JobApplication) {
  const dispatch = useDispatch<AppDispatch>();

  const createdDate = new Date(createdAt);
  const formattedDate = format(createdDate, "EEE, d MMM yyyy");
  const router = useRouter();

  const displayText = () => {
    switch (applicationStatus) {
      case JobApplicationStatus.OnReview:
        return (
          <p
            className={
              "text-sm text-neutral-600 text-center p-4 bg-white rounded-2xl"
            }
          >
            Your application is currently under review by the company. We will
            notify you via email of any updates on your application.
          </p>
        );
      case JobApplicationStatus.Accepted:
        return (
          <div className={`p-4 bg-white rounded-2xl`}>
            <h5 className={"font-semibold mb-2"}>
              <span className={"font-bold text-green-500"}>
                Congratulations!
              </span>{" "}
              Your application has been accepted.{" "}
            </h5>
            <p className={"text-sm text-neutral-600 "}>
              Please await an email invitation for your interview. We will
              notify you as soon as the interview schedule is confirmed by the
              company.
            </p>
          </div>
        );
      case JobApplicationStatus.Rejected:
        return (
          <p
            className={
              "text-sm text-neutral-600 text-center p-4 bg-white rounded-2xl"
            }
          >
            {`Your application is rejected by the company, don't worry let's
            explore other jobs`}
            <Link
              href={"/jobs"}
              className={"underline cursor-pointer text-blue-500"}
            >
              here
            </Link>
          </p>
        );
      case JobApplicationStatus.OnTest:
        return (
          <>
            <p
              className={
                "text-sm text-neutral-600 text-center p-4 bg-white rounded-2xl"
              }
            >
              You still have test that need to be complete
            </p>
            <Button
              onClick={() =>
                // dispatch(openModalAction("applyJobModalWaitingSubmission"))
                router.push(
                  `/executionPretestQuiz/${jobId}?applicationId=${applicationId}`,
                )
              }
              variant={"primary"}
              size={"default"}
            >
              Continue Test
            </Button>
          </>
        );
      default:
        return "";
    }
  };

  return (
    <div className={"flex flex-col gap-8 p-8 bg-blue-950 rounded-2xl "}>
      <h3 className={"text-xl font-bold text-white"}>
        Your Applicant Progress
      </h3>
      <div className={"flex flex-col gap-5"}>
        <div className={"flex justify-between"}>
          <p className={"text-sm min-w-28 text-white opacity-80"}>Apply At</p>
          <p className={"text-sm text-white font-bold"}>{formattedDate}</p>
        </div>

        <div className={"flex justify-between items-center"}>
          <p className={"text-sm min-w-28 text-white opacity-80"}>Status</p>
          <ChipStatus applicationStatus={applicationStatus} />
        </div>
      </div>
      {JobApplicationStatus.WaitingSubmission === applicationStatus ? (
        <Button
          onClick={() =>
            dispatch(openModalAction("applyJobModalWaitingSubmission"))
          }
          variant={"primary"}
          size={"default"}
        >
          Complete Submission
        </Button>
      ) : (
        ""
      )}
      {displayText()}
    </div>
  );
}

export default SectionJoinApplicant;
