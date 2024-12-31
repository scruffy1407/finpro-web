import api from "@/pages/api/api";

export class PaymentHandler {
  async subscribePlan(token: string, subscriptionId: number) {
    try {
      const response = await api.post(
        `/api/user/job-hunter/subscription/${subscriptionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        return response.data;
      } else {
        return response;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
