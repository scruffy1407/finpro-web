import React, { useState } from "react";
// import type { SubscriptionPlan } from "@/types/subscription";
import PlanHeader from "@/components/Subscription/Confirmation/PlanHeader";
import PaymentButton from "@/components/Subscription/Confirmation/PaymentButton";
import TermsAndConditions from "@/components/Subscription/Confirmation/TermsAndConditions";
import BenefitsList from "@/components/Subscription/Confirmation/BenefitList";
import type { SubscriptionPlan } from "@/models/subscription";
import { toast } from "sonner";
import { PaymentHandler } from "@/utils/payment.utils";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/router";
import { openModalAction } from "@/store/slices/ModalSlice";

export default function ConfirmationCard({ plan }: { plan: SubscriptionPlan }) {
  const paymentHandler = new PaymentHandler();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isAgreed, setIsAgreed] = useState(false);
  const { isLoggedIn, isVerified } = useSelector(
    (state: RootState) => state.auth,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const handlePayment = async () => {
    const token = Cookies.get("accessToken");
    let subscriptionId: number = 1;
    if (!isLoggedIn) {
      dispatch(openModalAction("needToVerifyModal"));
      return;
    }
    if (!isVerified) {
      dispatch(openModalAction("needToVerifyModal"));
      return;
    }
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
        if (response.status === 201) {
          const redirectUrl = response?.data.data.transaction.redirect_url;

          await router.push(`${redirectUrl}`);
        } else if (response.status === 400) {
          setIsLoading(false);
          setIsDisable(false);
          toast.error(response.response.data.message);
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
    } catch (err: unknown) {
      setIsLoading(false);
      setIsDisable(false);
      console.error(err);
      toast.error(
        "Failed to procced the payment, please try again or refresh your browser",
      );
    }
  };

  return (
    <>
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
    </>
  );
}
