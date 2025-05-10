
import React from "react";
import { SpendingCategory } from "@/data/spendingData";
import { formatCurrency } from "@/lib/formatters";

interface SpendingTileProps {
  category: SpendingCategory;
  onClick: () => void;
}

export function SpendingTile({ category, onClick }: SpendingTileProps) {
  return (
    <div 
      className={`rounded-lg p-4 cursor-pointer transition-transform hover:scale-[1.02] w-full sm:w-auto ${category.color} text-white`}
      style={{ flexGrow: category.percentage }} 
      onClick={onClick}
    >
      <h3 className="font-bold text-lg">{category.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <span>{formatCurrency(category.amount)}</span>
        <span className="text-white/80">{category.percentage}%</span>
      </div>
    </div>
  );
}
