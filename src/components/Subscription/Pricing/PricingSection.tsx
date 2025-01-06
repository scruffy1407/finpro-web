import { PricingCard } from "./PricingCard";
import { planData } from "@/data/subscription.data";

export function PricingSection() {
  return (
    <div className="grid gap-12  lg:grid-cols-2 lg:gap-12">
      <PricingCard
        subParam={planData.standard.subsParam}
        {...planData.standard}
      />
      <PricingCard
        subParam={planData.professional.subsParam}
        {...planData.professional}
        isPopular
      />
    </div>
  );
}
