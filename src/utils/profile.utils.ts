import api from "@/pages/api/api";
import { JobHunterGeneralInfo } from "@/models/auth.model";
import { WorkingExperience } from "@/models/profile.mode";
import { AxiosError } from "axios";
import { Education } from "@/store/slices/EducationSlice";

export interface ProfileResponse {
  status: number;
  data?: unknown;
  message?: string;
  detail?: string;
}

export class ProfileHandler {
  async getProfileJobhunter(token: string) {
    try {
      const response: ProfileResponse = await api.get("/api/user/job-hunter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return response.message;
      }
    } catch (err: any) {
      return err;
    }
  }

  async updateInfoJobhunter(token: string, data: JobHunterGeneralInfo) {
    console.log(data);
    const updateData: JobHunterGeneralInfo = {
      jobHunterId: Number(data.jobHunterId),
      name: data.name,
      gender: data.gender,
      dob: data.dob ? new Date(data.dob) : null,
      cityId: data.cityId ? Number(data.cityId) : undefined,
      provinceId: data.provinceId ? Number(data.provinceId) : undefined,
      expectedSalary: data.expectedSalary ? Number(data.expectedSalary) : null,
      locationProvince: data.locationProvince ? data.locationProvince : null,
      locationCity: data.locationCity ? data.locationCity : null,
      summary: data.summary,
    };

    try {
      const responseUpdateData = await api.put(
        `/api/user/job-hunter/edit-profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (responseUpdateData.status === 200) {
        return responseUpdateData.data;
      } else {
        return responseUpdateData;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async updateProfileImage(token: string, data: FormData) {
    console.log("DATA UPLOAD", data);
    try {
      const response = await api.put("api/user/job-hunter/edit-image", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async getWorkingExperience(token: string) {
    try {
      const response = await api.get("api/user/job-hunter/work-experience", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (e: unknown) {
      return e;
    }
  }

  async createWorkingExperience(token: string, data: WorkingExperience) {
    try {
      const response = await api.post(
        "api/user/job-hunter/work-experience/create-new",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        console.log(response);
        return response.data;
      } else {
        return response;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async editWorkingExperience(token: string, data: WorkingExperience) {
    try {
      const response = await api.put(
        `api/user/job-hunter/work-experience/edit/${data.workingExperienceId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      if (response.status === 204) {
        return response.status;
      } else {
        return response;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async deleteWorkingExperience(token: string, workingExperienceId: number) {
    try {
      const response = await api.delete(
        `api/user/job-hunter/work-experience/delete/${workingExperienceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.status;
      } else {
        return response;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async searchCompany(keyword: string) {
    try {
      const response = await api.get(
        `api/user/company/search-company?q=${keyword}`,
      );
      if (response.status === 200) {
        console.log(response);
        return response.data;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }
  async getCompanyValue(companyId: number) {
    try {
      const response = await api.get(`/api/user/company/get-data/${companyId}`);
      if (response.status === 200) {
        console.log(response);
        return response.data;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async getEducation(token: string) {
    try {
      const response = await api.get("/api/user/job-hunter/education", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("EDUCATION", response);
      if (response.status === 200) {
        return response.data;
      } else {
        return response.data.message;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async addNewEducation(token: string, data: Education) {
    const createData: Education = {
      ...data,
      educationDate: new Date(data.educationDate),
    };
    try {
      const response = await api.post(
        "api/user/job-hunter/education/create-new",
        createData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        return response.data;
      } else {
        return response.data.message;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async deleteEducation(token: string, education_id: number) {
    try {
      const response = await api.delete(
        `api/user/job-hunter/education/delete/${education_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return response.data.message;
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      return error.message;
    }
  }

  async editEducation(token: string, data: Education) {
    console.log();
    try {
      const response = await api.put(
        `api/user/job-hunter/education/edit/${data.educationId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      if (response.status === 200) {
        return response.data;
      } else {
        return response.data.message;
      }
    } catch (err) {
      const error = err as AxiosError;
      return error.message;
    }
  }
}
