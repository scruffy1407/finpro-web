import api from "@/pages/api/api";
import { ApplyJob, reviewResponse } from "@/models/company.model";
import { toast } from "sonner";

export class CompanyUtils {
  async getCompanyPageDetail(companyId: number) {
    try {
      const response = await api.get(
        `/api/company/company-detail/${companyId}`,
      );
      if (response.status === 200) {
        console.log("SUPER INNER", response.data);
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
      console.log(response);
      if (response.status === 201) {
        return response.status;
      } else {
        console.log("execute");
        return response.data.message;
      }
    } catch (e) {
      console.log(e.response);
      return e.response;
    }
  }

  async getCompanyList(
    companyName: string,
    companyLocation: string,
    currentPage?: number,
    limit?: number,
  ) {
    console.log("UTILS", companyLocation);
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
}
