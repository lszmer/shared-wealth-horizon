
import React from "react";
import { SpendingCategory } from "@/data/spendingData";
import { formatCurrency } from "@/lib/formatters";
import { Progress } from "@/components/ui/progress";

interface SpendingTileProps {
  category: SpendingCategory;
  onClick: () => void;
}

export function SpendingTile({ category, onClick }: SpendingTileProps) {
  // Calculate the percentage of budget spent
  const spentPercentage = Math.min(Math.round((category.amount / category.budget) * 100), 100);
  
  // Determine text color based on budget usage
  const getBudgetStatusColor = () => {
    if (spentPercentage >= 100) return "text-red-200";
    if (spentPercentage >= 85) return "text-yellow-200";
    return "text-white/80";
  };

  return (
    <div 
      className={`rounded-lg p-4 cursor-pointer transition-transform hover:scale-[1.02] w-full sm:w-auto ${category.color} text-white relative overflow-hidden`}
      style={{ flexGrow: category.percentage }} 
      onClick={onClick}
    >
      <div className="relative z-10">
        <h3 className="font-bold text-lg">{category.name}</h3>
        
        <div className="flex justify-between items-center mt-2">
          <span>{formatCurrency(category.amount)}</span>
          <span className="text-white/80">{category.percentage}%</span>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className={getBudgetStatusColor()}>
              {formatCurrency(category.amount)} / {formatCurrency(category.budget)}
            </span>
            <span className={`text-sm ${getBudgetStatusColor()}`}>
              {spentPercentage}%
            </span>
          </div>
          
          <Progress 
            value={spentPercentage} 
            className="h-1.5 bg-white/20" 
            indicatorClassName={
              spentPercentage >= 100 ? "bg-red-300" : 
              spentPercentage >= 85 ? "bg-yellow-300" : 
              "bg-white"
            }
          />
        </div>
      </div>
      
      {/* Visual background fill based on budget usage */}
      <div 
        className="absolute bottom-0 left-0 bg-black/10 transition-all duration-500"
        style={{
          width: '100%',
          height: `${spentPercentage}%`,
          maxHeight: '100%'
        }}
      />
    </div>
  );
}
