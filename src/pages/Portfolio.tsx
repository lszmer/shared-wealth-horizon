
import { DashboardHeader } from "@/components/dashboard-header";
import { CategoryTile } from "@/components/category-tile";
import { NetWorthSummary } from "@/components/net-worth-summary";
import { categoryTiles } from "@/data/mockData";
import { TabBar } from "@/components/tab-bar";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-finance-dark">Portfolio</h1>
        
        <NetWorthSummary />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryTiles.map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>
      </div>
      
      <TabBar currentTab="portfolio" />
    </div>
  );
}
