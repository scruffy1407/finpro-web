import api from "@/pages/api/api";
import { toast } from "sonner";

export class DeveloperUtils {
  async getUsers(
    token: string,
    subsId: string,
    currentPage?: number,
    limit?: number,
  ) {
    const queryString = `?page=${currentPage}&limit=${limit || 12}&subsId=${subsId || ""}`;
    try {
      const response = await api.get(`/api/dev/get-user${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => status < 500,
      });
      if (response.status === 200) {
        return response?.data;
      } else {
        toast.error(response?.data?.message);
        return [];
      }
    } catch (e) {
      return e;
    }
  }
}
