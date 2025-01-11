import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PaymentHandler } from "@/utils/payment.utils";
import Cookies from "js-cookie";
import LoadingLoader from "@/components/LoadingLoader";
import { AuthHandler } from "@/utils/auth.utils";

type PaymentStatus = "pending" | "settlement" | "error";

function Payment() {
  // Using dummy data instead of database
  const authHandler = new AuthHandler();
  const pagePermission = "jobhunter";
  authHandler.authorizeUser(pagePermission);

  const paymentHandler = new PaymentHandler();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [orderNotFound, setOrderNotFound] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [validStatus, setValidStatus] = useState<string>("");
  const [statusCode, setStatusCode] = useState("");

  const initialRender = useRef(true);

  useEffect(() => {
    const orderIdParam = searchParams.get("order_id");
    const transactionStatusParam = searchParams.get("transaction_status");
    const statusCodeParam = searchParams.get("status_code");

    if (orderIdParam) setOrderId(orderIdParam);
    if (transactionStatusParam) setTransactionStatus(transactionStatusParam);
    if (statusCodeParam) setStatusCode(statusCodeParam);

    if (!initialRender.current) {
      // Handle missing or invalid parameters
      if (!orderId || !transactionStatus || !statusCode) {
        // Handle missing query parameters (e.g., redirect to an error page)
        return;
      }
    } else {
      initialRender.current = false;
    }
  }, [searchParams]);

  async function handleValidatePayment() {
    const token = Cookies.get("accessToken");
    setIsLoading(true);

    if (transactionStatus === "settlement" && token) {
      const response = await paymentHandler.verifyPayment(
        token as string,
        "settlement",
        orderId,
      );
      setValidStatus(response.data.data);
      if (response.status === 400) {
        setOrderNotFound(true);
      }
    } else if (transactionStatus === "pending" && token) {
      const response = await paymentHandler.verifyPayment(
        token as string,
        "pending",
        orderId,
      );
      setValidStatus(response.data.data);

      if (response.status === 400) {
        setOrderNotFound(true);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (orderId) {
      handleValidatePayment();
    }
  }, [orderId]);

  const renderContent = () => {
    if (
      !orderId ||
      !statusCode ||
      !transactionStatus ||
      !paymentHandler.isValidOrderString(orderId) ||
      orderNotFound
    ) {
      return (
        <div className="p-10 rounded-2xl flex flex-col gap-10 bg-white">
          <Image
            src={"/logo/MainLogo.svg"}
            alt={"Pathway logo"}
            width={121}
            height={24}
          />
          <div>
            <h2 className="text-7xl mb-6 text-neutral-950 font-bold">404</h2>
            <p className={"text-lg text-neutral-600"}>
              {orderNotFound
                ? "No order was found with that ID. Please return to the homepage."
                : "Page Not Found. Return to Homepage"}
            </p>
          </div>

          <Button
            onClick={() => router.push("/")}
            variant={"primary"}
            size={"default"}
          >
            Back to homepage
          </Button>
        </div>
      );
    }

    if ((validStatus || transactionStatus) === "pending") {
      return (
        <div className="p-10 w-full rounded-2xl flex flex-col gap-10 bg-white">
          <Image
            src={"/logo/MainLogo.svg"}
            alt={"Pathway logo"}
            width={121}
            height={24}
          />
          <h2 className="text-2xl text-neutral-950 font-bold">
            Please complete your payment
          </h2>
          <div className={"grid grid-cols-2 gap-10"}>
            <div>
              <p className={"text-xs text-neutral-600 mb-2"}>Your Order ID</p>
              <h4 className={"text-lg font-bold text-neutral-950"}>
                {orderId}
              </h4>
            </div>
            <div>
              <p className={"text-xs text-neutral-600 mb-2"}>Total Ammount</p>
              <h4 className={"text-lg font-bold text-neutral-950"}>
                Rp 25.000
              </h4>
            </div>
          </div>

          <Button variant={"primary"} size={"default"}>
            Complete Payment
          </Button>
        </div>
      );
    } else if ((validStatus || transactionStatus) === "settlement") {
      return (
        <div className="p-10 rounded-2xl flex flex-col gap-10 bg-white">
          <Image
            src={"/logo/MainLogo.svg"}
            alt={"Pathway logo"}
            width={121}
            height={24}
          />
          <h2 className="text-2xl text-neutral-950 font-bold">
            Payment Successfully
          </h2>
          <div className={"grid grid-cols-2 gap-10"}>
            <div>
              <p className={"text-xs text-neutral-600 mb-2"}>Your Order ID</p>
              <h4 className={"text-lg font-bold text-neutral-950"}>
                {orderId}
              </h4>
            </div>
            <div>
              <p className={"text-xs text-neutral-600 mb-2"}>Total Ammount</p>
              <h4 className={"text-lg font-bold text-neutral-950"}>
                Rp 25.000
              </h4>
            </div>
          </div>
          <p>
            You can now use exclusive features like generating a CV and
            improving your skills with our skill assessment test
          </p>
          <div className={"grid grid-cols-2 gap-6"}>
            <Button
              onClick={() => router.push("/profile/user")}
              className={
                "h-fit w-full p-4 bg-white border border-neutral-200 text-neutral-950 hover:text-blue-500 hover:bg-blue-50 justify-start whitespace-normal"
              }
            >
              <div className={"flex flex-col gap-1 text-left w-full"}>
                <h6 className={"font-bold"}>Get Your ATS-Optimized CV Now</h6>
                <p className={"text-xs w-full hover:text-opacity-75"}>
                  Easily land more interviews with an ATS-friendly CV.
                </p>
              </div>
            </Button>
            <Button
              onClick={() => router.push("/assessment")}
              className={
                "h-fit w-full p-4 bg-white border border-neutral-200 text-neutral-950 hover:text-blue-500 hover:bg-blue-50 justify-start whitespace-normal"
              }
            >
              <div className={"flex flex-col gap-1 text-left w-full"}>
                <h6 className={"font-bold"}>Take Your Skills Assessment Now</h6>
                <p className={"text-xs w-full hover:text-opacity-75"}>
                  Identify your strengths and areas for improvement.
                </p>
              </div>
            </Button>
          </div>
        </div>
      );
    } else if (transactionStatus === "error") {
      return (
        <div className="text-center p-4">
          <h2>Payment Error</h2>
          <p>An error occurred while processing your order (ID: {orderId}).</p>
        </div>
      );
    }

    return (
      <div className="p-10 rounded-2xl flex flex-col gap-10 bg-white">
        <Image
          src={"/logo/MainLogo.svg"}
          alt={"Pathway logo"}
          width={121}
          height={24}
        />
        <div>
          <h2 className="text-7xl mb-6 text-neutral-950 font-bold">404</h2>
          <p className={"text-lg text-neutral-600"}>
            Page Not Found. Return to Homepage
          </p>
        </div>

        <Button
          onClick={() => router.push("/")}
          variant={"primary"}
          size={"default"}
        >
          Back to homepage
        </Button>
      </div>
    ); // Handle unexpected transaction_status
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col justify-center items-center">
      {isLoading ? LoadingLoader() : renderContent()}
    </div>
  );
}

export default Payment;
