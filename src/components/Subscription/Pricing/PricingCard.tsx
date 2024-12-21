import { PricingFeature } from "./PricingFeature";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/router";
import { openModalAction } from "@/store/slices/ModalSlice";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  isPopular,
}: PricingCardProps) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  console.log(isLoggedIn);

  function handleClick() {
    if (!isLoggedIn) {
      dispatch(openModalAction("needToLoginModal"));
    } else {
      router.push("/subscription/confirmation");
    }
  }

  return (
    <div
      className={`relative rounded-2xl border p-8 ${isPopular ? "shadow-2xl" : ""} bg-white`}
    >
      {isPopular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-blue-500 px-3 py-2 text-sm font-medium text-white text-center">
          Most Popular
        </div>
      )}
      <div className="mb-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>
      <div className="mb-5">
        <span className="text-4xl font-bold">IDR {price}</span>
        <span className="text-gray-500"> /month</span>
      </div>

      <Button
        onClick={handleClick}
        variant={isPopular ? "primary" : "outline"}
        className={"w-full"}
      >
        {isLoggedIn ? "Subscribe Now" : "Get Started"}
      </Button>

      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <PricingFeature key={index} feature={feature} />
        ))}
      </ul>
    </div>
  );
}
