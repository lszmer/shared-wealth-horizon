
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Transaction, SpendingCategory } from "@/data/spendingData";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TransactionPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: SpendingCategory | null;
  transactions: Transaction[];
}

export function TransactionPopup({ 
  open, 
  onOpenChange, 
  category, 
  transactions 
}: TransactionPopupProps) {
  const [showPreviousMonths, setShowPreviousMonths] = useState(false);
  
  if (!category) return null;

  // Get current month and year
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Filter transactions for the category
  const categoryTransactions = transactions.filter(t => t.categoryId === category.id);
  
  // Separate current month transactions from previous
  const currentMonthTransactions = categoryTransactions.filter(t => {
    const transDate = new Date(t.date);
    return transDate.getMonth() === currentMonth && 
           transDate.getFullYear() === currentYear;
  });
  
  const previousMonthTransactions = categoryTransactions.filter(t => {
    const transDate = new Date(t.date);
    return transDate.getMonth() !== currentMonth || 
           transDate.getFullYear() !== currentYear;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className={cn("w-3 h-3 rounded-full", category.color)}></span>
            {category.name} Transactions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          {/* Current Month Transactions */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">This Month</h3>
            {currentMonthTransactions.length > 0 ? (
              <div className="rounded-md border">
                <div className="bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 grid grid-cols-3">
                  <div>Date</div>
                  <div>Description</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {currentMonthTransactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-3 px-4 py-2.5 text-sm">
                      <div className="text-gray-600">{transaction.date.split('-').slice(1).join('/')}</div>
                      <div className="truncate">{transaction.description}</div>
                      <div className="text-right font-medium">{formatCurrency(transaction.amount)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center py-3 text-gray-500 text-sm bg-gray-50 rounded">No transactions this month</p>
            )}
          </div>
          
          {/* Previous Months Transactions - Collapsible */}
          {previousMonthTransactions.length > 0 && (
            <Collapsible>
              <CollapsibleTrigger 
                className="flex w-full items-center justify-between py-2 text-gray-700 font-medium"
                onClick={() => setShowPreviousMonths(!showPreviousMonths)}
              >
                <span>Previous Months</span>
                {showPreviousMonths ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="rounded-md border mt-1">
                  <div className="bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 grid grid-cols-3">
                    <div>Date</div>
                    <div>Description</div>
                    <div className="text-right">Amount</div>
                  </div>
                  <div className="divide-y">
                    {previousMonthTransactions.map((transaction) => (
                      <div key={transaction.id} className="grid grid-cols-3 px-4 py-2.5 text-sm">
                        <div className="text-gray-600">{transaction.date}</div>
                        <div className="truncate">{transaction.description}</div>
                        <div className="text-right font-medium">{formatCurrency(transaction.amount)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
