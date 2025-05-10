
import { useState } from "react";
import { Sofa, Plus, UserPlus, Calendar, Save, DollarSign } from "lucide-react";
import { TabBar } from "@/components/tab-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Furniture as FurnitureType, Contribution } from "@/types/portfolio";

// Sample furniture data
const initialFurnitureData: FurnitureType[] = [
  {
    id: "furn1",
    name: "Sofa",
    description: "Living room sofa",
    value: 2500,
    targetValue: 2500,
    moneySaved: 1000,
    type: "other",
    dueDate: "2025-10-15",
    invited: ["Alex"],
    contributions: [
      { contributorName: "You", amount: 600 },
      { contributorName: "Alex", amount: 400 }
    ]
  },
  {
    id: "furn2",
    name: "Dining Table",
    description: "Kitchen dining table with 6 chairs",
    value: 1800,
    targetValue: 1800,
    moneySaved: 500,
    type: "other",
    dueDate: "2025-08-20",
    contributions: [
      { contributorName: "You", amount: 500 }
    ]
  }
];

export default function Furniture() {
  const [furnitureItems, setFurnitureItems] = useState<FurnitureType[]>(initialFurnitureData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  const [newItem, setNewItem] = useState<Partial<FurnitureType>>({
    name: "",
    value: 0,
    targetValue: 0,
    moneySaved: 0,
    description: "",
    dueDate: ""
  });

  const [contribution, setContribution] = useState({
    amount: 0,
    contributorName: "You"
  });

  const contacts = [
    { id: "alex", name: "Alex", avatar: "A" },
    { id: "emma", name: "Emma", avatar: "E" },
    { id: "john", name: "John", avatar: "J" }
  ];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.value) {
      toast.error("Please fill in all required fields");
      return;
    }

    const targetVal = newItem.targetValue || newItem.value || 0;

    const newFurnitureItem: FurnitureType = {
      id: `furn${Date.now()}`,
      name: newItem.name || "",
      description: newItem.description,
      value: Number(newItem.value) || 0,
      targetValue: targetVal,
      moneySaved: Number(newItem.moneySaved) || 0,
      type: "other",
      dueDate: newItem.dueDate,
      contributions: newItem.moneySaved && newItem.moneySaved > 0 ? [
        { contributorName: "You", amount: Number(newItem.moneySaved) }
      ] : []
    };

    setFurnitureItems([...furnitureItems, newFurnitureItem]);
    setNewItem({ name: "", value: 0, targetValue: 0, moneySaved: 0, description: "", dueDate: "" });
    setIsAddDialogOpen(false);
    toast.success(`${newItem.name} has been added`);
  };

  const handleInvite = (contactId: string) => {
    if (!selectedItemId) return;
    
    setFurnitureItems(items => 
      items.map(item => {
        if (item.id === selectedItemId) {
          const contact = contacts.find(c => c.id === contactId);
          if (contact) {
            const invited = item.invited ? [...item.invited] : [];
            if (!invited.includes(contact.name)) {
              invited.push(contact.name);
              toast.success(`${contact.name} has been invited to join the ${item.name} project`);
              return { ...item, invited };
            }
            toast.error(`${contact.name} is already invited to this project`);
          }
        }
        return item;
      })
    );
    
    setIsInviteDialogOpen(false);
  };

  const handleAddContribution = () => {
    if (!selectedItemId || contribution.amount <= 0) return;

    setFurnitureItems(items => 
      items.map(item => {
        if (item.id === selectedItemId) {
          const existingContributions = item.contributions || [];
          const existingIndex = existingContributions.findIndex(
            c => c.contributorName === contribution.contributorName
          );
          
          let newContributions: Contribution[];
          if (existingIndex >= 0) {
            // Update existing contribution
            newContributions = [...existingContributions];
            newContributions[existingIndex] = {
              ...newContributions[existingIndex],
              amount: newContributions[existingIndex].amount + contribution.amount
            };
          } else {
            // Add new contribution
            newContributions = [...existingContributions, {
              contributorName: contribution.contributorName,
              amount: contribution.amount
            }];
          }

          // Update total money saved
          const newMoneySaved = newContributions.reduce((sum, c) => sum + c.amount, 0);

          toast.success(`Added ${formatCurrency(contribution.amount)} from ${contribution.contributorName}`);
          return { ...item, contributions: newContributions, moneySaved: newMoneySaved };
        }
        return item;
      })
    );
    
    setContribution({ amount: 0, contributorName: "You" });
    setIsContributeDialogOpen(false);
  };

  // Calculate total furniture value and money saved
  const totalValue = furnitureItems.reduce((sum, item) => sum + item.targetValue, 0);
  const totalSaved = furnitureItems.reduce((sum, item) => sum + item.moneySaved, 0);
  const totalOutstanding = totalValue - totalSaved;

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-500 p-1.5 rounded-md">
              <Sofa size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Furniture</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={16} /> Add Item
          </Button>
        </div>
        
        <Card className="bg-indigo-500/10 border-indigo-300/20">
          <CardContent className="pt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-400">Total Target</div>
              <div className="text-xl font-bold text-white">{formatCurrency(totalValue)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Saved</div>
              <div className="text-xl font-bold text-green-400">{formatCurrency(totalSaved)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Outstanding</div>
              <div className="text-xl font-bold text-pink-400">{formatCurrency(totalOutstanding)}</div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {furnitureItems.map((item) => {
            const outstanding = item.targetValue - item.moneySaved;
            const progressPercentage = item.targetValue > 0 ? 
              Math.min(100, (item.moneySaved / item.targetValue) * 100) : 0;
            
            const yourContribution = item.contributions?.find(c => c.contributorName === "You")?.amount || 0;
            const alexContribution = item.contributions?.find(c => c.contributorName === "Alex")?.amount || 0;

            return (
              <Card key={item.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex justify-between items-center">
                    <span>{item.name}</span>
                    <span className="text-lg font-medium">{formatCurrency(item.targetValue)}</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {item.description && (
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  )}
                  
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Saved</p>
                      <p className="text-white font-medium">{formatCurrency(item.moneySaved)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Outstanding</p>
                      <p className="text-pink-400 font-medium">{formatCurrency(outstanding)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2 border-t border-gray-700 pt-3">
                    <div>
                      <p className="text-sm text-gray-400">Your contribution</p>
                      <p className="text-white font-medium">{formatCurrency(yourContribution)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Alex's contribution</p>
                      <p className="text-white font-medium">{formatCurrency(alexContribution)}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 items-center text-sm">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-gray-300">
                      {item.dueDate 
                        ? `Target date: ${new Date(item.dueDate).toLocaleDateString()}`
                        : "No target date set"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      {item.invited && item.invited.length > 0 ? (
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {item.invited.map((name, idx) => (
                              <div key={idx} className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white border border-gray-800">
                                {name.charAt(0)}
                              </div>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-400">Sharing with {item.invited.join(", ")}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not shared</span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-white"
                        onClick={() => {
                          setSelectedItemId(item.id);
                          setIsContributeDialogOpen(true);
                        }}
                      >
                        <DollarSign size={14} className="mr-1" /> Add Money
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-white"
                        onClick={() => {
                          setSelectedItemId(item.id);
                          setIsInviteDialogOpen(true);
                        }}
                      >
                        <UserPlus size={14} className="mr-1" /> Invite
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <TabBar currentTab="portfolio" />
      
      {/* Add Furniture Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Add New Furniture</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Name*</Label>
              <Input 
                id="title" 
                placeholder="Sofa, Table, etc." 
                value={newItem.name} 
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetValue">Target Price*</Label>
              <Input 
                id="targetValue" 
                placeholder="2000" 
                type="number"
                value={newItem.targetValue || ''} 
                onChange={(e) => setNewItem({...newItem, targetValue: parseFloat(e.target.value), value: parseFloat(e.target.value)})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moneySaved">Initial Savings (Optional)</Label>
              <Input 
                id="moneySaved" 
                placeholder="500" 
                type="number"
                value={newItem.moneySaved || ''} 
                onChange={(e) => setNewItem({...newItem, moneySaved: parseFloat(e.target.value)})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                placeholder="Description of the furniture item" 
                value={newItem.description || ''} 
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Target Date (Optional)</Label>
              <Input 
                id="dueDate" 
                type="date" 
                value={newItem.dueDate || ''} 
                onChange={(e) => setNewItem({...newItem, dueDate: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
              className="border-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddItem}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Save size={16} className="mr-2" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Invite to share</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Select a person to share this furniture item with:</p>
            
            <div className="space-y-2">
              {contacts.map(contact => (
                <div 
                  key={contact.id} 
                  className="flex items-center justify-between p-3 border border-gray-700 rounded-md hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleInvite(contact.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      {contact.avatar}
                    </div>
                    <span>{contact.name}</span>
                  </div>
                  <UserPlus size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsInviteDialogOpen(false)}
              className="border-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contribute Money Dialog */}
      <Dialog open={isContributeDialogOpen} onOpenChange={setIsContributeDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Add Money</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount" 
                placeholder="100" 
                type="number"
                value={contribution.amount || ''} 
                onChange={(e) => setContribution({...contribution, amount: parseFloat(e.target.value) || 0})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contributor">Contributor</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={contribution.contributorName === "You" ? "default" : "outline"}
                  className={contribution.contributorName === "You" ? "bg-indigo-600" : "border-gray-600"}
                  onClick={() => setContribution({...contribution, contributorName: "You"})}
                >
                  You
                </Button>
                <Button
                  type="button"
                  variant={contribution.contributorName === "Alex" ? "default" : "outline"}
                  className={contribution.contributorName === "Alex" ? "bg-indigo-600" : "border-gray-600"}
                  onClick={() => setContribution({...contribution, contributorName: "Alex"})}
                >
                  Alex
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsContributeDialogOpen(false)}
              className="border-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddContribution}
              className="bg-green-600 hover:bg-green-700"
              disabled={contribution.amount <= 0}
            >
              <Save size={16} className="mr-2" /> Add Money
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
