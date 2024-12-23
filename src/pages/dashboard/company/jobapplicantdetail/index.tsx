import React, { useState } from "react";
import { JobDetails } from "@/components/JobDetailsApplicant";
import { ApplicantTable } from "@/components/ApplicantTable";
import { Applicant, JobStatus } from "@/models/applicant.model";
import NavbarComponent from "@/components/NavbarComponent";

const mockApplicants: Applicant[] = [
  {
    id: "1",
    name: "John Doe",
    expectedSalary: 85000,
    resumeLink: "#",
    applyDate: "2024-01-15",
    status: "onreview",
  },
  {
    id: "2",
    name: "Jane Smith",
    expectedSalary: 92000,
    resumeLink: "#",
    applyDate: "2024-01-16",
    status: "onreview",
  },
  {
    id: "3",
    name: "Jane Smith",
    expectedSalary: 92000,
    resumeLink: "#",
    applyDate: "2024-01-16",
    status: "onreview",
  },
  {
    id: "4",
    name: "Jane Smith",
    expectedSalary: 92000,
    resumeLink: "#",
    applyDate: "2024-01-16",
    status: "onreview",
  },
  {
    id: "5",
    name: "Jane Smith",
    expectedSalary: 92000,
    resumeLink: "#",
    applyDate: "2024-01-16",
    status: "onreview",
  },
  {
    id: "6",
    name: "Jane Smith",
    expectedSalary: 92000,
    resumeLink: "#",
    applyDate: "2024-01-16",
    status: "onreview",
  },
  {
    id: "2",
    name: "Jane Smith",
    expectedSalary: 92000,
    resumeLink: "#",
    applyDate: "2024-01-16",
    status: "onreview",
  },
];

const JobApplicantDetail: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);

  const handleStatusChange = (id: string, status: JobStatus) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, status } : applicant
      )
    );
  };

  return (
    <div className="overflow-hidden mt-5">
      <div className="mx-4 w-auto">
        <NavbarComponent
          findJobs="Find Jobs"
          skillAssessment="Skill Assessment"
          exploreCompanies="Explore Companies"
          loginJobHunter="Login"
          loginCompanies="Login as Recruiter"
        />
      </div>

      <div className="min-h-screen bg-sky-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Job Details */}
            <div className="md:w-[30%]">
              <JobDetails
                title="Senior Frontend Developer"
                jobType="Full Time"
                experience="1 - 3 Years"
                salary="8,5 jt - 10 jt"
                location="Remote Working"
				trueorfalse={false}
                onEdit={() => console.log("Edit clicked")}
                onDisable={() => console.log("Disable clicked")}
              />
            </div>

            {/* Right side - Applicant List */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Applicant List</h2>
                <ApplicantTable
                  applicants={applicants}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicantDetail;
