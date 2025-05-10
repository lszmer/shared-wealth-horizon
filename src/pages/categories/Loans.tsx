
import { DashboardHeader } from "@/components/dashboard-header";
import { TabBar } from "@/components/tab-bar";
import { loans } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function Loans() {
  // Calculate total liability
  const totalLiability = loans.reduce(
    (sum, loan) => sum + loan.currentBalance,
    0
  );
  
  // Group loans by type
  const loansByType = {
    personal: loans.filter(loan => loan.type === 'personal'),
    credit: loans.filter(loan => loan.type === 'credit'),
    other: loans.filter(loan => !['personal', 'credit'].includes(loan.type)),
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-2">
          <CreditCard className="text-red-500" size={24} />
          <h1 className="text-2xl font-bold text-finance-dark">Loans & Credit</h1>
        </div>
        
        <Card className="bg-red-50 border-red-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Outstanding</div>
              <div className="text-3xl font-bold text-finance-negative">{formatCurrency(totalLiability)}</div>
            </div>
          </CardContent>
        </Card>
        
        {loansByType.personal.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loansByType.personal.map((loan) => (
                  <div key={loan.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{loan.name}</div>
                      {loan.interestRate && (
                        <div className="text-xs text-gray-500">{loan.interestRate}% interest rate</div>
                      )}
                      {loan.originalAmount && (
                        <div className="text-xs text-gray-500">
                          Original: {formatCurrency(loan.originalAmount)}
                        </div>
                      )}
                    </div>
                    <div className="text-lg font-medium text-finance-negative">
                      {formatCurrency(loan.currentBalance)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {loansByType.credit.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Credit Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loansByType.credit.map((loan) => (
                  <div key={loan.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{loan.name}</div>
                      {loan.interestRate && (
                        <div className="text-xs text-gray-500">{loan.interestRate}% interest rate</div>
                      )}
                    </div>
                    <div className="text-lg font-medium text-finance-negative">
                      {formatCurrency(loan.currentBalance)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {loansByType.other.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Other Debts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loansByType.other.map((loan) => (
                  <div key={loan.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{loan.name}</div>
                      {loan.interestRate && (
                        <div className="text-xs text-gray-500">{loan.interestRate}% interest rate</div>
                      )}
                    </div>
                    <div className="text-lg font-medium text-finance-negative">
                      {formatCurrency(loan.currentBalance)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <TabBar currentTab="portfolio" />
    </div>
  );
}
