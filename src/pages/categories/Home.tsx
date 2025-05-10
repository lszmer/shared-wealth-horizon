
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { TabBar } from "@/components/tab-bar";
import { properties } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home as HomeIcon } from "lucide-react";

export default function Home() {
  const [property] = useState(properties[0]);
  
  // Calculate total mortgage balance
  const totalMortgageBalance = property.mortgages.reduce(
    (sum, mortgage) => sum + mortgage.currentBalance,
    0
  );
  
  // Calculate equity
  const equity = property.value - totalMortgageBalance;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <HomeIcon className="text-blue-500" size={24} />
          <h1 className="text-2xl font-bold text-finance-dark">Home</h1>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{property.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Estimated Value</div>
                <div className="text-2xl font-bold text-finance-dark">{formatCurrency(property.value)}</div>
              </div>
              
              <div className="border-t pt-4">
                <div className="text-sm text-gray-500">Mortgages</div>
                {property.mortgages.map(mortgage => (
                  <div key={mortgage.id} className="flex justify-between items-center py-2">
                    <div>
                      <div className="font-medium">{mortgage.name}</div>
                      <div className="text-xs text-gray-500">
                        {mortgage.interestRate}% interest rate
                      </div>
                    </div>
                    <div className="text-lg font-medium text-finance-negative">
                      {formatCurrency(mortgage.currentBalance)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="text-sm text-gray-500">Home Equity</div>
                <div className="text-2xl font-bold text-finance-positive">
                  {formatCurrency(equity)}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {(equity / property.value * 100).toFixed(1)}% of property value
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500">
              <p>Recent mortgage and property transactions will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <TabBar currentTab="portfolio" />
    </div>
  );
}
