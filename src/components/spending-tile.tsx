
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
  other: "📌"
};

export function SpendingTile({ category, onClick }: SpendingTileProps) {
  const emoji = categoryEmojis[category.id] || "💼";
  
  return (
    <div 
      className={`p-4 cursor-pointer transition-transform hover:scale-[1.02] w-full ${category.color} text-white bg-opacity-95`}
      style={{ flexGrow: category.percentage }} 
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-bold text-lg">{category.name}</h3>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span>{formatCurrency(category.amount)}</span>
        <span className="text-white/80">{category.percentage}%</span>
      </div>
    </div>
  );
}
