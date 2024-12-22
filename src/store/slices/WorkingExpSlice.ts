import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { ProfileHandler } from "@/utils/profile.utils";
import { reviewResponse } from "@/models/company.model";

interface ParamsGetWorkExp {
  token: string;
  wReview: boolean;
}
interface WorkingExperience {
  workingExperienceId?: number;
  jobHunterId?: number;
  companyId?: number;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  jobReview: reviewResponse[];
}
interface PendingState {
  isLoading: boolean;
  isDisable: boolean;
  isRender: boolean;
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
    jobHunterId: undefined,
    companyId: undefined,
    companyName: "",
    jobDescription: "",
    jobTitle: "",
    jobReview: [],
  },
  pendingState: {
    isLoading: false,
    isDisable: false,
    isRender: false,
  },
};

export const getWorkingExperience = createAsyncThunk(
  "user/company/workExprience",
  async ({ token, wReview }: ParamsGetWorkExp) => {
    console.log("ASYNC Review", wReview);
    try {
      const response = await profileHandler.getWorkingExperience(
        token,
        wReview,
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (e: unknown) {
      return e;
    }
  },
);

export const deleteWorkingExperience = createAsyncThunk(
  "user/company/delete-working-experience",
  async (data: { token: string; workExp: number }) => {
    try {
      const response = await profileHandler.deleteWorkingExperience(
        data.token,
        data.workExp,
      );
      if (response === 200) {
        return { status: response, workExpId: data.workExp };
      } else {
        throw new Error("Failed to delete work experience");
      }
    } catch (e) {
      throw e;
    }
  },
);

const workExpSlice = createSlice({
  name: "workExperience",
  initialState,
  reducers: {
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
          exp.workingExperienceId === updatedExperience.workingExperienceId,
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
          },
        );
        state.workingExpList = workingExpMap;

        state.pendingState.isRender = true;
      })
      .addCase(deleteWorkingExperience.pending, (state) => {
        state.pendingState.isLoading = true;
        state.pendingState.isDisable = true;
      })
      .addCase(deleteWorkingExperience.fulfilled, (state, action) => {
        const deletedData: {
          status: number;
          workExpId: number;
        } = action.payload;

        const deletedIndex = state.workingExpList.findIndex(
          (exp) => exp.workingExperienceId === deletedData.workExpId,
        );
        if (deletedIndex !== -1) {
          state.workingExpList.splice(deletedIndex, 1);
        }
        state.pendingState.isLoading = false;
        state.pendingState.isDisable = false;
        toast.success("Delete success");
      });
  },
});

export const { setSelectedItem, clearSelectedItem, updateWorkingExp } =
  workExpSlice.actions;

export default workExpSlice.reducer;
