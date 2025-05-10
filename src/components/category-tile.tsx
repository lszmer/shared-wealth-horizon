
import { Link } from "react-router-dom";
import { CategoryTile as CategoryTileType } from "@/types/portfolio";
import { Circle, Home, PiggyBank, Car, Shield, Gem, CreditCard } from "lucide-react";
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
  
  // Map icon string to the actual Lucide icon component with enhanced size and styling
  const getIcon = () => {
    switch (icon) {
      case "home":
        return <Home size={28} className="text-white" />;
      case "piggy-bank":
        return <PiggyBank size={28} className="text-white" />;
      case "car":
        return <Car size={28} className="text-white" />;
      case "shield":
        return <Shield size={28} className="text-white" />;
      case "diamond":
        return <Gem size={28} className="text-white" />;
      case "credit-card":
        return <CreditCard size={28} className="text-white" />;
      default:
        return <Circle size={28} className="text-white" />;
    }
  };

  return (
    <Link to={path} className="block transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
      <div className={cn(
        "rounded-xl p-4 text-white flex flex-col h-36 shadow-md",
        color
      )}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="bg-white/20 rounded-full p-2">
            {getIcon()}
          </div>
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
