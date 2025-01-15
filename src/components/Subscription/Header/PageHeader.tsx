import { Trophy, Users } from "lucide-react";
import { TrustIndicator } from "./TrustIndicator";

export function PageHeader() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
        Choose Your Plan
      </h1>
      <p className="mt-5 text-neutral-600">
        Select the perfect plan for your needs and start building your career
        today
      </p>

      <div className="mt-8 flex justify-center gap-x-8">
        <TrustIndicator Icon={Trophy} text="30-day money-back guarantee" />
        <TrustIndicator Icon={Users} text="Trusted by thousands" />
      </div>
    </div>
  );
}
