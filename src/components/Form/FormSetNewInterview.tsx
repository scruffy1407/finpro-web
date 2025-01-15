import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingLoader from "@/components/LoadingLoader";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import { CompanyUtils } from "@/utils/company.utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { handleSetInterview } from "@/store/slices/applicantSlice";

// interviewId?: number;
// applicationId: number;
// interviewDate: Date;
// interviewTimeStart: Date;
// interviewTimeEnd: Date;
// interviewDescrption: string;
// interviewUrl?: string;
// interviewStatus?: InterviewStatus;

export interface InterviewData {
  applicationId: number;
  interviewDate: string;
  interviewTimeStart: string;
  interviewTimeEnd: string;
  interviewUrl: string;
  interviewDescription: string;
  interviewId?: number;
}

interface SetNewInterview {
  applicantId: number;
}

function FormSetNewInterview({ applicantId }: SetNewInterview) {
  const dispatch = useDispatch<AppDispatch>();
  const { pendingState } = useSelector(
    (state: RootState) => state.applicantList,
  );

  const [isDisable, setIsDisable] = useState<boolean>(false);

  const [interviewData, setInterviewData] = useState<InterviewData>({
    applicationId: applicantId,
    interviewDate: "",
    interviewTimeStart: "14:00",
    interviewTimeEnd: "14:30",
    interviewUrl: "",
    interviewDescription: "",
  });

  // Validate function to check if all fields are filled
  useEffect(() => {
    if (
      !interviewData.interviewDate ||
      !interviewData.interviewTimeStart ||
      !interviewData.interviewTimeEnd ||
      !interviewData.interviewUrl ||
      !interviewData.interviewDescription
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [interviewData]);

  async function submitInterview(e: any) {
    e.preventDefault();
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("Please refresh your browser, or try to login again");
      return;
    }
    await dispatch(
      handleSetInterview({
        token: token as string,
        interviewData: interviewData,
      }),
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInterviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  return (
    <form className={`flex flex-col gap-4`} onSubmit={submitInterview}>
      {/* Expected Salary */}
      <div className="flex gap-4">
        <div className={"w-full"}>
          <label className="block font-medium mb-1 text-neutral-900">
            Interview Date
            <span className={"text-red-500"}>*</span>
          </label>
          <input
            name={"interviewDate"}
            className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
            type="date"
            onChange={handleChange}
            value={interviewData.interviewDate}
          />
        </div>
        <div>
          <div>
            <label className="block font-medium mb-1 text-neutral-900">
              Interview Time
              <span className={"text-red-500"}>*</span>
            </label>
            <div className={"flex gap-2 items-center"}>
              <input
                id="appointment-time"
                type="time"
                name="interviewTimeStart"
                value={interviewData.interviewTimeStart}
                className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
                onChange={handleChange}
              />
              -
              <input
                id="appointment-time"
                type="time"
                name="interviewTimeEnd"
                value={interviewData.interviewTimeEnd}
                className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <label className="block font-medium mb-1 text-neutral-900">
          Interview Link
          <span className={"text-red-500"}>*</span>
        </label>
        <p className={"text-xs mb-1 text-neutral-600"}>
          Attached interview link, you can copy and paste your zoom or google
          meet link in here
        </p>
        <input
          name={"interviewUrl"}
          className={`h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
          type="text"
          placeholder={"Enter Zoom or Gmeet Link"}
          onChange={handleChange}
          value={interviewData.interviewUrl}
        />
      </div>
      <div>
        <label className="block font-medium mb-1 text-neutral-900">
          Interview Description
          <span className={"text-red-500"}>*</span>
        </label>
        <p className={"text-xs mb-1 text-neutral-600"}>
          Provide candidates with instructions, detailed interview information,
          or any other support to ensure their interview runs smoothly.
        </p>
        <Textarea
          name={"interviewDescription"}
          className={"rounded-2xl"}
          placeholder={"Enter Description"}
          onChange={handleChange}
          value={interviewData.interviewDescription}
        />
      </div>

      {/* Save & Apply Button */}
      <div className="flex justify-start">
        <Button disabled={isDisable} variant={"primary"} size={"default"}>
          {pendingState.setNewInterviewLoading
            ? LoadingLoader()
            : "Set Interview"}
        </Button>
      </div>
    </form>
  );
}

export default FormSetNewInterview;
