import type { SubscriptionPlan } from "@/models/subscription";
import Image from "next/image";

export default function PlanHeader({ plan }: { plan: SubscriptionPlan }) {
  return (
    <div className="p-6 border-b border-gray-200">
      <Image
        src={"/logo/MainLogo.svg"}
        alt={"Pathway logo"}
        width={121}
        height={24}
        className={"text-center mb-10"}
      />
      {/*<h1 className={"text-2xl font-bold text-neutral-950 mb-4"}>*/}
      {/*  Confirm Your Subscription*/}
      {/*</h1>*/}
      <div></div>
      <h2 className=" font-mediumtext-neutral-600 mb-2">{plan.title}</h2>
      <div className="mb-4">
        <span className="text-4xl font-extrabold text-neutral-950">
          Rp {plan.price}
        </span>
        <span className="text-gray-600"> /Month</span>
      </div>
    </div>
  );
}
