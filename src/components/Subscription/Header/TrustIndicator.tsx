import { LucideIcon } from 'lucide-react';

interface TrustIndicatorProps {
  Icon: LucideIcon;
  text: string;
}

export function TrustIndicator({ Icon, text }: TrustIndicatorProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Icon className="h-5 w-5 text-blue-500" />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
}