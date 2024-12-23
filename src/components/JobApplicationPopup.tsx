import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";

interface JobApplicationProps {
  onSubmit: (application: {
    expectedSalary: string | number;
    cvFile: File | null;
  }) => void;
  onClose: () => void;
}

const JobApplicationPopup = ({ onSubmit, onClose }: JobApplicationProps) => {
  const [expectedSalary, setExpectedSalary] = useState<string | number>("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ expectedSalary, cvFile });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCvFile(event.target.files[0]);
      console.log("Selected file:", event.target.files[0]); // For debugging
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col bg-white rounded-2xl shadow-lg w-11/12 md:w-5/12 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-8 font-bold text-lg text-neutral-900 hover:text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4 break-words text-neutral-900">
          Apply Job
        </h2>
        <p className="mb-6 break-words text-neutral-600">
          You will apply to <span className="font-semibold">Tokopedia</span> as
          <span className="font-semibold">Senior React Developer</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Expected Salary */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-neutral-900">
              What is your expected salary for this position?
            </label>
            <input
              type="number"
              placeholder="Ex: 5000000 "
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              className="w-full border border-neutral-400 rounded-xl px-3 py-2"
            />
          </div>

          {/* Upload CV */}
          <div className="mb-4">
            <label
              htmlFor="cv-upload"
              className="block font-medium mb-1 text-neutral-900"
            >
              Upload your CV
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
            <ButtonComponent type="ButtonFilled" container="Apply Now" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationPopup;
