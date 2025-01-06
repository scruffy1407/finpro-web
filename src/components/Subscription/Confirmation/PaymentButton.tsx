import { Button } from "@/components/ui/button";
import LoadingLoader from "@/components/LoadingLoader";

interface PaymentButtonProps {
  isAgreed: boolean;
  isDisable: boolean;
  isLoading: boolean;
  onPayment: () => void;
}

export default function PaymentButton({
  isAgreed,
  isDisable,
  isLoading,
  onPayment,
}: PaymentButtonProps) {
  return (
    <div className="p-6 bg-gray-50">
      <Button
        onClick={onPayment}
        disabled={!isAgreed || isDisable}
        variant={"primary"}
        className={"w-full"}
      >
        {isLoading ? LoadingLoader() : "Proceed to Payment"}
      </Button>
      <p className="mt-3 text-sm text-gray-500 text-center">
        You will be redirected to our secure payment gateway
      </p>
    </div>
  );
}
