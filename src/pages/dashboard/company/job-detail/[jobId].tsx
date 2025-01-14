import React, { useState, useEffect } from "react";
import { JobDetails } from "@/components/JobDetailsApplicant";
import { ApplicantTable } from "@/components/ApplicantTable";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AuthHandler } from "@/utils/auth.utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Navbar } from "@/components/NavigationBar/Navbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApplicantData } from "@/store/slices/applicantSlice";

interface JobDetailsResponse {
  job_id: number;
  job_title: string;
  job_type: string;
  job_experience_min: number;
  job_experience_max: number | null;
  salary_show: boolean;
  salary_min: number;
  salary_max: number | null;
  job_space: string;
  selection_text_active: boolean;
  company: {
    logo: string;
  };
}

enum ViewSelection {
  AllApplicant = "allApplicant",
  Shortlisted = "interview",
  Accepted = "accepted",
  Rejected = "rejected",
}

enum JobType {
  fulltime = "Full Time",
  freelance = "Freelance",
  internship = "Internship",
}

enum JobSpace {
  remoteworking = "Remote Working",
  onoffice = "On Office",
  hybrid = "Hybrid",
}

const JobApplicantDetail: React.FC = () => {
  const authHandler = new AuthHandler();
  const pagePermission = "company";
  authHandler.authorizeUser(pagePermission);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { applicantList, pendingState } = useSelector(
    (state: RootState) => state.applicantList
  );
  const [jobDetails, setJobDetails] = useState<JobDetailsResponse | null>(null);
  const [selectedView, setSelectedView] = useState<ViewSelection>(
    ViewSelection.AllApplicant
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

  const handleSelectChange = (value: any) => {
    setSelectedView(value);
  };

  useEffect(() => {
    if (jobId && isLoggedIn) {
      const accessToken = Cookies.get("accessToken");

      dispatch(
        getApplicantData({
          jobId: Number(jobId),
          token: accessToken as string,
          fetchType: selectedView,
        })
      );
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/jobpostinformation/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
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

  const getJobTypeLabel = (jobType: string): string =>
    JobType[jobType as keyof typeof JobType] || "Unknown Job Type";

  const getJobSpaceLabel = (jobSpace: string): string =>
    JobSpace[jobSpace as keyof typeof JobSpace] || "Unknown Job Space";

  return (
    <div className="overflow-hidden mt-5">
      <div className="mx-4 w-auto">
        <Navbar pageRole={"company"} />
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
                  jobType={getJobTypeLabel(jobDetails.job_type)}
                  experience={
                    jobDetails.job_experience_max &&
                    jobDetails.job_experience_max > 0
                      ? `${jobDetails.job_experience_min} - ${jobDetails.job_experience_max} Years`
                      : `${jobDetails.job_experience_min} Years`
                  }
                  salary={
                    jobDetails.salary_show
                      ? jobDetails.salary_max && jobDetails.salary_max > 0
                        ? `${formatCurrency(jobDetails.salary_min)} - ${formatCurrency(jobDetails.salary_max)}`
                        : `${formatCurrency(jobDetails.salary_min)}`
                      : "Not Disclosed"
                  }
                  location={getJobSpaceLabel(jobDetails.job_space)}
                  trueorfalse={jobDetails.selection_text_active}
                  onEdit={() => {}}
                  onDisable={() => {}}
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
                  applicants={applicantList}
                  isLoading={pendingState.dataLoading}
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
