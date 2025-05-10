
import React from "react";
import { SpendingCategory } from "@/data/spendingData";
import { formatCurrency } from "@/lib/formatters";

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
  other: "📌",
  insurance: "🔒"
};

// Generate distinctive but harmonious colors for each category
const categoryColors: Record<string, { bg: string, fill: string }> = {
  housing: { bg: "bg-blue-100", fill: "bg-blue-400" },
  food: { bg: "bg-green-100", fill: "bg-green-400" },
  mobility: { bg: "bg-amber-100", fill: "bg-amber-400" },
  entertainment: { bg: "bg-purple-100", fill: "bg-purple-400" },
  utilities: { bg: "bg-orange-100", fill: "bg-orange-400" },
  savings: { bg: "bg-cyan-100", fill: "bg-cyan-400" },
  insurance: { bg: "bg-pink-100", fill: "bg-pink-400" },
  other: { bg: "bg-gray-100", fill: "bg-gray-400" }
};

export function SpendingTile({ category, onClick }: SpendingTileProps) {
  const emoji = categoryEmojis[category.id] || "💼";
  const budget = category.budget || 0;
  const percentOfBudget = budget > 0 ? (category.amount / budget) * 100 : 0;
  
  const colors = categoryColors[category.id] || { bg: "bg-gray-100", fill: "bg-gray-400" };
  
  return (
    <div 
      className={`p-3 cursor-pointer border-r border-b border-gray-100 transition-all hover:bg-white relative overflow-hidden ${colors.bg}`}
      style={{ 
        flexGrow: category.percentage,
        position: 'relative'
      }} 
      onClick={onClick}
    >
      {/* Progress fill - absolutely positioned to fill from bottom */}
      {budget > 0 && (
        <div 
          className={`absolute left-0 bottom-0 right-0 ${colors.fill} opacity-40 z-0`}
          style={{ height: `${Math.min(percentOfBudget, 100)}%` }}
        />
      )}
      
      {/* Content - positioned above the fill with z-10 */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{emoji}</span>
          <h3 className="font-bold text-gray-800">{category.name}</h3>
        </div>
        
        <div className="flex justify-between items-baseline">
          <span className="text-gray-700 font-medium">{formatCurrency(category.amount)}</span>
          {budget > 0 && (
            <span className={`text-xs ${percentOfBudget > 100 ? 'text-finance-negative' : 'text-gray-500'}`}>
              {Math.round(percentOfBudget)}% of budget
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
