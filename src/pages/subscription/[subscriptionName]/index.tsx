import ConfirmationCard from "@/components/Subscription/ConfirmationCard";
import { useRouter } from "next/router";
import { planData } from "@/data/subscription.data";
import React, { useEffect, useState } from "react";
import type { SubscriptionPlan } from "@/models/subscription";
import { AuthHandler } from "@/utils/auth.utils";
import { closeModalAction } from "@/store/slices/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import VerifyEmailModal from "@/components/Modal/VerifyEmailModal";
import ModalContainer from "@/components/Modal/ModalContainer";
import { Button } from "@/components/ui/button";

export default function ConfirmationPage() {
  // Using dummy data instead of database
  const authHandler = new AuthHandler();
  const pagePermission = "jobhunter";
  authHandler.authorizeUser(pagePermission);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { subscriptionName } = router.query;
  const callbackPath = `/auth/login/jobhunter?callback=${router.pathname}`;

  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };
  function handleRedirect() {
    router.push(callbackPath);
  }

  useEffect(() => {
    if (subscriptionName) {
      // Validate subscriptionName against available plans
      const validPlan = Object.values(planData).find(
        (plan: SubscriptionPlan) => {
          return plan.subsParam === subscriptionName;
        },
      );

      // Redirect to notFound if subscriptionName is invalid
      if (!validPlan) {
        router.push("/subscription");
      }
      setPlan(validPlan as SubscriptionPlan);
    }
  }, [subscriptionName]);

  return plan ? (
    <>
      <ModalContainer
        isOpen={currentModalId === "needToVerifyModal"}
        onClose={handleCloseModal}
      >
        <VerifyEmailModal />
      </ModalContainer>
      <ModalContainer
        isOpen={currentModalId === "needToLoginModal"}
        onClose={handleCloseModal}
      >
        <div className={"flex flex-col gap-6"}>
          <div className={"flex flex-col gap-2 text-center"}>
            <h2 className="text-2xl font-bold text-neutral-950">
              Unlock Your Career Potential
            </h2>
            <p className={`text-neutral-600 text-sm`}>
              {`Don't miss out on your next big opportunity. Login now to explore
              10K+ jobs from 200+ top companies. Your dream career is just a
              click away.`}
            </p>
          </div>
          <div className={"flex gap-4"}>
            <Button
              className={`w-full`}
              variant={"outline"}
              onClick={() => router.push("/auth/register/jobhunter")}
            >
              Register
            </Button>
            <Button
              className={`w-full`}
              variant={"primary"}
              onClick={handleRedirect}
            >
              Login
            </Button>
          </div>
        </div>
      </ModalContainer>
      <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <ConfirmationCard plan={plan} />
        </div>
      </div>
    </>
  ) : (
    // Render loading state or handle invalid subscriptionName
    <div>Loading...</div>
  );
}
