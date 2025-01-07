import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingLoader from "@/components/LoadingLoader";

function FormSetNewInterview() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  return (
    <form className={`flex flex-col gap-3`}>
      {/* Expected Salary */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-neutral-900">
          Interview Date
          <span className={"text-red-500"}>*</span>
        </label>
        <input
          name={"dob"}
          className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
          type="date"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1 text-neutral-900">
          Interview Link
          <span className={"text-red-500"}>*</span>
        </label>
        <p className={"text-xs mb-1 text-neutral-600"}>
          Attached interview link, you can copy and paste your zoom or google
          meet link in here
        </p>
        <input
          name={"interviewLink"}
          className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
          type="text"
          placeholder={"Enter Zoom or Gmeet Link"}
        />
      </div>

      {/* Save & Apply Button */}
      <div className="flex justify-start">
        <Button disabled={isDisable} variant={"primary"} size={"default"}>
          {isLoading ? LoadingLoader() : "Set Interview"}
        </Button>
      </div>
    </form>
  );
}

export default FormSetNewInterview;
