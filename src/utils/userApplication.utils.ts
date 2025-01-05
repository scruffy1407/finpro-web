import api from "@/pages/api/api";
// limit: number = 6, // Fetch 10 posts initially, to load more later
//     offset: number = 0,
//     userId: number,
//     status?: string,

export class UserApplication {
  async fetchUserApplication(
    limit: number = 6,
    offset: number = 0,
    token: string,
    status: string,
  ) {
    try {
      const queryString = `?limit=${limit}&offset=${offset}&status=${status}`;
      const response = await api.get(
        `/applyjob/user-application${queryString}`,
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
      console.error(e);
      return [];
    }
  }
}
