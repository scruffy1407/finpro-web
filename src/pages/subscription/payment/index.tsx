import { useRouter } from "next/router";
import { useState, useEffect } from "react";

type PaymentStatus = "pending" | "finished" | "error";

interface QueryParams {
  order_id?: string;
  status_code?: string;
  transaction_status?: PaymentStatus;
  action?: string;
}

function Payment() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const parsedParams: QueryParams = {};

    for (const [key, value] of urlParams.entries()) {
      if (key === "transaction_status") {
        if (["pending", "finished", "error"].includes(value as PaymentStatus)) {
          parsedParams[key as keyof QueryParams] = value as PaymentStatus;
        } else {
          // Handle invalid transaction_status (e.g., log an error, set a default value)
          parsedParams[key as keyof QueryParams] = undefined;
        }
      } else {
        parsedParams[key as keyof QueryParams] = value;
      }
    }

    setQueryParams(parsedParams);
  }, []);

  const { order_id, status_code, transaction_status, action } = queryParams;

  // Handle different payment statuses and actions
  const renderContent = () => {
    if (!order_id || !status_code || !transaction_status) {
      return (
        <div className="text-center p-4">
          Missing required query parameters.
        </div>
      );
    }

    if (transaction_status === "pending") {
      return (
        <div className="text-center p-4">
          <h2>Payment Pending</h2>
          <p>Your order (ID: {order_id}) is being processed.</p>
        </div>
      );
    } else if (transaction_status === "finished") {
      return (
        <div className="text-center p-4">
          <h2>Payment Successful</h2>
          <p>Your order (ID: {order_id}) has been completed.</p>
        </div>
      );
    } else if (transaction_status === "error") {
      return (
        <div className="text-center p-4">
          <h2>Payment Error</h2>
          <p>An error occurred while processing your order (ID: {order_id}).</p>
        </div>
      );
    }

    return null; // Handle unexpected transaction_status
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {renderContent()}
      {action === "back" && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      )}
    </div>
  );
}

export default Payment;
