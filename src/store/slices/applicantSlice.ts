import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JobStatus } from "@/models/applicant.model";
import axios from "axios";
import { formatInTimeZone } from "date-fns-tz";
import { toast } from "sonner";
import { InterviewData } from "@/components/Form/FormSetNewInterview";
import { CompanyUtils } from "@/utils/company.utils";

const companyUtils = new CompanyUtils();

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

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
interface PendingState {
  actionLoading: boolean;
  actionDisable: boolean;
  dataLoading: boolean;
  isRender: boolean;
  isLoading: boolean;
  isDisable: boolean;
  updateStatusLoading: boolean;
  setNewInterviewLoading: boolean;
}
interface InterviewProps {
  interview_id: number;
  applicationId: number;
  interview_date: Date;
  interview_time_start: Date;
  interview_time_end: Date;
  interview_descrption: string;
  interview_status: string;
  interview_url: string;
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
  interview: InterviewProps[];
}

export interface Applicant {
  id: string;
  name: string;
  expectedSalary: number;
  resumeLink: string;
  applyDate: string;
  status: JobStatus;
  interviewStatus?: string;
  interviewDate?: string;
  interviewDescription?: string;
  interviewUrl?: string;
  interviewTimeStart?: string;
  interviewTimeEnd?: string;
  interviewId: number;
}
interface InitialState {
  applicantList: Applicant[];
  pendingState: PendingState;
}

const initialState: InitialState = {
  applicantList: [],
  pendingState: {
    actionLoading: false,
    actionDisable: false,
    dataLoading: false,
    isDisable: false,
    isLoading: false,
    isRender: false,
    updateStatusLoading: false,
    setNewInterviewLoading: false,
  },
};

interface ParamsGetApplicant {
  token: string;
  fetchType: string;
  jobId: number;
}
interface ParamsUpdateStatus {
  token: string;
  applicantId: string;
  status: JobStatus;
}

interface ParamsSetInterview {
  token: string;
  interviewData: InterviewData;
}

export const getApplicantData = createAsyncThunk(
  "company/getApplicant",
  async ({ token, fetchType, jobId }: ParamsGetApplicant) => {
    if (!token) {
      console.error("Access token not found");
      return;
    }
    try {
      const queryString = `?get=${fetchType}`;

      const response = await axios.get(
        `http://localhost:8000/api/company/jobapplicants/${jobId}${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data.data.applicants;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
);

export const handleStatusChange = createAsyncThunk(
  "company/updateApplicantStatus",
  async ({ status, applicantId, token }: ParamsUpdateStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/company/applications/`,
        {
          application_id: applicantId,
          application_status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Applicant Status Updated Successfully");
        return {
          applicantId: applicantId,
          status: status,
        };
      } else {
        toast.error("Failed to update status, Please refresh your browser");
        console.error("Failed to update status on server", response.data);
        return {
          applicantId: applicantId,
          status: status,
        };
      }
    } catch (e) {
      toast.error("Failed to update status, Please refresh your browser");
      return {
        applicantId: applicantId,
        status: status,
      };
    }
  },
);

export const handleSetInterview = createAsyncThunk(
  "company/setInterview",
  async ({ token, interviewData }: ParamsSetInterview) => {
    try {
      const response = await companyUtils.setInterview(
        token as string,
        interviewData,
      );
      console.log("SLICE INTERVIEW", response);
      return response.data;
    } catch (e) {
      toast.error("Failed to set schedule, Please refresh your browser");
      return [];
    }
  },
);

const applicantSlice = createSlice({
  name: "applicantList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicantData.pending, (state) => {
        state.pendingState.dataLoading = true;
      })
      .addCase(getApplicantData.fulfilled, (state, action) => {
        state.applicantList = action.payload.map(
          (applicant: ApplicantData) => ({
            id: applicant.application_id.toString(),
            name: applicant.jobHunter.name,
            expectedSalary: formatCurrency(Number(applicant.expected_salary)),
            resumeLink: applicant.resume ? applicant.resume : null,
            applyDate: applicant.created_at,
            status: applicant.application_status as JobStatus,
            interviewId:
              applicant.interview.length === 0
                ? ""
                : applicant.interview[0].interview_id,
            interviewStatus:
              applicant.interview.length === 0
                ? ""
                : applicant.interview[0].interview_status,
            interviewDate:
              applicant.interview.length === 0
                ? new Date()
                : applicant.interview[0].interview_date,
            interviewDescription:
              applicant.interview.length === 0
                ? ""
                : applicant.interview[0].interview_descrption,
            interviewUrl:
              applicant.interview.length === 0
                ? ""
                : applicant.interview[0].interview_url,
            interviewTimeStart:
              applicant.interview.length === 0
                ? ""
                : formatInTimeZone(
                    applicant.interview[0].interview_time_start,
                    "Asia/Jakarta",
                    "HH:mm",
                  ),
            interviewTimeEnd:
              applicant.interview.length === 0
                ? ""
                : formatInTimeZone(
                    applicant.interview[0].interview_time_end,
                    "Asia/Jakarta",
                    "HH:mm",
                  ),
          }),
        );
        state.pendingState.dataLoading = false;
      })
      .addCase(getApplicantData.rejected, (state) => {
        state.pendingState.dataLoading = false;
        toast.success(
          "Failed to get applicant information, please refresh your browser",
        );
      })
      .addCase(handleStatusChange.pending, (state) => {
        state.pendingState.updateStatusLoading = true;
      })
      .addCase(handleStatusChange.fulfilled, (state, action) => {
        const status = action.payload.status;
        state.applicantList = state.applicantList.map((applicant) =>
          applicant.id === action?.payload?.applicantId
            ? { ...applicant, status }
            : applicant,
        );
      })
      .addCase(handleSetInterview.pending, (state) => {
        state.pendingState.setNewInterviewLoading = true;
      })
      .addCase(handleSetInterview.fulfilled, (state, action) => {
        console.log(action);
        const applicantId = action.payload.applicationId;
        state.applicantList = state.applicantList.map((applicant) =>
          applicant.id === applicantId
            ? {
                ...applicant,
                interviewStatus: action.payload.interview_status,
                interviewDate: action.payload.interview_date,
                interviewDescription: action.payload.interview_descrption,
                interviewUrl: action.payload.interview_url,
                interviewTimeStart: action.payload.interview_time_start,
                interviewTimeEnd: action.payload.interview_time_end,
                interviewId: action.payload.interview_id,
              }
            : applicant,
        );
        state.pendingState.setNewInterviewLoading = false;
        toast.success("Successfully set interview");
      });
  },
});

export const {} = applicantSlice.actions;

export default applicantSlice.reducer;
