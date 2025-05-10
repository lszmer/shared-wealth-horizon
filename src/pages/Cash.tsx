
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
  
  // Calculate total budget for proportional sizing
  const totalBudget = spendingCategories.reduce((sum, category) => sum + (category.budget || 0), 0);
  
  // Sort categories by budget size (larger budgets first)
  const sortedCategories = [...spendingCategories].sort((a, b) => 
    (b.budget || 0) - (a.budget || 0)
  );
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col h-screen">
      <div className="p-4 flex flex-col h-[calc(100vh-80px)]">
        <div className="flex items-center justify-end mb-4">
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Available This Month</div>
            <div className="text-4xl font-extrabold text-gray-800">{formattedTotalSpending}</div>
          </div>
        </div>
        
        <div className="bg-white flex-grow overflow-hidden shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">Monthly Spending</h2>
          </div>
          
          <div className="flex flex-wrap flex-grow">
            {sortedCategories.map((category) => (
              <div 
                key={category.id} 
                className="w-full"
                style={{ 
                  height: `${((category.budget || 0) / totalBudget) * 100}%`,
                  minHeight: '50px' // Ensure a minimum height for visibility
                }}
              >
                <SpendingTile
                  category={category}
                  onClick={() => handleTileClick(category)}
                />
              </div>
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
