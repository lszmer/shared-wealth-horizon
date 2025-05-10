
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PercentageChangeProps {
  value: number;
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
}

export function PercentageChange({
  value,
  className,
  showIcon = true,
  iconSize = 16
}: PercentageChangeProps) {
  const isPositive = value >= 0;
  const formattedValue = Math.abs(value).toFixed(2);
  
  return (
    <div
      className={cn(
        "flex items-center",
        isPositive ? "text-finance-positive" : "text-finance-negative",
        className
      )}
    >
      {showIcon && (
        isPositive ? (
          <ArrowUp size={iconSize} className="mr-0.5" />
        ) : (
          <ArrowDown size={iconSize} className="mr-0.5" />
        )
      )}
      <span>{formattedValue} %</span>
    </div>
  );
}
