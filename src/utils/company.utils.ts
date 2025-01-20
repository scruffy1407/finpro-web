import api from "@/pages/api/api";
import { reviewResponse } from "@/models/company.model";
import { toast } from "sonner";
import axios from "axios";

import { InterviewData } from "@/components/Form/FormSetNewInterview";

export class CompanyUtils {
  async getCompanyPageDetail(companyId: number) {
    try {
      const response = await api.get(
        `/api/company/company-detail/${companyId}`,
        {
          validateStatus: (status) => status < 500,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }

  async createCompanyReview(token: string, data: reviewResponse) {
    try {
      const response = await api.post("/api/user/job-hunter/review", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }

  validateReviewData(data: reviewResponse) {
    if (
      data.reviewTitle === "" ||
      data.reviewDescription === "" ||
      data.careerPathRating === 0 ||
      data.facilityRating === 0 ||
      data.culturalRating === 0 ||
      data.workLifeBalanceRating === 0 ||
      data.workExperienceId === 0
    ) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  }

  async applyJob(token: string, data: FormData) {
    try {
      const response = await api.post("/applyjob/apply", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        return response.status;
      } else {
        return response.data.message;
      }
    } catch (e: any) {
      return e.response;
    }
  }

  async applyJobSub(token: string, data: FormData) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/applyjobtest/applyjobtest`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        // Check for 200 instead of 201
        return response.status;
      } else {
        return response.data.message;
      }
    } catch (error) {
      const err = error as Error;
      return err.message;
    }
  }

  async getCompanyList(
    companyName: string,
    companyLocation: string,
    currentPage?: number,
    limit?: number,
  ) {
    const queryString = `?page=${currentPage}&limit=${limit || 12}&companyName=${companyName || ""}&companyCity=${companyLocation}`;

    try {
      const response = await api.get(`/api/company/company${queryString}`);
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (e) {
      return e;
    }
  }

  async verifyApply(token: string, jobId: number, apply: string) {
    const queryString = `?job=${jobId}&apply=${apply}`;
    try {
      const response = await api.get(`/applyjob/verify-apply${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async setInterview(token: string, interviewData: InterviewData) {
    try {
      const response = await api.post(
        "/api/company/application/interview",
        interviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        return response.data;
      } else {
        return [];
      }
    } catch (e) {
      return e;
    }
  }

  async updateInterview(token: string, interviewData: InterviewData) {
    try {
      const response = await api.put(
        "/api/company/application/interview",
        interviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (e) {
      return e;
    }
  }
  async getApplicantDetail(applicantId: number, token: string) {
    console.log(applicantId, "ID DI SERVICE")
    try {
      const response = await api.get(
        `/applyjob/applicant-detail?applicantId=${applicantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) => status < 500,
        },
      );
      if (response.status == 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        toast.error(response?.data?.message);
        return {
          success: false,
        };
      }
    } catch (error: any) {
      toast.error("Something Went Wrong, refresh your browser");
      return {
        success: false,
        message: error.message,
      };
    }
  }
}