
import { DashboardHeader } from "@/components/dashboard-header";
import { TabBar } from "@/components/tab-bar";
import { insurances } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Insurance() {
  // Calculate total cash value
  const totalCashValue = insurances.reduce(
    (sum, insurance) => sum + (insurance.cashValue || 0),
    0
  );
  
  // Calculate annual premium costs
  const totalPremiums = insurances.reduce(
    (sum, insurance) => sum + insurance.premium,
    0
  );
  
  // Coverage rating colors
  const ratingColors = {
    good: "text-green-500",
    warning: "text-amber-500",
    alert: "text-red-500"
  };
  
  // Rating icons
  const RatingIcon = ({ rating }: { rating: 'good' | 'warning' | 'alert' }) => {
    if (rating === 'good') return <CheckCircle className="text-green-500" size={16} />;
    if (rating === 'warning') return <AlertTriangle className="text-amber-500" size={16} />;
    return <AlertTriangle className="text-red-500" size={16} />;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <Shield className="text-amber-500" size={24} />
          <h1 className="text-2xl font-bold text-finance-dark">Insurance</h1>
        </div>
        
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div>
                <div className="text-sm text-gray-500">Total Cash Value</div>
                <div className="text-3xl font-bold text-finance-dark">{formatCurrency(totalCashValue)}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Annual Premium Costs</div>
                <div className="text-xl font-medium text-finance-dark">{formatCurrency(totalPremiums)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {insurances.map((insurance) => (
          <Card key={insurance.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle>{insurance.type} Insurance</CardTitle>
                <RatingIcon rating={insurance.coverageRating} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500">Provider</div>
                    <div className="font-medium">{insurance.provider}</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500">Coverage Amount</div>
                    <div className="font-medium">{formatCurrency(insurance.coverage)}</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500">Annual Premium</div>
                    <div className="font-medium">{formatCurrency(insurance.premium)}</div>
                  </div>
                </div>
                
                {insurance.cashValue && (
                  <div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">Cash Value</div>
                      <div className="font-medium">{formatCurrency(insurance.cashValue)}</div>
                    </div>
                  </div>
                )}
                
                {insurance.beneficiaries && (
                  <div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">Beneficiaries</div>
                      <div className="font-medium">{insurance.beneficiaries}</div>
                    </div>
                  </div>
                )}
                
                {insurance.details && (
                  <div className="pt-2 border-t">
                    <div className={cn(
                      "text-sm p-2 rounded-md",
                      insurance.coverageRating === 'good' ? "bg-green-50 text-green-800" :
                      insurance.coverageRating === 'warning' ? "bg-amber-50 text-amber-800" :
                      "bg-red-50 text-red-800"
                    )}>
                      {insurance.details}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <TabBar currentTab="portfolio" />
    </div>
  );
}
