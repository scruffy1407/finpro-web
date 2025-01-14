import React, { useEffect, useState } from "react";
import { JobStatus } from "@/models/applicant.model";
import { PaymentHandler } from "@/utils/payment.utils";
import Cookies from "js-cookie";
import { AuthHandler } from "@/utils/auth.utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { format } from "date-fns";
import { formatNumber } from "@/utils/formater.utils";

interface SubscriptionProps {
  orderDate?: string;
  orderId: string;
  subscriptionName: string;
  amount: number;
  paymentLink: string;
  statusPayment: string;
}

function ManageSubscription() {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser("jobhunter");
  const paymentHandler = new PaymentHandler();
  const token = Cookies.get("accessToken");
  const [listPayment, setListPayment] = useState<SubscriptionProps[]>([]);
  const { isLoggedIn, user_role } = useSelector(
    (state: RootState) => state.auth,
  );

  async function fetchTransaction(token: string) {
    const response = await paymentHandler.getTransaction(token);
    const mappedData: SubscriptionProps[] = [];

    response.data.map((transaction) => {
      mappedData.push({
        amount: transaction.transaction_amount,
        orderId: transaction.invoice_transaction,
        paymentLink: transaction.redirect_link,
        statusPayment: transaction.transaction_status,
        subscriptionName: transaction.subscriptionTable.subscription_type,
      });
    });
    setListPayment(mappedData);
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <div className={"px-3 py-1 bg-gray-100 rounded-2xl w-fit text-sm"}>
            Pending
          </div>
        );
      case "failed":
        return (
          <div
            className={
              "px-3 py-1 bg-red-100 text-neutral-950 rounded-2xl w-fit text-sm"
            }
          >
            Failed
          </div>
        );
      case "success":
        return (
          <div
            className={
              "px-3 py-1 bg-green-100 text-neutral-950 rounded-2xl w-fit text-sm"
            }
          >
            Success
          </div>
        );
    }
  };

  useEffect(() => {
    if (isLoggedIn && user_role === "jobhunter") {
      fetchTransaction(token as string);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar pageRole={"jobhunter"} />
      <section
        className={"max-w-screen-xl mx-auto bg-white p-6 mt-10 rounded-2xl"}
      >
        <h1 className={"font-bold text-2xl mb-3"}>Subscription History</h1>
        <p className={"text-sm text-neutral-600 mb-10"}>
          Track all your latest subscriptions
        </p>

        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold  text-neutral-600 uppercase tracking-wider bg-gray-50 rounded-tl-xl">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold  text-neutral-600 uppercase tracking-wider bg-gray-50">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold  text-neutral-600 uppercase tracking-wider bg-gray-50">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold  text-neutral-600 uppercase tracking-wider bg-gray-50">
                Payment Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold  text-neutral-600 uppercase tracking-wider bg-gray-50 rounded-tr-xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listPayment.map((transaction) => (
              <tr key={transaction.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {transaction.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.subscriptionName} Plan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Rp {formatNumber(transaction.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.paymentLink ? (
                    <a
                      href={transaction.paymentLink}
                      className={"text-blue-500 hover:text-blue-700 underline"}
                    >
                      Pay Now
                    </a>
                  ) : (
                    "Link not available"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatus(transaction.statusPayment)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default ManageSubscription;
