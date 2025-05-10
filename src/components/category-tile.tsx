
import { Link } from "react-router-dom";
import { CategoryTile as CategoryTileType } from "@/types/portfolio";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { PercentageChange } from "@/components/ui/percentage-change";
import { formatCurrency } from "@/lib/formatters";

interface CategoryTileProps {
  category: CategoryTileType;
}

export function CategoryTile({ category }: CategoryTileProps) {
  const { title, value, liability, icon, color, path } = category;
  const netValue = (value || 0) - (liability || 0);
  const percentChange = netValue !== 0 ? ((value || 0) / (netValue || 1) - 1) * 100 : 0;
  
  // Dynamically render the appropriate Lucide icon
  const IconComponent = Icons[icon as keyof typeof Icons];

  return (
    <Link to={path} className="block">
      <div className={cn(
        "rounded-xl p-4 text-white flex flex-col h-36",
        color
      )}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          {IconComponent && <IconComponent size={24} />}
        </div>
        
        {value ? (
          <div className="mt-auto">
            <div className="text-xs opacity-80">Total Value</div>
            <div className="text-lg font-semibold">{formatCurrency(value)}</div>
          </div>
        ) : null}
        
        {liability ? (
          <div className="mt-1">
            <div className="text-xs opacity-80">Liability</div>
            <div className="text-sm font-medium text-white/90">
              -{formatCurrency(liability)}
            </div>
          </div>
        ) : null}
        
        {value && liability ? (
          <div className="flex justify-between items-center mt-2">
            <div>
              <div className="text-xs opacity-80">Net</div>
              <div className="text-base font-semibold">{formatCurrency(netValue)}</div>
            </div>
            {percentChange !== 0 && (
              <PercentageChange 
                value={percentChange} 
                className="text-white" 
                iconSize={14}
              />
            )}
          </div>
        ) : value && !liability ? (
          <div className="mt-2">
            {percentChange !== 0 && (
              <PercentageChange 
                value={percentChange} 
                className="text-white" 
                iconSize={14}
              />
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
