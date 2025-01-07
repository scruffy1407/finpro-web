import React from "react";
import { Applicant, JobStatus } from "@/models/applicant.model";
import LoadingLoader from "@/components/LoadingLoader";
import { Button } from "@/components/ui/button";
import ModalContainer from "@/components/Modal/ModalContainer";
import FormEditWorkingExperience from "@/components/Form/FormEditWorkingExperience";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import FormSetNewInterview from "@/components/Form/FormSetNewInterview";

interface ApplicantTableProps {
  applicants: Applicant[];
  onStatusChange: (id: string, status: JobStatus) => void;
  isLoading: boolean;
}

export const ApplicantTable: React.FC<ApplicantTableProps> = ({
  applicants,
  onStatusChange,
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
                    <FormSetNewInterview />
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
                        onChange={(e) =>
                          onStatusChange(
                            applicant.id,
                            e.target.value as JobStatus,
                          )
                        }
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
                          onClick={() =>
                            dispatch(
                              openModalAction(
                                "setNewScheduleModal",
                                Number(applicant.id),
                              ),
                            )
                          }
                          variant={"outline"}
                          size={"xs"}
                        >
                          Set Interview Schedule
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
