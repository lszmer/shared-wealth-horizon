
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Transaction, SpendingCategory } from "@/data/spendingData";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

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
  if (!category) return null;

  const categoryTransactions = transactions.filter(t => t.categoryId === category.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className={cn("w-3 h-3 rounded-full", category.color)}></span>
            {category.name} Transactions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-1 mt-4">
          {categoryTransactions.length > 0 ? (
            <div className="rounded-md border">
              <div className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 grid grid-cols-3">
                <div>Date</div>
                <div>Description</div>
                <div className="text-right">Amount</div>
              </div>
              <div className="divide-y">
                {categoryTransactions.map((transaction) => (
                  <div key={transaction.id} className="grid grid-cols-3 px-4 py-3 text-sm">
                    <div className="text-gray-600">{transaction.date.split('-').slice(1).join('/')}</div>
                    <div>{transaction.description}</div>
                    <div className="text-right font-medium">{formatCurrency(transaction.amount)}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">No transactions found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
