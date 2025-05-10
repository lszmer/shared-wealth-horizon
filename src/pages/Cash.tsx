
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
import { CircleDollarSign } from "lucide-react";

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
      
      <div className="p-4 space-y-6 flex flex-col h-[calc(100vh-144px)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-mint-500 p-1.5 rounded-md">
              <CircleDollarSign size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-finance-dark">Cash</h1>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">Current Month</div>
            <div className="text-xl font-semibold">{formattedTotalSpending}</div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm flex-grow overflow-y-auto">
          <h2 className="text-lg font-medium mb-4">Monthly Spending</h2>
          
          <div className="flex flex-wrap gap-3">
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
