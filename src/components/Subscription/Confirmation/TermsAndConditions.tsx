interface TermsAndConditionsProps {
  isAgreed: boolean;
  onAgreeChange: (agreed: boolean) => void;
}

export default function TermsAndConditions({
  isAgreed,
  onAgreeChange,
}: TermsAndConditionsProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="font-bold text-neutral-950 mb-4">Terms and Conditions</h3>
      <div className="text-sm text-neutral-600 space-y-3">
        <p>• Subscription will automatically end </p>
        <p>
          • We will remind you H-1 of the expire date to your email about the
          subscription
        </p>
        <p>• Prices are subject to change with notice</p>
      </div>
      <div className="mt-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            checked={isAgreed}
            onChange={(e) => onAgreeChange(e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-600">
            I agree to the terms and conditions
          </span>
        </label>
      </div>
    </div>
  );
}
