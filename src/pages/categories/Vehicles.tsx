
import { DashboardHeader } from "@/components/dashboard-header";
import { TabBar } from "@/components/tab-bar";
import { vehicles } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function Vehicles() {
  // Calculate totals
  const totalValue = vehicles.reduce((sum, vehicle) => sum + vehicle.value, 0);
  const totalLoans = vehicles.reduce((sum, vehicle) => 
    sum + (vehicle.loan ? vehicle.loan.currentBalance : 0), 0);
  const netValue = totalValue - totalLoans;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <Car className="text-green-500" size={24} />
          <h1 className="text-2xl font-bold text-finance-dark">Vehicles</h1>
        </div>
        
        <Card className="bg-green-50 border-green-100">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div>
                <div className="text-sm text-gray-500">Total Value</div>
                <div className="text-3xl font-bold text-finance-dark">{formatCurrency(totalValue)}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Total Loans</div>
                <div className="text-xl font-medium text-finance-negative">{formatCurrency(totalLoans)}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Net Value</div>
                <div className="text-2xl font-bold text-finance-positive">{formatCurrency(netValue)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {vehicles.map(vehicle => (
          <Card key={vehicle.id}>
            <CardHeader>
              <CardTitle>{vehicle.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Estimated Value</div>
                  <div className="text-xl font-bold text-finance-dark">{formatCurrency(vehicle.value)}</div>
                </div>
                
                {vehicle.loan && (
                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-500">Loan Details</div>
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <div className="font-medium">{vehicle.loan.name}</div>
                        <div className="text-xs text-gray-500">
                          {vehicle.loan.interestRate}% interest rate
                        </div>
                      </div>
                      <div className="text-lg font-medium text-finance-negative">
                        {formatCurrency(vehicle.loan.currentBalance)}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-500">Net Vehicle Value</div>
                  <div className="text-xl font-bold text-finance-positive">
                    {formatCurrency(vehicle.value - (vehicle.loan ? vehicle.loan.currentBalance : 0))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <TabBar currentTab="portfolio" />
    </div>
  );
}
