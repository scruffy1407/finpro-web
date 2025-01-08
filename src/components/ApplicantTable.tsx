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
                        {applicant.name}
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
                          applicant.status === "accepted"
                            ? "text-green-800 bg-green-100"
                            : applicant.status === "rejected"
                              ? "text-red-800 bg-red-100"
                              : "text-yellow-800 bg-yellow-100"
                        }`}
                        disabled={applicant.status !== "onreview"}
                      >
                        <option value="onreview">On Review</option>
                        <option value="interview">Interview</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {applicant.status === "interview" ? (
                        <Button
                          onClick={() => {
                            if (
                              applicant.interviewStatus === "scheduled" &&
                              applicant.status === "interview"
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
                          {applicant.interviewStatus === "scheduled" &&
                          applicant.status === "interview"
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
