import api from "@/pages/api/api";

export interface LocationResponse {
  status: number;
  data?: any;
  message?: string;
  detail?: string;
}

export class LocationHandler {
  async getAllProvince() {
    try {
      const response: LocationResponse = await api.get(
        "api/location/get-province",
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return response.message;
      }
    } catch (e: any) {
      return e.message;
    }
  }

  async getCity(provinceId: number) {
    try {
      const response: LocationResponse = await api.get(
        `api/location/get-city/${provinceId}`,
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return response.message;
      }
    } catch (e: any) {
      return e.message;
    }
  }

  async getUserLocation(id: number) {
    try {
      const response: LocationResponse = await api.get(
        `api/location/get-user-location/${id}`,
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return response.message;
      }
    } catch (e: any) {
      return e.message;
    }
  }
}
