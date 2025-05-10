
import { DashboardHeader } from "@/components/dashboard-header";
import { CategoryTile } from "@/components/category-tile";
import { NetWorthSummary } from "@/components/net-worth-summary";
import { categoryTiles } from "@/data/mockData";
import { TabBar } from "@/components/tab-bar";
import { Briefcase } from "lucide-react";

export default function Portfolio() {
  // Filter out the loans category
  const filteredCategories = categoryTiles.filter(category => category.id !== "loans");
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="bg-finance-accent p-1.5 rounded-md">
            <Briefcase size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-finance-dark">Portfolio</h1>
        </div>
        
        <NetWorthSummary />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>
      </div>
      
      <TabBar currentTab="portfolio" />
    </div>
  );
}
