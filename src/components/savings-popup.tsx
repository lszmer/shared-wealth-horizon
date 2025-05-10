
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction, SpendingCategory, SavingsProject } from "@/data/spendingData";
import { formatCurrency } from "@/lib/formatters";
import { Sofa } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SavingsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: SpendingCategory | null;
  transactions: Transaction[];
  savingsProjects: SavingsProject[];
}

export function SavingsPopup({ 
  open, 
  onOpenChange, 
  category, 
  transactions,
  savingsProjects 
}: SavingsPopupProps) {
  const [saveAmount, setSaveAmount] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  
  if (!category) return null;

  const categoryTransactions = transactions.filter(t => t.categoryId === category.id);
  
  const handleSave = () => {
    if (!saveAmount || parseFloat(saveAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!selectedProject) {
      toast.error("Please select a savings project");
      return;
    }
    
    const project = savingsProjects.find(p => p.id === selectedProject);
    
    toast.success(`$${saveAmount} saved to ${project?.name}`);
    setSaveAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className={cn("w-3 h-3 rounded-full", category.color)}></span>
            {category.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Transactions List */}
          <div>
            <h3 className="text-lg font-medium mb-2">Recent Transactions</h3>
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

          {/* Save Money Form */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Add to Savings</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="saveAmount">Amount</Label>
                  <Input
                    id="saveAmount"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    value={saveAmount}
                    onChange={(e) => setSaveAmount(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="saveProject">Save to</Label>
                  <select 
                    id="saveProject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                  >
                    <option value="">Select Project</option>
                    {savingsProjects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={handleSave}
              >
                Save Money
              </Button>
            </div>
          </div>

          {/* Savings Projects */}
          <div>
            <h3 className="text-lg font-medium mb-3">Your Savings Projects</h3>
            <div className="space-y-3">
              {savingsProjects.map((project) => {
                const progressPercentage = (project.current / project.target) * 100;
                
                return (
                  <div 
                    key={project.id} 
                    className="border rounded-lg p-4 bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {project.id === "sofa" && <Sofa size={18} className="text-finance-accent" />}
                        <span className="font-medium">{project.name}</span>
                      </div>
                      <div>
                        {formatCurrency(project.current)} / {formatCurrency(project.target)}
                      </div>
                    </div>
                    
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-mint-500" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    {project.portfolioItemId && (
                      <div className="mt-2 flex justify-end">
                        <Link 
                          to={`/${project.portfolioItemId}`} 
                          className="text-sm text-finance-accent hover:underline"
                        >
                          View in Portfolio →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
