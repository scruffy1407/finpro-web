import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileHandler } from "@/utils/profile.utils";
import { toast } from "sonner";
import { LocationHandler } from "@/utils/location.utils";
import { LocationOption } from "@/utils/interface";
import {
  CityItem,
  JobHunterGeneralInfoData,
  locationList,
  ProvinceItem,
} from "@/models/auth.model";
import { SingleValue } from "react-select";

interface pendingState {
  dataLoading: boolean;
  isRender: boolean;
  actionLoading: boolean;
  actionDisable: boolean;
  actionLoadingLocation: boolean;
  actionDisableLocation: boolean;
}
interface UserLocation {
  cityId: number | undefined;
  provinceId: number | undefined;
}

interface JobHunterGeneralInfo {
  jobHunterId: string | number;
  name: string;
  dob: string | null | Date; // date only when to hit an api
  gender: "male" | "female" | "other" | undefined;
  locationCity: string | null;
  locationProvince: string | null;
  cityId: undefined | number;
  provinceId: undefined | number;
  expectedSalary: string | number | null;
  summary: string;
  pendingState: pendingState;
  listCity: locationList[];
  listProvince: locationList[];
  userLocation: UserLocation;
  validApply: boolean;
}
const profileHandler = new ProfileHandler();
const locationHandler = new LocationHandler();

const initialState: JobHunterGeneralInfo = {
  name: "",
  dob: null,
  jobHunterId: 0,
  expectedSalary: null,
  locationProvince: null,
  locationCity: null,
  gender: undefined,
  cityId: undefined,
  provinceId: undefined,
  summary: "",
  pendingState: {
    actionLoadingLocation: false,
    actionDisableLocation: false,
    actionLoading: false,
    actionDisable: false,
    dataLoading: false,
    isRender: false,
  },
  listCity: [],
  listProvince: [],
  userLocation: {
    cityId: undefined,
    provinceId: undefined,
  },
  validApply: false,
};

function checkField(data: JobHunterGeneralInfo) {
  return (
    data.name === "" ||
    data.dob === null ||
    data.expectedSalary === null ||
    data.expectedSalary === 0 ||
    data.cityId === undefined ||
    data.provinceId === undefined ||
    data.gender === undefined
  );
}

function applyValidity(data: JobHunterGeneralInfo) {
  return (
    data.name === "" ||
    data.dob === null ||
    data.expectedSalary === null ||
    data.expectedSalary === 0 ||
    data.cityId === undefined ||
    data.gender === undefined
  );
}

const handleInputChange = (state: any, action: any, targetObject: any) => {
  const { name, value } = action.payload;

  switch (name) {
    case "name":
      targetObject.name = value;
      break;
    case "expectedSalary":
      targetObject.expectedSalary = value;
      break;
    case "gender":
      targetObject.gender = value;
      break;
    case "dob":
      targetObject.dob = value
        ? new Date(value).toISOString().split("T")[0]
        : null; // Store as ISO string
      break;
    default:
      break;
  }

  state.pendingState.actionDisable = checkField(targetObject);
};

export const handleGetUseLocation = createAsyncThunk(
  "user/get-user-location",
  async (cityId: number) => {
    try {
      const response = await locationHandler.getUserLocation(cityId);
      return response.data;
    } catch (e) {
      console.error(e)
      return {};
    }
  },
);

export const handleGetProvince = createAsyncThunk(
  "user/get-province",
  async () => {
    try {
      const response = await locationHandler.getAllProvince();
      const mappedProvinces: LocationOption[] = response.data.map(
        (province: ProvinceItem) => ({
          value: province.province_id,
          label: province.name,
        }),
      );
      return mappedProvinces;
    } catch (e) {
      return [];
    }
  },
);

export const handleGetcity = createAsyncThunk(
  "user/get-user-city",
  async (provinceId: number) => {
    try {
      const response = await locationHandler.getCity(provinceId);
      const mappedCity: LocationOption[] = response.data.map(
        (city: CityItem) => ({
          value: city.city_id,
          label: city.name,
        }),
      );
      return mappedCity;
    } catch (e) {
      return [];
    }
  },
);

export const updateUserGeneralInfo = createAsyncThunk(
  "user/updateGeneralInfo",
  async (data: { token: string; generalInfo: JobHunterGeneralInfoData }) => {
    try {
      const response = await profileHandler.updateInfoJobhunter(
        data.token as string,
        data.generalInfo,
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return null; // Handle API errors
      }
    } catch (error) {
      return null; // Handle API errors
    }
  },
);

export const getGeneralInfo = createAsyncThunk(
  "user/general-info",
  async (token: string) => {
    try {
      const response = await profileHandler.getProfileJobhunter(
        token as string,
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
);

const generalInfoSlice = createSlice({
  name: "generalInfo",
  initialState,
  reducers: {
    handleProvinceChange: (
      state,
      action: PayloadAction<SingleValue<locationList> | null>,
    ) => {
      state.locationProvince = action.payload?.label as string;
      state.provinceId = Number(action.payload?.value);
      state.locationCity = null;
      state.cityId = undefined;
      state.pendingState.actionDisable = checkField(state);
    },
    handleCityChange: (
      state,
      action: PayloadAction<SingleValue<locationList> | null>,
    ) => {
      state.locationCity = action.payload?.label as string;
      state.cityId = action.payload?.value as number;
      state.pendingState.actionDisable = checkField(state);
    },
    validateField: (state) => {
      state.validApply = checkField(state);
    },
    handleUpdateInputChange: (state, action) => {
      handleInputChange(state, action, state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetUseLocation.pending, (state) => {
        state.pendingState.actionDisableLocation = true;
        state.pendingState.actionLoadingLocation = true;
        state.pendingState.dataLoading = true;
      })
      .addCase(handleGetUseLocation.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.pendingState.actionDisableLocation = false;
          state.pendingState.actionLoadingLocation = false;
          state.userLocation.cityId = action.payload.cityId || undefined;
          state.userLocation.provinceId =
            action.payload.provinceId || undefined;
          state.cityId = action.payload.city_id || undefined;
          state.provinceId = action.payload.provinceId || undefined;
          state.pendingState.dataLoading = false;
        }
      })
      .addCase(handleGetUseLocation.rejected, (state) => {
        toast.error("Failed to get location information");
        state.pendingState.dataLoading = false;
      })
      .addCase(handleGetProvince.fulfilled, (state, action) => {
        state.listProvince = action.payload;
      })
      .addCase(handleGetProvince.rejected, () => {
        toast.error("Failed to get province location");
      })
      .addCase(handleGetcity.fulfilled, (state, action) => {
        state.listCity = action.payload;
      })
      .addCase(handleGetcity.rejected, () => {
        toast.error("Failed to get city location");
      })
      .addCase(getGeneralInfo.pending, (state) => {
        state.pendingState.dataLoading = true;
        state.pendingState.isRender = false;
      })
      .addCase(getGeneralInfo.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.locationCity = action.payload.locationCity || "";
        state.locationProvince = action.payload.locationProvince || "";
        state.expectedSalary = action.payload.expectedSalary;
        state.summary = action.payload.summary;
        state.gender = action.payload.gender;
        state.cityId = action.payload.cityId || undefined;
        state.provinceId = state.userLocation.provinceId || undefined;
        state.dob = new Date(action.payload.dob).toISOString().split("T")[0];
        state.pendingState.isRender = true;
        state.validApply = !applyValidity(state);
      })
      .addCase(updateUserGeneralInfo.pending, (state) => {
        state.pendingState.actionLoading = true;
        state.pendingState.actionDisable = true;
      })
      .addCase(updateUserGeneralInfo.fulfilled, (state, action) => {
        toast.success("Successfully updated user information");
        state.pendingState.actionLoading = false;
        state.pendingState.actionDisable = false;
      })
      .addCase(updateUserGeneralInfo.rejected, (state, action) => {
        state.pendingState.actionLoading = false;
        state.pendingState.actionDisable = false;
        toast.error("Sorry, failed to update information. please try again");
      });
  },
});

export const {
  validateField,
  handleProvinceChange,
  handleCityChange,
  handleUpdateInputChange,
} = generalInfoSlice.actions;
export default generalInfoSlice.reducer;
