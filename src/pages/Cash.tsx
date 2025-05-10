
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
import { Treemap, ResponsiveContainer } from "recharts";
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

  // Create treemap data structure from spending categories
  const treeData = {
    name: "Monthly Spending",
    children: spendingCategories.map(category => ({
      name: category.name,
      size: category.amount,
      id: category.id,
      category: category
    }))
  };

  // Custom render for treemap content
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, size, id } = props;
    
    if (!width || !height) return null;
    
    // Check if size is defined before calling toLocaleString
    const formattedSize = size !== undefined ? 
      size.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }) : '$0.00';
    
    // Determine if this is the savings category to highlight it
    const isSavings = id === "savings";
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: isSavings ? '#EC4899' : '#222222', // Dark grey boxes, pink for savings
            stroke: '#fff',
            strokeWidth: 2,
            fillOpacity: 0.9,
          }}
        />
        <text
          x={x + width / 2}
          y={y + height / 2 - 8}
          textAnchor="middle"
          fill="#fff"
          fontSize={16}
          fontWeight="bold"
        >
          {name}
        </text>
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
        >
          {formattedSize}
        </text>
      </g>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-800"> {/* Match footer bar color */}
      <div className="p-4 space-y-4 flex flex-col h-[calc(100vh-80px)]">
        <div className="flex items-center justify-end mb-2">
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-1">Available This Month</div>
            <div className="text-4xl font-extrabold text-white">{formattedTotalSpending}</div>
          </div>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <div className="p-3 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Monthly Spending</h2>
          </div>
          
          <div className="h-full w-full">
            <ChartContainer 
              config={{ 
                spending: { theme: { dark: "#222222", light: "#222222" } },
                food: { theme: { dark: "#222222", light: "#222222" } },
                housing: { theme: { dark: "#222222", light: "#222222" } },
                savings: { theme: { dark: "#EC4899", light: "#EC4899" } },
                other: { theme: { dark: "#222222", light: "#222222" } },
                mobility: { theme: { dark: "#222222", light: "#222222" } },
                entertainment: { theme: { dark: "#222222", light: "#222222" } },
                insurance: { theme: { dark: "#222222", light: "#222222" } }
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={[treeData]}
                  dataKey="size"
                  stroke="#fff"
                  fill="#222222"
                  content={<CustomizedContent />}
                  animationEnable={false} /* Disable animation */
                  onClick={(data) => {
                    if (data && data.id) {
                      const category = spendingCategories.find(cat => cat.id === data.id);
                      if (category) {
                        handleCategoryClick(category);
                      }
                    }
                  }}
                >
                </Treemap>
              </ResponsiveContainer>
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
