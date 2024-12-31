import { useState } from "react";
// import type { SubscriptionPlan } from "@/types/subscription";
import PlanHeader from "@/components/Subscription/Confirmation/PlanHeader";
import PaymentButton from "@/components/Subscription/Confirmation/PaymentButton";
import TermsAndConditions from "@/components/Subscription/Confirmation/TermsAndConditions";
import BenefitsList from "@/components/Subscription/Confirmation/BenefitList";
import type { SubscriptionPlan } from "@/models/subscription";
import { toast } from "sonner";
import { PaymentHandler } from "@/utils/payment.utils";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";

export default function ConfirmationCard({ plan }: { plan: SubscriptionPlan }) {
  const paymentHandler = new PaymentHandler();
  const router = useRouter();

  const [isAgreed, setIsAgreed] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const handlePayment = async () => {
    // TODO: Implement Midtrans payment integration
    console.log("Proceeding to payment for plan:");
    const token = Cookies.get("accessToken");
    let subscriptionId: number = 1;
    if (plan.subsParam === "standard-plan") {
      subscriptionId = 2;
    } else if (plan.subsParam === "professional-plan") {
      subscriptionId = 3;
    }
    try {
      if (isLoggedIn && token) {
        setIsLoading(true);
        setIsDisable(true);
        const response = await paymentHandler.subscribePlan(
          token as string,
          subscriptionId,
        );
        console.log(response);
        if (response.data.status === 200) {
          console.log(response.data.data.transaction);
          const redirectUrl = response.data.data.transaction.redirect_url;

          await router.push(`${redirectUrl}`);
        } else {
          setIsLoading(false);
          setIsDisable(false);
          toast.error(
            "Failed to procced the payment, please try again or refresh your browser",
          );
        }
      } else {
        setIsLoading(false);
        setIsDisable(false);
        toast.error("You need to login first to subscribe the plan");
      }
    } catch (err: any) {
      setIsLoading(false);
      setIsDisable(false);
      toast.error(
        "Failed to procced the payment, please try again or refresh your browser",
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <PlanHeader plan={plan} />
      <BenefitsList benefits={plan.features} />
      <TermsAndConditions isAgreed={isAgreed} onAgreeChange={setIsAgreed} />
      <PaymentButton
        isLoading={isLoading}
        isDisable={isDisable}
        isAgreed={isAgreed}
        onPayment={handlePayment}
      />
    </div>
  );
}
