import React, { useState, useEffect } from "react";
import { JobDetails } from "@/components/JobDetailsApplicant";
import { ApplicantTable } from "@/components/ApplicantTable";
import { Applicant, JobStatus } from "@/models/applicant.model";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { AuthHandler } from "@/utils/auth.utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Navbar } from "@/components/NavigationBar/Navbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface JobDetailsResponse {
  job_id: number;
  job_title: string;
  job_type: string;
  job_experience_min: number;
  job_experience_max: number;
  salary_show: boolean;
  salary_min: number;
  salary_max: number;
  job_space: string;
  selection_text_active: boolean;
  company: {
    logo: string;
  };
}

interface ApplicantData {
  application_id: number;
  jobHunter: {
    name: string;
  };
  expected_salary: number;
  resume: string | null;
  created_at: string;
  application_status: JobStatus;
}

enum ViewSelection {
  AllApplicant = "allApplicant",
  Shortlisted = "interview",
  Accepted = "accepted",
  Rejected = "rejected",
}

const JobApplicantDetail: React.FC = () => {
  const authHandler = new AuthHandler();
  const pagePermission = "company";
  authHandler.authorizeUser(pagePermission);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [jobDetails, setJobDetails] = useState<JobDetailsResponse | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedView, setSelectedView] = useState<ViewSelection>(
    ViewSelection.AllApplicant,
  );
  const router = useRouter();
  const { jobId } = router.query;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleSelectChange = (value) => {
    console.log(value);
    setSelectedView(value); // Update the state with the selected value
  };
  console.log(selectedView);
  const handleStatusChange = async (id: string, status: JobStatus) => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/company/applications/`,
        {
          application_id: id,
          application_status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.status === 200) {
        setApplicants((prev) =>
          prev.map((applicant) =>
            applicant.id === id ? { ...applicant, status } : applicant,
          ),
        );
        toast.success("Applicant Status Updated Successfully");
      } else {
        console.error("Failed to update status on server", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push("/dashboard/company");
      } else {
        console.error("Error updating application status:", error);
      }
    }
  };

  const fetchApplicantDetails = async (fetchType: string) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }
    try {
      const queryString = `?get=${fetchType}`;
      console.log("QUERY", fetchType);
      const response = await axios.get(
        `http://localhost:8000/api/company/jobapplicants/${jobId}${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log("RESPONSE", response);
      if (response.status === 200) {
        const applicantData = response.data.data.applicants.map(
          (applicant: ApplicantData) => ({
            id: applicant.application_id.toString(),
            name: applicant.jobHunter.name,
            expectedSalary: formatCurrency(Number(applicant.expected_salary)),
            resumeLink: applicant.resume ? applicant.resume : null,
            applyDate: applicant.created_at,
            status: applicant.application_status as JobStatus,
          }),
        );
        setApplicants(applicantData);
      } else {
        console.error("No Applicant Found");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push("/dashboard/company");
      } else {
        console.error("Error fetching job applicants:", error);
      }
    }
  };

  useEffect(() => {
    if (jobId && isLoggedIn) {
      fetchApplicantDetails(selectedView);
    }
  }, [jobId, router, isLoggedIn, selectedView]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api/company/jobpostinformation/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (response.data.success) {
          setJobDetails(response.data.data);
        } else {
          router.push("/dashboard/company");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push("/dashboard/company");
        } else {
          console.error("Error fetching job details:", error);
        }
      }
    };
    if (jobId && isLoggedIn) {
      fetchJobDetails();
    }
  }, [jobId, router, isLoggedIn]);

  return (
    <div className="overflow-hidden mt-5">
      <div className="mx-4 w-auto">
        <Navbar />
      </div>

      <div className="min-h-screen bg-sky-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Job Details */}
            <div className="md:w-[25%]">
              {jobDetails ? (
                <JobDetails
                  jobId={jobDetails.job_id}
                  companyLogo={jobDetails.company.logo}
                  title={jobDetails.job_title}
                  jobType={jobDetails.job_type}
                  experience={`${jobDetails.job_experience_min} - ${jobDetails.job_experience_max} Years`}
                  salary={
                    jobDetails.salary_show
                      ? `${formatCurrency(jobDetails.salary_min)} - ${formatCurrency(
                          jobDetails.salary_max,
                        )}`
                      : "Not Disclosed"
                  }
                  location={jobDetails.job_space}
                  trueorfalse={jobDetails.selection_text_active}
                  onEdit={() => console.log("Edit clicked")}
                  onDisable={() => console.log("Disable clicked")}
                />
              ) : (
                <p>Loading job details...</p>
              )}
            </div>

            {/* Right side - Applicant List */}
            <div className="md:w-[75%]">
              <div className="bg-white rounded-2xl p-6">
                <div className={"flex items-center justify-between mb-6"}>
                  <h2 className="text-xl font-bold">Applicant List</h2>
                  <Select
                    onValueChange={handleSelectChange}
                    defaultValue={ViewSelection.AllApplicant}
                  >
                    <SelectTrigger className="w-[180px] rounded-2xl">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className={"rounded-2xl"}>
                      <SelectGroup>
                        <SelectItem value={ViewSelection.AllApplicant}>
                          All Applicant
                        </SelectItem>
                        <SelectItem value={ViewSelection.Shortlisted}>
                          Shortlisted Interview
                        </SelectItem>
                        <SelectItem value={ViewSelection.Accepted}>
                          Accepted
                        </SelectItem>
                        <SelectItem value={ViewSelection.Rejected}>
                          Rejected
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

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
