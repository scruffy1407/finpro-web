import React from "react";
import { Applicant, JobStatus } from "@/models/applicant.model";

interface ApplicantTableProps {
  applicants: Applicant[];
  onStatusChange: (id: string, status: JobStatus) => void;
}

export const ApplicantTable: React.FC<ApplicantTableProps> = ({
  applicants,
  onStatusChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Applicant Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Expected Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Resume/CV
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Apply Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applicants.map((applicant) => (
            <tr key={applicant.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {applicant.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {applicant.expectedSalary.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <a
                  href={applicant.resumeLink?.replace("&dl=0", "&dl=1")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900"
                >
                  View Resume
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(applicant.applyDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={applicant.status}
                  onChange={(e) =>
                    onStatusChange(applicant.id, e.target.value as JobStatus)
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
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
