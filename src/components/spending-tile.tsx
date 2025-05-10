
import React from "react";
import { SpendingCategory } from "@/data/spendingData";
import { formatCurrency } from "@/lib/formatters";
import { Progress } from "@/components/ui/progress";

interface SpendingTileProps {
  category: SpendingCategory;
  onClick: () => void;
}

const categoryEmojis: Record<string, string> = {
  housing: "🏠",
  food: "🍔",
  mobility: "🚗",
  savings: "💰",
  entertainment: "🎬",
  shopping: "🛍️",
  health: "🏥",
  education: "📚",
  travel: "✈️",
  utilities: "💡",
  subscriptions: "📱",
  other: "📌"
};

export function SpendingTile({ category, onClick }: SpendingTileProps) {
  const emoji = categoryEmojis[category.id] || "💼";
  const budget = category.budget || 0;
  const percentOfBudget = budget > 0 ? (category.amount / budget) * 100 : 0;
  
  // Determine status color based on budget usage
  const getStatusColor = () => {
    if (budget === 0) return "bg-gray-300";
    if (percentOfBudget > 100) return "bg-finance-negative";
    if (percentOfBudget > 85) return "bg-orange-400";
    return "bg-finance-positive";
  };
  
  return (
    <div 
      className="p-3 cursor-pointer bg-white/90 border-r border-b border-gray-100 transition-all hover:bg-white"
      style={{ flexGrow: category.percentage }} 
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-bold text-gray-800">{category.name}</h3>
      </div>
      
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-gray-700 font-medium">{formatCurrency(category.amount)}</span>
        {budget > 0 && (
          <span className={`text-xs ${percentOfBudget > 100 ? 'text-finance-negative' : 'text-gray-500'}`}>
            {Math.round(percentOfBudget)}% of budget
          </span>
        )}
      </div>
      
      {budget > 0 && (
        <div className="mt-2">
          <Progress 
            value={Math.min(percentOfBudget, 100)} 
            className="h-1.5 bg-gray-100"
            indicatorClassName={getStatusColor()}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">
              {formatCurrency(category.amount)} / {formatCurrency(budget)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
