import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface JobDetailsProps {
  jobId: number;
  title: string;
  jobType: string;
  experience: string;
  salary: string;
  location: string;
  trueorfalse: boolean;
  companyLogo: string;
  onEdit: () => void;
  onDisable: () => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  jobId,
  title,
  jobType,
  experience,
  salary,
  location,
  trueorfalse,
  companyLogo,
}) => {
  const [jobStatus, setJobStatus] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobStatus = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/jobstatus/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.status === 200) {
          setJobStatus(response.data.status);
        } else {
          console.error("Failed to fetch job status.");
        }
      } catch (error) {
        console.error("Error fetching job status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobStatus();
  }, [jobId]);

  const toggleJobStatus = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/job/${jobId}/status`,
        { status: !jobStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 200) {
        setJobStatus(!jobStatus);
        toast.success(
          `Job status updated to ${!jobStatus ? "Active" : "Inactive"}`,
        );
      } else {
        toast.error("Failed to update job status.");
      }
    } catch (error) {
      console.error("Error toggling job status:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading job details...</div>;
  }
  const switchChecked = jobStatus === null ? false : jobStatus;

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={
            companyLogo ||
            "https://res.cloudinary.com/dgnce1xzd/image/upload/v1734781439/ohlj0zikblpzrexcrd2w.png"
          }
          alt={"Company Logo"}
          width={40}
          height={40}
          className="rounded-full"
        />

        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-xs">Job Type:</span>
          <span className="font-medium text-xs">{jobType}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-xs">Experience:</span>
          <span className="font-medium text-xs">{experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-xs">Salary:</span>
          <span className="font-medium text-xs">{salary}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-xs">Work Location:</span>
          <span className="font-medium text-xs">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-xs">
            Selection Test:
          </span>
          <span className="font-medium text-xs">
            {trueorfalse ? "Selection Test Available" : "No Selection Test"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 justify-between">
        <Button variant="primary" className="w-full">
          Edit Job
        </Button>
        <div className="flex items-center gap-2">
          <Label htmlFor="JobStatus" className="text-xs text-neutral-600">
            Unpublish Job
          </Label>
          <Switch
            id="JobStatus"
            checked={switchChecked}
            onCheckedChange={toggleJobStatus}
          />
          <Label htmlFor="JobStatus" className="text-xs text-neutral-600">
            Publish Job
          </Label>
        </div>
      </div>
    </div>
  );
};
