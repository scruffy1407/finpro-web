import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApplyJob } from "@/models/company.model";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";
import { CompanyUtils } from "@/utils/company.utils";
import Cookies from "js-cookie";
import LoadingLoader from "@/components/LoadingLoader";
import { useRouter } from "next/router";

interface JobFormProps {
  jobId: number;
  waitingSubmissionStatus: boolean;
  applicationId: number;
}

const FormJobApplication = ({
  jobId,
  waitingSubmissionStatus,
  applicationId,
}: JobFormProps) => {
  const router = useRouter();
  const companyUtils = new CompanyUtils();
  const { innerId } = useSelector((state: RootState) => state.auth);
  const [applyJobForm, setApplyJobForm] = useState<ApplyJob>({
    jobHunterId: innerId as number,
    expected_salary: "",
    jobId: jobId,
    resume: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("accessToken");

    if (applyJobForm.expected_salary === "" || applyJobForm.resume === null) {
      toast.error("Please fill all the required fields");
      return;
    }

    if (
      applyJobForm.jobId === undefined ||
      applyJobForm.jobHunterId === undefined ||
      token === undefined
    ) {
      toast.error(
        "Something went wrong, please try again or refresh your browser",
      );
      return;
    }

    try {
      setIsLoading(true);
      setIsDisable(true);

      const applyJobData = new FormData();
      applyJobData.append("jobHunterId", applyJobForm.jobHunterId.toString());
      applyJobData.append(
        "expected_salary",
        applyJobForm.expected_salary.toString(),
      );
      applyJobData.append("jobId", applyJobForm.jobId.toString());
      applyJobData.append("resume", applyJobForm.resume);

      let response;
      if (waitingSubmissionStatus) {
        // Ensure applicationId is passed and included
        if (!applicationId) {
          toast.error("Application ID is missing for this submission.");
          return;
        }

        const filteredApplyJobData = new FormData();
        filteredApplyJobData.append("resume", applyJobForm.resume);
        filteredApplyJobData.append("applicationId", applicationId.toString()); // Use passed applicationId
        filteredApplyJobData.append(
          "expected_salary",
          applyJobForm.expected_salary.toString(),
        );

        response = await companyUtils.applyJobSub(
          token as string,
          filteredApplyJobData,
        );
      } else {
        response = await companyUtils.applyJob(token as string, applyJobData);
      }
      if (
        (response.status === 200 || response.status === 201) &&
        response.data?.success
      ) {
        toast.success("Application sent successfully");
        setIsLoading(false);
        setIsDisable(false);
        setTimeout(() => {
          router.push(
            `${process.env.CLIENT_URL}/jobdetail/apply-success?job=${jobId}&apply=true`,
          );
        }, 2000);
      } else {
        toast.error(response.data?.message || "Submission failed");
        setIsLoading(false);
        setIsDisable(false);
      }
    } catch (error) {
      console.error("Failed to submit application", error);
      toast.error(
        "Failed to submit your application, please try again or refresh your browser",
      );
    } finally {
      setIsLoading(false);
      setIsDisable(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB limit
    const file = event.target.files?.[0];

    if (file) {
      if (file.size <= maxSizeInBytes) {
        setApplyJobForm({
          ...applyJobForm,
          resume: file,
        });
      } else {
        toast.error("File size exceeds limit. Please upload a file under 2MB.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Expected Salary */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-neutral-900">
          What is your expected salary for this position?{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Ex: 5000000"
          value={applyJobForm.expected_salary}
          onChange={(e) =>
            setApplyJobForm({
              ...applyJobForm,
              expected_salary: e.target.value,
            })
          }
          className="w-full border border-neutral-400 rounded-xl px-3 py-2"
        />
      </div>

      {/* Upload CV */}
      <div className="mb-4">
        <label
          htmlFor="cv-upload"
          className="block font-medium mb-1 text-neutral-900"
        >
          Upload your CV <span className="text-red-500">*</span>
        </label>
        <input
          id="cv-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full border border-neutral-400 rounded-xl px-3 py-2"
        />
      </div>

      {/* Save & Apply Button */}
      <div className="flex justify-start">
        <Button disabled={isDisable} variant="primary" size="default">
          {isLoading ? <LoadingLoader /> : "Send Application"}
        </Button>
      </div>
    </form>
  );
};

export default FormJobApplication;
