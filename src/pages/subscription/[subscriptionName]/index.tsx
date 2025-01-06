import ConfirmationCard from "@/components/Subscription/ConfirmationCard";
import { useRouter } from "next/router";
import { planData } from "@/data/subscription.data";
import { useEffect, useState } from "react";
import type { SubscriptionPlan } from "@/models/subscription";
import { AuthHandler } from "@/utils/auth.utils";

export default function ConfirmationPage() {
  // Using dummy data instead of database
  const authHandler = new AuthHandler();
  const pagePermission = "jobhunter";
  authHandler.authorizeUser(pagePermission);
  const router = useRouter();
  const { subscriptionName } = router.query;
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    if (subscriptionName) {
      // Validate subscriptionName against available plans
      const validPlan = Object.values(planData).find(
        (plan: SubscriptionPlan) => {
          console.log("PLAN", plan);
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
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <ConfirmationCard plan={plan} />
      </div>
    </div>
  ) : (
    // Render loading state or handle invalid subscriptionName
    <div>Loading...</div>
  );
}
