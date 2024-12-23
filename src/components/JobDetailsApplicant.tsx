import React from "react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface JobDetailsProps {
  title: string;
  jobType: string;
  experience: string;
  salary: string;
  location: string;
  trueorfalse: boolean;
  onEdit: () => void;
  onDisable: () => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  title,
  jobType,
  experience,
  salary,
  location,
  trueorfalse,
  //   onEdit,
  //   onDisable,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-sm">Job Type:</span>
          <span className="font-medium text-sm">{jobType}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-sm">Experience:</span>
          <span className="font-medium text-sm">{experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-sm">Salary:</span>
          <span className="font-medium text-sm">{salary}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-sm">Work Location:</span>
          <span className="font-medium text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 min-w-28 text-sm">Selection Test:</span>
          {/* kalo misalkan true = Selection Test Enabled / kalo misalkan false = No Selection Test */}
          <span className="font-medium text-sm">{trueorfalse}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 justify-between">
        <Button variant="primary" className="w-full">
          Edit Job
        </Button>
        <div className="flex items-center gap-2">
          <Label htmlFor="Job Online" className="text-xs text-neutral-600">
            Unpublish
          </Label>
          <Switch id="Job Online" />
          <Label htmlFor="Job Online" className="text-xs text-neutral-600">
            Publish
          </Label>
        </div>
      </div>
    </div>
  );
};
