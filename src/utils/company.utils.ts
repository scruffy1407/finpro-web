import api from "@/pages/api/api";

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
}
