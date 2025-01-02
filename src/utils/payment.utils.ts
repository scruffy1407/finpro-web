import api from "@/pages/api/api";
import { AxiosError } from "axios";

export class PaymentHandler {
  isValidOrderString(orderString: string): boolean {
    // Check if the orderString contains the keyword "PATH"
    const hasPathKeyword = orderString.includes("PATH");

    // Check if the orderString length is greater than 14
    const hasSufficientLength = orderString.length > 14;

    // Return true if both conditions are met
    return hasPathKeyword && hasSufficientLength;
  }

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
        return response;
      } else {
        return response;
      }
    } catch (err: any) {
      return err;
    }
  }

  async verifyPayment(
    token: string,
    pass: "settlement" | "pending",
    orderId: string,
  ) {
    try {
      const response = await api.post(
        `/api/user/job-hunter/verify-payment/${orderId}`,
        {
          pass: pass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("RESPONSE", response);
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    } catch (e: any) {
      return e;
    }
  }
}
