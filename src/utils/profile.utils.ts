import api from "@/pages/api/api";
import { JobHunterGeneralInfo, CompanyGeneralInfo } from "@/models/auth.model";
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
      const response = await api.get("/api/user/job-hunter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const data: ProfileResponse = response as ProfileResponse;

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return null;
      } else {
        return null;
      }
    }
  }

  async getProfileCompany(token: string) {
    try {
      const response = await api.get("/api/user/company", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return null;
      } else {
        return null;
      }
    }
  }

  async updateInfoJobhunter(token: string, data: JobHunterGeneralInfo) {
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
        }
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

  async updateInfoCompany(token: string, data: CompanyGeneralInfo) {
    const updateData: CompanyGeneralInfo = {
      companyId: Number(data.companyId),
      company_name: data.company_name,
      phone_number: data.phone_number,
      address_details: data.address_details,
      company_description: data.company_description,
      company_city: data.company_city,
      company_province: data.company_province,
      company_industry: data.company_industry,
      company_size: data.company_size,
      cityId: data.cityId ? Number(data.cityId) : undefined,
      provinceId: data.provinceId ? Number(data.provinceId) : undefined,
    };

    try {
      const responseUpdateData = await api.put(
        `/api/user/company/edit-profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  async updateProfileImage(token: string, data: FormData, role: string) {
    let endpoint = "";
    if (role === "jobhunter") {
      endpoint = "api/user/job-hunter/edit-image";
    } else if (role === "company") {
      endpoint = "api/user/company/edit-image";
    } else {
      throw new Error("Invalid user role");
    }

    try {
      const response = await api.put(endpoint, data, {
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

  async getWorkingExperience(token: string, wReview: boolean) {
    try {
      const response = await api.get(
        `api/user/job-hunter/work-experience?review=${wReview}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        }
      );
      if (response.status === 201) {
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
        }
      );
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
        }
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
        `api/user/company/search-company?q=${keyword}`
      );
      if (response.status === 200) {
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
        }
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
        }
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
    try {
      const response = await api.put(
        `api/user/job-hunter/education/edit/${data.educationId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
