import api from "@/pages/api/api";
import { reviewResponse } from "@/models/company.model";

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
}
