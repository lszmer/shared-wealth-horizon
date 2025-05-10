
import { DashboardHeader } from "@/components/dashboard-header";
import { TabBar } from "@/components/tab-bar";
import { investments } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Landmark, GraduationCap } from "lucide-react";
import { PercentageChange } from "@/components/ui/percentage-change";
import { Investment } from "@/types/portfolio";

export default function Investments() {
  // Group investments by type
  const stockInvestments = investments.filter(inv => inv.type === 'stock');
  const savingsInvestments = investments.filter(inv => inv.type === 'savings');
  const retirementInvestments = investments.filter(inv => inv.type === 'retirement');
  const childrenInvestments = investments.filter(inv => inv.type === 'children');
  
  // Calculate totals by type
  const getTotal = (invs: Investment[]) => invs.reduce((sum, inv) => sum + inv.value, 0);
  const stockTotal = getTotal(stockInvestments);
  const savingsTotal = getTotal(savingsInvestments);
  const retirementTotal = getTotal(retirementInvestments);
  const childrenTotal = getTotal(childrenInvestments);
  const totalInvestments = getTotal(investments);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <PiggyBank className="text-purple-500" size={24} />
          <h1 className="text-2xl font-bold text-finance-dark">Savings & Investments</h1>
        </div>
        
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-3xl font-bold text-finance-dark">{formatCurrency(totalInvestments)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <PiggyBank size={18} />
              <CardTitle>Stocks</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="font-medium">{formatCurrency(stockTotal)}</div>
            </div>
            
            <div className="space-y-3">
              {stockInvestments.map(investment => (
                <div key={investment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div className="flex items-center">
                    {investment.logo ? (
                      <img src={investment.logo} alt={investment.name} className="w-8 h-8 mr-3 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-xs">
                        {investment.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{investment.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(investment.value)}</div>
                    <PercentageChange value={investment.percentageChange} iconSize={14} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Landmark size={18} />
              <CardTitle>Liquid Savings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="font-medium">{formatCurrency(savingsTotal)}</div>
            </div>
            
            <div className="space-y-3">
              {savingsInvestments.map(investment => (
                <div key={investment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <div className="font-medium">{investment.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(investment.value)}</div>
                    <PercentageChange value={investment.percentageChange} iconSize={14} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Landmark size={18} />
              <CardTitle>Retirement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="font-medium">{formatCurrency(retirementTotal)}</div>
            </div>
            
            <div className="space-y-3">
              {retirementInvestments.map(investment => (
                <div key={investment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <div className="font-medium">{investment.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(investment.value)}</div>
                    <PercentageChange value={investment.percentageChange} iconSize={14} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <GraduationCap size={18} />
              <CardTitle>Children's Savings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="font-medium">{formatCurrency(childrenTotal)}</div>
            </div>
            
            <div className="space-y-3">
              {childrenInvestments.map(investment => (
                <div key={investment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <div className="font-medium">{investment.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(investment.value)}</div>
                    <PercentageChange value={investment.percentageChange} iconSize={14} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <TabBar currentTab="portfolio" />
    </div>
  );
}
