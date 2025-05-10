
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction, SpendingCategory, SavingsProject } from "@/data/spendingData";
import { formatCurrency } from "@/lib/formatters";
import { ArrowLeft, Plus, ArrowRight, Sofa, CreditCard, BanknoteIcon, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FullScreenPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: SpendingCategory | null;
  transactions: Transaction[];
  savingsProjects: SavingsProject[];
}

export function FullScreenPopup({ 
  open, 
  onOpenChange, 
  category, 
  transactions,
  savingsProjects 
}: FullScreenPopupProps) {
  const [saveAmount, setSaveAmount] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("transactions");
  
  if (!category) return null;

  // Filter transactions for this category
  const categoryTransactions = transactions.filter(t => t.categoryId === category.id);
  
  // Get current month and year
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Separate current month transactions from previous
  const currentMonthTransactions = categoryTransactions.filter(t => {
    const transDate = new Date(t.date);
    return transDate.getMonth() === currentMonth && 
           transDate.getFullYear() === currentYear;
  });
  
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

  const isSavingsCategory = category.id === "savings";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-3xl border-none bg-gray-800">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <ArrowLeft size={20} className="text-gray-300" />
              </button>
              <div className="flex items-center gap-2">
                <span className={cn("w-3 h-3 rounded-full", category.color)}></span>
                <h2 className="text-xl font-semibold text-white">{category.name}</h2>
              </div>
            </div>
            <div className="text-xl font-bold text-white">
              {formatCurrency(category.amount)}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-grow overflow-y-auto px-5 pt-4 pb-20">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full bg-gray-700 p-1 mb-6">
                <TabsTrigger 
                  value="transactions" 
                  className="flex-1 data-[state=active]:bg-gray-600"
                >
                  <CreditCard size={16} className="mr-2" />
                  Transactions
                </TabsTrigger>
                
                <TabsTrigger 
                  value="insights" 
                  className="flex-1 data-[state=active]:bg-gray-600"
                >
                  <BarChart3 size={16} className="mr-2" />
                  Insights
                </TabsTrigger>
                
                {isSavingsCategory && (
                  <TabsTrigger 
                    value="savings" 
                    className="flex-1 data-[state=active]:bg-gray-600"
                  >
                    <BanknoteIcon size={16} className="mr-2" />
                    Savings
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="transactions" className="space-y-6">
                {/* Current Month Transactions */}
                <div className="bg-gray-700 rounded-xl p-4">
                  <h3 className="font-medium text-white mb-3">This Month</h3>
                  {currentMonthTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {currentMonthTransactions.map((transaction) => (
                        <div 
                          key={transaction.id} 
                          className="flex items-center justify-between bg-gray-600 p-4 rounded-lg"
                        >
                          <div>
                            <div className="text-white">{transaction.description}</div>
                            <div className="text-sm text-gray-300">{transaction.date}</div>
                          </div>
                          <div className="text-white font-medium">
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No transactions this month
                    </div>
                  )}
                </div>

                {/* Add Transaction Button */}
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white gap-2">
                  <Plus size={16} /> Add Transaction
                </Button>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="bg-gray-700 rounded-xl p-6 text-center">
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">Monthly Average</div>
                    <div className="text-3xl font-bold text-white">
                      {formatCurrency(category.amount * 0.8)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-600 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Highest</div>
                      <div className="text-xl font-semibold text-white">
                        {formatCurrency(category.amount * 1.2)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">March 2024</div>
                    </div>
                    
                    <div className="bg-gray-600 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Lowest</div>
                      <div className="text-xl font-semibold text-white">
                        {formatCurrency(category.amount * 0.6)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">January 2024</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {isSavingsCategory && (
                <TabsContent value="savings" className="space-y-6">
                  {/* Save Money Form */}
                  <div className="bg-gray-700 p-5 rounded-xl">
                    <h3 className="text-lg font-medium mb-4 text-white">Add to Savings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="saveAmount" className="text-gray-300">Amount</Label>
                          <Input
                            id="saveAmount"
                            type="number"
                            placeholder="0.00"
                            min="0"
                            value={saveAmount}
                            onChange={(e) => setSaveAmount(e.target.value)}
                            className="bg-gray-600 border-gray-500 text-white"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="saveProject" className="text-gray-300">Save to</Label>
                          <select 
                            id="saveProject"
                            className="flex h-10 w-full rounded-md border border-gray-500 bg-gray-600 px-3 py-2 text-sm text-white"
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
                        className="w-full bg-pink-500 hover:bg-pink-600"
                        onClick={handleSave}
                      >
                        Save Money
                      </Button>
                    </div>
                  </div>

                  {/* Savings Projects */}
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-white">Your Savings Projects</h3>
                    <div className="space-y-3">
                      {savingsProjects.map((project) => {
                        const progressPercentage = (project.current / project.target) * 100;
                        
                        return (
                          <div 
                            key={project.id} 
                            className="border border-gray-600 rounded-lg p-4 bg-gray-700"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                {project.id === "sofa" && <Sofa size={18} className="text-pink-400" />}
                                <span className="font-medium text-white">{project.name}</span>
                              </div>
                              <div className="text-white">
                                {formatCurrency(project.current)} / {formatCurrency(project.target)}
                              </div>
                            </div>
                            
                            <div className="mt-3 h-2 bg-gray-600 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-pink-500" 
                                style={{ width: `${progressPercentage}%` }}
                              ></div>
                            </div>
                            
                            {project.portfolioItemId && (
                              <div className="mt-2 flex justify-end">
                                <Link 
                                  to={`/${project.portfolioItemId}`} 
                                  className="text-sm text-pink-400 hover:underline flex items-center gap-1"
                                >
                                  View in Portfolio <ArrowRight size={14} />
                                </Link>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
