
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-4 flex flex-col h-[calc(100vh-128px)]">
        <div className="flex items-center justify-end">
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Available This Month</div>
            <div className="text-3xl font-extrabold text-gray-800">{formattedTotalSpending}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-t-xl shadow-sm flex-grow overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">Monthly Spending</h2>
          </div>
          
          <div className="flex flex-wrap">
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
