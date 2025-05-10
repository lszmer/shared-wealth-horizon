
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { TabBar } from "@/components/tab-bar";
import { investments } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Landmark, GraduationCap, TrendingUp } from "lucide-react";
import { PercentageChange } from "@/components/ui/percentage-change";
import { Investment } from "@/types/portfolio";
import { PortfolioChart, generateChartData } from "@/components/ui/portfolio-chart";
import { TimeFilter } from "@/components/ui/time-filter";

export default function Investments() {
  const [timeframe, setTimeframe] = useState("1M");
  
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
  
  // Generate summary chart data
  const summaryTrend = 'up';
  const summaryChartData = generateChartData(30, summaryTrend);
  
  const handleTimeframeChange = (option: string) => {
    setTimeframe(option);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <PiggyBank className="text-purple-500" size={24} />
          <h1 className="text-2xl font-bold text-finance-dark">Savings & Investments</h1>
        </div>
        
        <Card className="border-purple-100">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Total Value</div>
                  <div className="text-3xl font-bold text-finance-dark">{formatCurrency(totalInvestments)}</div>
                </div>
                <div className="flex items-center bg-purple-50 rounded-lg px-3 py-1">
                  <TrendingUp size={16} className="text-purple-500 mr-1" />
                  <span className="text-sm font-medium text-purple-700">+8.4%</span>
                </div>
              </div>
              
              <div className="h-40 -mx-2">
                <PortfolioChart data={summaryChartData} color="#9b87f5" height={160} />
              </div>
              
              <TimeFilter 
                options={["1D", "1W", "1M", "1Y", "MAX"]} 
                currentOption={timeframe}
                onChange={handleTimeframeChange}
                className="justify-start"
              />
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
                      <div className="text-sm text-gray-500">{formatCurrency(investment.value)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-12">
                      <PortfolioChart 
                        data={generateChartData(15, investment.percentageChange >= 0 ? 'up' : 'down')} 
                        color={investment.percentageChange >= 0 ? "#22C55E" : "#EF4444"} 
                        height={48} 
                      />
                    </div>
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
                    <div className="text-sm text-gray-500">{formatCurrency(investment.value)}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-12">
                      <PortfolioChart 
                        data={generateChartData(15, investment.percentageChange >= 0 ? 'up' : 'down')} 
                        color={investment.percentageChange >= 0 ? "#22C55E" : "#EF4444"} 
                        height={48} 
                      />
                    </div>
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
                    <div className="text-sm text-gray-500">{formatCurrency(investment.value)}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-12">
                      <PortfolioChart 
                        data={generateChartData(15, investment.percentageChange >= 0 ? 'up' : 'down')} 
                        color={investment.percentageChange >= 0 ? "#22C55E" : "#EF4444"} 
                        height={48} 
                      />
                    </div>
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
                    <div className="text-sm text-gray-500">{formatCurrency(investment.value)}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-12">
                      <PortfolioChart 
                        data={generateChartData(15, investment.percentageChange >= 0 ? 'up' : 'down')} 
                        color={investment.percentageChange >= 0 ? "#22C55E" : "#EF4444"} 
                        height={48} 
                      />
                    </div>
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
