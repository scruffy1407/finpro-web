import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { ProfileHandler } from "@/utils/profile.utils";
import { EducationDegree, EducationDegreeType } from "@/models/educationDegree";

export interface Education {
  educationId?: number | null;
  jobHunterId: number | null;
  educationName: string;
  education_degree: EducationDegreeType | null;
  educationDescription: string;
  cumulativeGpa: number;
  educationDate: string | Date;
}
interface ServerEducation {
  education_id: number | null;
  cumulative_gpa: number;
  education_description: string;
  education_name: string;
  education_degree: EducationDegreeType;
  graduation_date: string;
  jobHunterId: number | null;
}
interface PendingState {
  actionLoading: boolean;
  actionDisable: boolean;
  dataLoading: boolean;
  isRender: boolean;
}
interface EducationList {
  educationList: Education[];
  editEducation: Education;
  newEducation: Education;
  selectedItemId?: number | undefined;
  pendingState: PendingState;
}
interface InputChangePayload {
  name: string | number;
  value: string | number;
}

const profileHandler = new ProfileHandler();

const initialState: EducationList = {
  educationList: [],
  selectedItemId: undefined,
  editEducation: {
    educationId: null,
    jobHunterId: null,
    educationName: "",
    education_degree: null,
    educationDescription: "",
    cumulativeGpa: 0,
    educationDate: "",
  },
  newEducation: {
    jobHunterId: null,
    educationName: "",
    education_degree: null,
    educationDescription: "",
    cumulativeGpa: 0,
    educationDate: "",
  },
  pendingState: {
    actionLoading: false,
    actionDisable: false,
    dataLoading: false,
    isRender: false,
  },
};

function checkFeld(educationData: Education) {
  if (
    educationData.educationName === "" ||
    educationData.education_degree === null ||
    educationData.educationDescription === "" ||
    educationData.educationDate === ""
  ) {
    return true;
  } else {
    return false;
  }
}

export const getEducation = createAsyncThunk(
  "user/jobhunter/education",
  async (token: string) => {
    try {
      const response = await profileHandler.getEducation(token);
      console.log('Add Education Response:', response.data); // Debug log
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (e) {
      return e;
    }
  }
);

export const addNewEducation = createAsyncThunk(
  "user/jobhunter/create-education",
  async (newData: { token: string; data: Education }) => {
    const checkData = checkFeld(newData.data);
    if (!checkData) {
      try {
        const response = await profileHandler.addNewEducation(
          newData.token,
          newData.data
        );
        if (response.status === 201) {
          return response.data;
        } else {
          return null;
        }
      } catch (e) {
        return e;
      }
    } else {
      toast.error("Please filled all the field");
    }
  }
);

export const editEducationData = createAsyncThunk(
  "user/jobhunter/education/edit",
  async (updateData: { token: string; data: Education }) => {
    const checkData = checkFeld(updateData.data);
    if (!checkData) {
      try {
        const response = await profileHandler.editEducation(
          updateData.token,
          updateData.data
        );
        if (response.status === 200) {
          return response.data;
        } else {
          return null;
        }
      } catch (e) {
        return e;
      }
    }
    {
      toast.error("Please filled all the field");
    }
  }
);

const handleInputChange = (
  state: EducationList,
  action: { payload: InputChangePayload },
  targetObject: Education
) => {
  const { name, value } = action.payload;

  switch (name) {
    case "educationName":
      targetObject.educationName = String(value);
      break;
    case "education_degree":
      targetObject.education_degree = value as EducationDegreeType;
      break;
    case "educationDescription":
      targetObject.educationDescription = String(value);
      break;
    case "cumulativeGpa":
      targetObject.cumulativeGpa = Number(value);
      break;
    case "educationDate":
      targetObject.educationDate =
        typeof value === "string" ? value : new Date(value).toISOString();
      break;
    default:
      break;
  }

  state.pendingState.actionDisable = checkFeld(targetObject);
};

export const deleteEducation = createAsyncThunk(
  "user/jobhunter/delete-education",
  async (data: { token: string; education_id: number }) => {
    try {
      const response = await profileHandler.deleteEducation(
        data.token,
        data.education_id
      );
      if (response.status === 200) {
        return {
          status: response.status,
          educationId: data.education_id,
        };
      } else {
        throw new Error("Failed to delete work experience");
      }
    } catch (e) {
      throw e;
    }
  }
);

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addNewEducation: (state, action) => {
      state.educationList.unshift(action.payload);
    },

    initEditEducation: (state, action) => {
      const updatedEducation: Education = action.payload;
      state.editEducation.educationName = updatedEducation.educationName;
      state.editEducation.educationDescription =
        updatedEducation.educationDescription;
      state.editEducation.education_degree = updatedEducation.education_degree;
      state.editEducation.cumulativeGpa = updatedEducation.cumulativeGpa;
      state.editEducation.educationId = updatedEducation.educationId;
      state.editEducation.jobHunterId = updatedEducation.jobHunterId;
      state.editEducation.educationDate = updatedEducation.educationDate;
    },

    handleNewInputChange: (state, action) => {
      handleInputChange(state, action, state.newEducation);
      if (
        (state.newEducation.education_degree as EducationDegreeType) ===
          EducationDegree.lessThanHighSchool ||
        (state.newEducation.education_degree as EducationDegreeType) ===
          EducationDegree.highSchool ||
        (state.newEducation.education_degree as EducationDegreeType) ===
          EducationDegree.vocational
      ) {
        state.newEducation.cumulativeGpa = 0;
      }
    },
    handleInputEditChange: (state, action) => {
      handleInputChange(state, action, state.editEducation);
      if (
        (state.editEducation.education_degree as EducationDegreeType) ===
          EducationDegree.lessThanHighSchool ||
        (state.editEducation.education_degree as EducationDegreeType) ===
          EducationDegree.highSchool ||
        (state.editEducation.education_degree as EducationDegreeType) ===
          EducationDegree.vocational
      ) {
        state.editEducation.cumulativeGpa = 0;
      }
    },

    setActionToDisable: (state) => {
      state.pendingState.actionDisable = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEducation.pending, (state) => {
        state.pendingState.dataLoading = true;
        state.pendingState.isRender = false;
      })
      .addCase(getEducation.fulfilled, (state, action) => {
        const educationMap: Education[] = (
          action.payload as ServerEducation[]
        ).map((education) => {
          const formattedDate = new Date(education.graduation_date)
            .toISOString()
            .slice(0, 7);
          return {
            cumulativeGpa: education.cumulative_gpa,
            educationDescription: education.education_description,
            educationDate: formattedDate,
            educationName: education.education_name,
            education_degree: education.education_degree,
            educationId: education.education_id,
            jobHunterId: education.jobHunterId,
          };
        });
        state.educationList = educationMap;
        state.pendingState.dataLoading = false;
        state.pendingState.isRender = true;
      })
      .addCase(getEducation.rejected, (state) => {
        state.pendingState.dataLoading = false;
        state.pendingState.isRender = true;
        toast.error(
          "Failed to get your personal information,please refresh your browser"
        );
      })
      //   Add Education
      .addCase(addNewEducation.pending, (state) => {
        state.pendingState.actionDisable = true;
        state.pendingState.actionLoading = true;
      })

      .addCase(addNewEducation.fulfilled, (state, action) => {
        state.educationList.unshift({
          educationId: action.payload.education_id,
          jobHunterId: action.payload.jobHunterId,
          educationName: action.payload.education_name,
          education_degree: action.payload.education_degree,
          educationDescription: action.payload.education_description,
          cumulativeGpa: Number(action.payload.cumulative_gpa),
          educationDate: action.payload.gradation_date,
        });

        state.pendingState.actionDisable = false;
        state.pendingState.actionLoading = false;
        state.newEducation.educationName = "";
        state.newEducation.educationDescription = "";
        state.newEducation.education_degree = null;
        state.newEducation.cumulativeGpa = 0;
        state.newEducation.educationId = null;
        state.newEducation.jobHunterId = null;

        toast.success("Success add new education");
      })
      .addCase(addNewEducation.rejected, (state) => {
        state.pendingState.actionDisable = false;
        state.pendingState.actionLoading = false;
        toast.error(
          "Its on us. We failed to add new education, please try again or refresh browser"
        );
      })
      .addCase(deleteEducation.pending, (state) => {
        state.pendingState.actionDisable = true;
        state.pendingState.actionLoading = true;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        const deletedData: {
          status: number;
          educationId: number;
        } = action.payload;

        const deletedIndex = state.educationList.findIndex(
          (education) => education.educationId === deletedData.educationId
        );
        if (deletedIndex !== -1) {
          state.educationList.splice(deletedIndex, 1);
        }
        state.pendingState.actionLoading = false;
        state.pendingState.actionDisable = false;
        toast.success("Delete success");
      })
      .addCase(deleteEducation.rejected, (state) => {
        state.pendingState.actionLoading = false;
        state.pendingState.actionDisable = false;
        toast.error(
          "Its on us. We failed to add new education, please try again or refresh browser"
        );
      })
      .addCase(editEducationData.pending, (state) => {
        state.pendingState.actionDisable = true;
        state.pendingState.actionLoading = true;
      })
      .addCase(editEducationData.fulfilled, (state, action) => {
        state.pendingState.actionDisable = false;
        state.pendingState.actionLoading = false;

        const updateEducation = action.payload.education_id;
        const educationIndex = state.educationList.findIndex(
          (edu) => edu.educationId === updateEducation
        );

        if (educationIndex !== -1) {
          state.educationList[educationIndex] = {
            ...state.educationList[educationIndex],
            educationName: action.payload.education_name,
            educationDescription: action.payload.education_description,
            education_degree: action.payload.education_degree,
            cumulativeGpa: action.payload.cumulative_gpa,
            educationDate: new Date(action.payload.graduation_date)
              .toISOString()
              .slice(0, 7),
          };
        }
        toast.success("Success update education");
      })
      .addCase(editEducationData.rejected, (state) => {
        state.pendingState.actionDisable = false;
        state.pendingState.actionLoading = true;
        toast.error(
          `Its on us. We failed to add new education, please try again or refresh browser`
        );
      });
  },
});

export const {
  handleNewInputChange,
  setActionToDisable,
  initEditEducation,
  handleInputEditChange,
} = educationSlice.actions;

export default educationSlice.reducer;
