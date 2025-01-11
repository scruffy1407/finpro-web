import api from "@/pages/api/api";
import { reviewResponse } from "@/models/company.model";
import { toast } from "sonner";
import { InterviewData } from "@/components/Form/FormSetNewInterview";

export class CompanyUtils {
  async getCompanyPageDetail(companyId: number) {
    try {
      const response = await api.get(
        `/api/company/company-detail/${companyId}`,
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return {};
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
    } catch (e) {
      return e.response;
    }
  }

  async getCompanyList(
    companyName: string,
    companyLocation: string,
    currentPage?: number,
    limit?: number,
  ) {
    let queryString = `?page=${currentPage}&limit=${limit || 12}`;

    if (companyName) {
      queryString += `&companyName=${companyName}`;
    }
    if (companyLocation) {
      queryString += `&companyCity=${companyLocation}`;
    }

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
}
