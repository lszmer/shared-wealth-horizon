
import { useState } from "react";
import { TabBar } from "@/components/tab-bar";
import { TransactionPopup } from "@/components/transaction-popup";
import { SavingsPopup } from "@/components/savings-popup";
import { toast } from "@/components/ui/use-toast";
import { 
  spendingCategories, 
  transactions, 
  savingsProjects,
  formattedTotalSpending,
  SpendingCategory
} from "@/data/spendingData";
import { Tree, TreeNode } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export default function Cash() {
  const [selectedCategory, setSelectedCategory] = useState<SpendingCategory | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  
  const handleCategoryClick = (category: SpendingCategory) => {
    setSelectedCategory(category);
    
    if (category.id === "savings") {
      setIsSavingsModalOpen(true);
    } else {
      setIsCategoryModalOpen(true);
    }
    
    toast({
      title: `${category.name} selected`,
      description: `You've selected the ${category.name} category with ${category.amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })}`,
      duration: 3000,
    });
  };

  // Create tree data structure from spending categories
  const treeData = {
    name: "Monthly Spending",
    children: spendingCategories.map(category => ({
      name: category.name,
      size: category.amount,
      id: category.id,
      category: category
    }))
  };
  
  return (
    <div className="min-h-screen bg-black">
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
          
          <div className="h-full w-full">
            <ChartContainer 
              config={{ 
                spending: { theme: { dark: "#9b87f5", light: "#9b87f5" } },
                food: { theme: { dark: "#F97316", light: "#F97316" } },
                housing: { theme: { dark: "#0EA5E9", light: "#0EA5E9" } },
                savings: { theme: { dark: "#8B5CF6", light: "#8B5CF6" } },
                other: { theme: { dark: "#D946EF", light: "#D946EF" } },
                mobility: { theme: { dark: "#F2FCE2", light: "#F2FCE2" } },
                entertainment: { theme: { dark: "#FEF7CD", light: "#FEF7CD" } },
                insurance: { theme: { dark: "#33C3F0", light: "#33C3F0" } }
              }}
              className="h-full w-full"
            >
              <Tree
                width={800}
                height={500}
                data={treeData}
                dataKey="size"
                nameKey="name"
                isAnimationActive={true}
                style={{ fontSize: 18 }}
              >
                <TreeNode 
                  fill="#9b87f5" 
                  stroke="#8E9196"
                  strokeWidth={1}
                  onClick={(data) => {
                    if (data && data.id) {
                      const category = spendingCategories.find(cat => cat.id === data.id);
                      if (category) {
                        handleCategoryClick(category);
                      }
                    }
                  }}
                />
              </Tree>
            </ChartContainer>
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
