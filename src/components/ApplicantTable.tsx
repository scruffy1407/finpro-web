import React from "react";
import { Applicant, JobStatus } from "@/models/applicant.model";
import LoadingLoader from "@/components/LoadingLoader";
import { Button } from "@/components/ui/button";
import ModalContainer from "@/components/Modal/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import FormSetNewInterview from "@/components/Form/FormSetNewInterview";
import FormEditInterview from "@/components/Form/FormEditInterview";
import { format } from "date-fns";
import { handleStatusChange } from "@/store/slices/applicantSlice";
import Cookies from "js-cookie";
import ProfileDetail from "@/components/Modal/ProfileDetail";

interface ApplicantTableProps {
  applicants: Applicant[];
  isLoading: boolean;
}

export const ApplicantTable: React.FC<ApplicantTableProps> = ({
  applicants,
  isLoading = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { currentModalId, editId } = useSelector(
    (state: RootState) => state.modalController,
  );
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  const renderStatusSelection = (applicantStatus: string) => {
    if (applicantStatus === "onreview") {
      return (
        <>
          <option value="onreview">On Review</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </>
      );
    } else if (applicantStatus === "interview") {
      return (
        <>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </>
      );
    } else if (applicantStatus === "accepted") {
      return (
        <>
          <option value="accepted">Accepted</option>
        </>
      );
    } else if (applicantStatus === "rejected") {
      return (
        <>
          <option value="rejected">Rejected</option>
        </>
      );
    } else if (applicantStatus === "onTest") {
      return (
        <>
          <option value="onTest">On Test</option>
        </>
      );
    } else if (applicantStatus === "waitingSubmission") {
      return (
        <>
          <option value="waitingSubmission">Waiting Submission</option>
        </>
      );
    } else if (applicantStatus === "failed") {
      return (
        <>
          <option value="failed">Failed</option>
        </>
      );
    } else {
      return (
        <>
          <option value="error">Please refresh</option>
        </>
      );
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Apply Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Applicant Detail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Expected Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Action
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div className="w-full flex items-center justify-center p-10">
                    {LoadingLoader()}
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <>
                  <ModalContainer
                    isOpen={
                      currentModalId === "profileDetailModal" &&
                      editId === Number(applicant.id || -1)
                    }
                    onClose={handleCloseModal}
                    title={`Detail Candidates`}
                  >
                    <ProfileDetail applicantId={Number(applicant.id)} />
                  </ModalContainer>
                  <ModalContainer
                    isOpen={
                      currentModalId === "setNewScheduleModal" &&
                      editId === Number(applicant.id)
                    }
                    onClose={handleCloseModal}
                    title={`Set Interview Schedule`}
                  >
                    <FormSetNewInterview applicantId={Number(applicant.id)} />
                  </ModalContainer>
                  <ModalContainer
                    isOpen={
                      currentModalId === "editInterviewSchedule" &&
                      editId === Number(applicant.interviewId || -1)
                    }
                    onClose={handleCloseModal}
                    title={`Edit Interview Schedule`}
                  >
                    <FormEditInterview
                      interviewId={applicant.interviewId}
                      applicantId={Number(applicant.id) || -1}
                      interviewTimeEnd={applicant.interviewTimeEnd || ""}
                      interviewTimeStart={applicant.interviewTimeStart || ""}
                      interviewDate={applicant.interviewDate || ""}
                      interviewDescription={
                        applicant.interviewDescription || ""
                      }
                      interviewUrl={applicant.interviewUrl || ""}
                    />
                  </ModalContainer>
                  <ModalContainer
                    isOpen={
                      currentModalId === "ScheduleModal" &&
                      editId === Number(applicant.id)
                    }
                    onClose={handleCloseModal}
                    title={`Interview Schedule`}
                  >
                    <>
                      <div className={"grid grid-cols-2 gap-4"}>
                        <p className={"text-sm text-neutral-600 "}>
                          Interview Date
                        </p>
                        <p className={"text-sm font-semibold text-neutral-950"}>
                          {format(
                            new Date(applicant.interviewDate as string),
                            "dd, MMM yyyy",
                          )}
                        </p>

                        <p className={"text-sm text-neutral-600 "}>
                          Interview Time
                        </p>
                        <p className={"text-sm font-semibold text-neutral-950"}>
                          {applicant.interviewTimeStart} -{" "}
                          {applicant.interviewTimeEnd}
                        </p>

                        <p className={"text-sm text-neutral-600 "}>
                          Interview Link
                        </p>
                        <p className={"text-sm font-semibold text-neutral-950"}>
                          {applicant.interviewUrl}
                        </p>
                      </div>
                      <div
                        className={"flex items-center gap-4 justify-between"}
                      >
                        {applicant.status === "interview" ? (
                          <Button
                            variant={"link"}
                            size={"sm"}
                            onClick={() => {
                              dispatch(closeModalAction());
                              dispatch(
                                openModalAction(
                                  "editInterviewSchedule",
                                  Number(applicant.interviewId),
                                ),
                              );
                            }}
                          >
                            Edit Schedule
                          </Button>
                        ) : (
                          ""
                        )}

                        <div className={"flex items-center gap-4"}>
                          <p
                            className={"text-sm text-neutral-600 font-semibold"}
                          >
                            Marks as
                          </p>
                          <Button variant={"outline"} size={"sm"}>
                            Completed
                          </Button>
                        </div>
                      </div>
                    </>
                  </ModalContainer>
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(applicant.applyDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex flex-col gap-1">
                        <Button
                          className={"w-fit p-0 underline hover:neutral-600"}
                          variant={"link"}
                          size={"sm"}
                          onClick={() => {
                            dispatch(
                              openModalAction(
                                "profileDetailModal",
                                Number(applicant.id),
                              ),
                            );
                          }}
                        >
                          {applicant.name}
                        </Button>
                        <a
                          href={applicant.resumeLink?.replace("&dl=0", "&dl=1")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 text-xs underline"
                        >
                          View Resume
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {applicant.expectedSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!(
                        applicant.status === "accepted" ||
                        applicant.status === "rejected"
                      ) ? (
                        <select
                          value={applicant.status}
                          onChange={(e) => {
                            const token = Cookies.get("accessToken");
                            dispatch(
                              handleStatusChange({
                                applicantId: applicant.id,
                                status: e.target.value as JobStatus,
                                token: token as string,
                              }),
                            );
                          }}
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            applicant.status === "interview"
                              ? "text-yellow-800 bg-yellow-100"
                              : "text-neutral-950 bg-grey-100"
                          }`}
                        >
                          {renderStatusSelection(applicant.status)}
                        </select>
                      ) : (
                        <div
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${applicant.status === "accepted" ? "text-green-900 bg-green-100" : "text-red-900 bg-red-100"}`}
                        >
                          {applicant.status}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {applicant.status === "interview" ||
                      (applicant.status === "accepted" &&
                        applicant.interviewId) ||
                      (applicant.status === "rejected" &&
                        applicant.interviewId) ? (
                        <Button
                          onClick={() => {
                            if (
                              (applicant.interviewStatus === "scheduled" &&
                                applicant.status === "interview") ||
                              (applicant.interviewStatus === "scheduled" &&
                                applicant.status === "accepted") ||
                              (applicant.interviewStatus === "scheduled" &&
                                applicant.status === "rejected")
                            ) {
                              dispatch(
                                openModalAction(
                                  "ScheduleModal",
                                  Number(applicant.id),
                                ),
                              );
                            } else {
                              dispatch(
                                openModalAction(
                                  "setNewScheduleModal",
                                  Number(applicant.id),
                                ),
                              );
                            }
                          }}
                          variant={"outline"}
                          size={"xs"}
                        >
                          {(applicant.interviewStatus === "scheduled" &&
                            applicant.status === "interview") ||
                          (applicant.interviewStatus === "scheduled" &&
                            applicant.status === "accepted") ||
                          (applicant.interviewStatus === "scheduled" &&
                            applicant.status === "rejected")
                            ? "Interview Scheduled"
                            : "Set Interview Schedule"}
                        </Button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};
