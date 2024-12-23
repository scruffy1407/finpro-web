import { PricingCard } from "./PricingCard";

const PRICING_DATA = {
  standard: {
    title: "Standard Plan",
    price: "25.000",
    description: "Perfect for those who want to start their career journey",
    features: [
      "Generate professional CV",
      "2 Skill assessments included",
      "Email support",
    ],
  },
  professional: {
    title: "Professional Plan",
    price: "100.000",
    description: "Ideal for serious job seekers who want the best results",
    features: [
      "Generate unlimited professional CVs",
      "Unlimited skill assessments",
      "Priority job application review",
      "Priority support 24/7",
    ],
  },
};

export function PricingSection() {
  return (
    <div className="grid gap-12  lg:grid-cols-2 lg:gap-12">
      <PricingCard {...PRICING_DATA.standard} />
      <PricingCard {...PRICING_DATA.professional} isPopular />
    </div>
  );
}
