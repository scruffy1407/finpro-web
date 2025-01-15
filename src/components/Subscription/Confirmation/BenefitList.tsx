export default function BenefitsList({ benefits }: { benefits: string[] }) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="font-bold text-gray-800 mb-4">{`What's Included:`}</h3>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start text-sm text-neutral-600">
            <svg
              className="h-5 w-5 text-green-500 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-600">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
