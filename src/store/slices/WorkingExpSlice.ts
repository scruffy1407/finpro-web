import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { ProfileHandler } from "@/utils/profile.utils";
import { reviewResponse } from "@/models/company.model";

interface ParamsGetWorkExp {
  token: string;
  wReview: boolean;
}
export interface WorkingExperience {
  workingExperienceId?: number;
  jobHunterId: number | null;
  companyId?: number | null;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  jobReview?: reviewResponse[];
}
interface PendingState {
  actionLoading: boolean;
  actionDisable: boolean;
  dataLoading: boolean;
  isRender: boolean;
  isLoading: boolean;
  isDisable: boolean;
}
interface WorkingExpList {
  workingExpList: WorkingExperience[];
  uniqueCompanyWorkExpList: WorkingExperience[];
  editWorkingExp?: WorkingExperience;
  selectedItemId?: number | undefined;
  pendingState: PendingState;
}

const profileHandler = new ProfileHandler();

const initialState: WorkingExpList = {
  workingExpList: [],
  uniqueCompanyWorkExpList: [],
  selectedItemId: undefined,
  editWorkingExp: {
    workingExperienceId: undefined,
    jobHunterId: null,
    companyId: undefined,
    companyName: "",
    jobDescription: "",
    jobTitle: "",
    jobReview: [],
  },
  pendingState: {
    actionLoading: false,
    actionDisable: false,
    dataLoading: false,
    isRender: false,
    isLoading: false,
    isDisable: false,
  },
};

export const getWorkingExperience = createAsyncThunk(
  "user/company/workExprience",
  async ({ token, wReview }: ParamsGetWorkExp) => {
    console.log("ASYNC Review", wReview);
    try {
      const response = await profileHandler.getWorkingExperience(
        token,
        wReview
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (e: unknown) {
      return e;
    }
  }
);

export const addNewWorkingExperience = createAsyncThunk(
  "user/company/create-working-experience",
  async (data: { token: string; formData: WorkingExperience }) => {
    try {
      const response = await profileHandler.createWorkingExperience(
        data.token as string,
        {
          ...data.formData,
          jobHunterId: data.formData.jobHunterId as number,
        }
      );
      if (response.status === 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (e) {
      return e;
    }
  }
);

export const deleteWorkingExperience = createAsyncThunk(
  "user/company/delete-working-experience",
  async (data: { token: string; workExp: number }) => {
    try {
      const response = await profileHandler.deleteWorkingExperience(
        data.token,
        data.workExp
      );
      if (response === 200) {
        return { status: response, workExpId: data.workExp };
      } else {
        throw new Error("Failed to delete work experience");
      }
    } catch (e) {
      throw e;
    }
  }
);

const workExpSlice = createSlice({
  name: "workExperience",
  initialState,
  reducers: {
    addJobs: (state, action) => {
      if (action.payload.index && action.payload.reviewForm) {
        state.workingExpList[action.payload.index].jobReview?.unshift({
          ...action.payload.reviewForm,
        });
      }
    },
    setDisable: (state, action) => {
      state.pendingState.isDisable = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItemId = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItemId = undefined;
    },
    updateWorkingExp: (state, action) => {
      const updatedExperience = action.payload;
      const experienceIndex = state.workingExpList.findIndex(
        (exp) =>
          exp.workingExperienceId === updatedExperience.workingExperienceId
      );

      if (experienceIndex !== -1) {
        state.workingExpList[experienceIndex] = {
          ...state.workingExpList[experienceIndex],
          ...updatedExperience, // Update existing experience properties
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkingExperience.fulfilled, (state, action) => {
        console.log("SLICE", action.payload);

        if (Array.isArray(action.payload)) {
          const workingExpMap: WorkingExperience[] = action.payload.map(
            (workExp): WorkingExperience => {
              return {
                workingExperienceId: workExp.work_experience_id,
                companyId: workExp.companyId,
                companyName: workExp.company_name,
                jobTitle: workExp.job_title,
                jobDescription: workExp.job_description,
                jobHunterId: workExp.jobHunterId,
                jobReview: workExp.JobReview,
              };
            }
          );
          state.workingExpList = workingExpMap;
        } else {
          console.warn("Payload is not an array:", action.payload);
          state.workingExpList = [];
        }

        state.pendingState.isRender = true;
      })
      .addCase(deleteWorkingExperience.pending, (state) => {
        state.pendingState.actionLoading = true;
        state.pendingState.actionDisable = true;
      })
      .addCase(deleteWorkingExperience.fulfilled, (state, action) => {
        const deletedData: {
          status: number;
          workExpId: number;
        } = action.payload;

        const deletedIndex = state.workingExpList.findIndex(
          (exp) => exp.workingExperienceId === deletedData.workExpId
        );
        if (deletedIndex !== -1) {
          state.workingExpList.splice(deletedIndex, 1);
        }
        state.pendingState.actionLoading = false;
        state.pendingState.actionDisable = false;
        toast.success("Delete success");
      })
      .addCase(addNewWorkingExperience.pending, (state) => {
        state.pendingState.actionLoading = true;
        state.pendingState.actionDisable = true;
      })
      .addCase(addNewWorkingExperience.fulfilled, (state, action) => {
        console.log(action);
        state.workingExpList.unshift({
          jobHunterId: action.payload.jobHunterId,
          workingExperienceId: action.payload.work_experience_id,
          companyId: action.payload.companyId,
          companyName: action.payload.company_name,
          jobDescription: action.payload.job_description,
          jobTitle: action.payload.job_title,
          jobReview: [],
        });
        toast.success("Success add new working experience");
      });
  },
});

export const {
  setSelectedItem,
  clearSelectedItem,
  updateWorkingExp,
  setDisable,
  addJobs,
} = workExpSlice.actions;

export default workExpSlice.reducer;
