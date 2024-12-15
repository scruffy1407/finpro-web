import api from "@/pages/api/api";
import { JobHunterGeneralInfo, UpdateImage } from "@/models/auth.model";

export interface ProfileResponse {
  status: number;
  data?: any;
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
    } catch (e: any) {
      return e.message;
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
    } catch (e: any) {
      return e.message;
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
    } catch (e: any) {
      return e.message;
    }
  }
}
