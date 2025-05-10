
import { useState } from "react";
import { TabBar } from "@/components/tab-bar";
import { SpendingTile } from "@/components/spending-tile";
import { TransactionPopup } from "@/components/transaction-popup";
import { SavingsPopup } from "@/components/savings-popup";
import { 
  spendingCategories, 
  transactions, 
  savingsProjects,
  formattedTotalSpending,
  SpendingCategory
} from "@/data/spendingData";

export default function Cash() {
  const [selectedCategory, setSelectedCategory] = useState<SpendingCategory | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  
  const handleTileClick = (category: SpendingCategory) => {
    setSelectedCategory(category);
    
    if (category.id === "savings") {
      setIsSavingsModalOpen(true);
    } else {
      setIsCategoryModalOpen(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="p-4 space-y-4 flex flex-col h-[calc(100vh-80px)]">
        <div className="flex items-center justify-end mb-2">
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-1">Available This Month</div>
            <div className="text-4xl font-extrabold text-white">{formattedTotalSpending}</div>
          </div>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <div className="p-3 border-b border-gray-800">
            <h2 className="text-lg font-medium text-white">Monthly Spending</h2>
          </div>
          
          <div className="flex flex-wrap h-full">
            {spendingCategories.map((category) => (
              <SpendingTile
                key={category.id}
                category={category}
                onClick={() => handleTileClick(category)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <TabBar currentTab="home" />
      
      {/* Regular category popup */}
      <TransactionPopup
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        category={selectedCategory}
        transactions={transactions}
      />
      
      {/* Special savings popup */}
      <SavingsPopup
        open={isSavingsModalOpen}
        onOpenChange={setIsSavingsModalOpen}
        category={selectedCategory}
        transactions={transactions}
        savingsProjects={savingsProjects}
      />
    </div>
  );
}
