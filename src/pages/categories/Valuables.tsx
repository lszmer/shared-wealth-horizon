
import { DashboardHeader } from "@/components/dashboard-header";
import { TabBar } from "@/components/tab-bar";
import { valuables } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Valuables() {
  // Calculate total value
  const totalValue = valuables.reduce((sum, valuable) => sum + valuable.value, 0);
  
  // Group valuables by type
  const valuablesByType = valuables.reduce((groups, valuable) => {
    const group = groups[valuable.type] || [];
    group.push(valuable);
    groups[valuable.type] = group;
    return groups;
  }, {} as Record<string, typeof valuables>);
  
  // Type labels
  const typeLabels = {
    'art': 'Art Collection',
    'jewelry': 'Jewelry',
    'collectible': 'Collectibles',
    'business': 'Business Interests',
    'other': 'Other Valuables'
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <Diamond className="text-rose-500" size={24} />
          <h1 className="text-2xl font-bold text-finance-dark">Other Valuables</h1>
        </div>
        
        <Card className="bg-rose-50 border-rose-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-3xl font-bold text-finance-dark">{formatCurrency(totalValue)}</div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-2">
            <span>Add Item</span>
            <span className="bg-finance-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">+</span>
          </Button>
        </div>
        
        {Object.entries(valuablesByType).map(([type, items]) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle>{typeLabels[type as keyof typeof typeLabels] || 'Other'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500">{item.description}</div>
                      )}
                    </div>
                    <div className="font-medium">{formatCurrency(item.value)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <TabBar currentTab="portfolio" />
    </div>
  );
}
