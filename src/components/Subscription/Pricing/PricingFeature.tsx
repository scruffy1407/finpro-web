import { Check } from 'lucide-react';

interface PricingFeatureProps {
  feature: string;
}

export function PricingFeature({ feature }: PricingFeatureProps) {
  return (
    <li className="flex items-center gap-3">
      <Check className="h-5 w-5 text-blue-500" />
      <span className="text-gray-700">{feature}</span>
    </li>
  );
}