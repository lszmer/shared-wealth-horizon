
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

// Generate transparent backgrounds with subtle distinctions
const categoryColors: Record<string, { bg: string, fill: string }> = {
  housing: { bg: "bg-black/20", fill: "bg-white/30" },
  food: { bg: "bg-black/30", fill: "bg-white/30" },
  mobility: { bg: "bg-black/25", fill: "bg-white/30" },
  entertainment: { bg: "bg-black/35", fill: "bg-white/30" },
  utilities: { bg: "bg-black/40", fill: "bg-white/30" },
  savings: { bg: "bg-black/15", fill: "bg-white/30" },
  insurance: { bg: "bg-black/45", fill: "bg-white/30" },
  other: { bg: "bg-black/10", fill: "bg-white/30" }
};

export function SpendingTile({ category, onClick }: SpendingTileProps) {
  const emoji = categoryEmojis[category.id] || "💼";
  const budget = category.budget || 0;
  const percentOfBudget = budget > 0 ? (category.amount / budget) * 100 : 0;
  
  const colors = categoryColors[category.id] || { bg: "bg-black/20", fill: "bg-white/30" };
  
  return (
    <div 
      className={`p-3 cursor-pointer border border-white/10 backdrop-blur-sm transition-all hover:bg-white/5 relative overflow-hidden ${colors.bg}`}
      style={{ flexGrow: category.percentage }} 
      onClick={onClick}
    >
      {/* Progress fill - absolutely positioned to fill from bottom */}
      {budget > 0 && (
        <div 
          className={`absolute left-0 right-0 bottom-0 ${colors.fill}`}
          style={{ height: `${Math.min(percentOfBudget, 100)}%` }}
        />
      )}
      
      {/* Content - positioned above the fill with z-10 */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{emoji}</span>
          <h3 className="font-bold text-white">{category.name}</h3>
        </div>
      </div>
    </div>
  );
}
