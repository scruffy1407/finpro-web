import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const FormJobApplication = () => {
  const [expectedSalary, setExpectedSalary] = useState<string | number>("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(expectedSalary, cvFile);
    // onSubmit({ expectedSalary, cvFile });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCvFile(event.target.files[0]);
      console.log("Selected file:", event.target.files[0]); // For debugging
    }
  };

  return (
    <form className={`flex flex-col gap-5`} onSubmit={handleSubmit}>
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
        <Button variant={"primary"} size={"default"}>
          Send Application
        </Button>
      </div>
    </form>
  );
};

export default FormJobApplication;
