
import { useState } from "react";
import { Sofa, Plus, UserPlus, Calendar, Save } from "lucide-react";
import { TabBar } from "@/components/tab-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { accounts } from "@/data/mockData";
import { Valuable } from "@/types/portfolio";

interface FurnitureItem extends Valuable {
  dueDate?: string;
  invited?: string[];
}

// Sample furniture data
const initialFurnitureData: FurnitureItem[] = [
  {
    id: "furn1",
    name: "Sofa",
    description: "Living room sofa",
    value: 2500,
    type: "other",
    dueDate: "2025-10-15",
    invited: ["Alex"]
  },
  {
    id: "furn2",
    name: "Dining Table",
    description: "Kitchen dining table with 6 chairs",
    value: 1800,
    type: "other",
    dueDate: "2025-08-20"
  }
];

export default function Furniture() {
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>(initialFurnitureData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  const [newItem, setNewItem] = useState<Partial<FurnitureItem>>({
    name: "",
    value: 0,
    description: "",
    dueDate: ""
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

    const newFurnitureItem: FurnitureItem = {
      id: `furn${Date.now()}`,
      name: newItem.name || "",
      description: newItem.description,
      value: Number(newItem.value) || 0,
      type: "other",
      dueDate: newItem.dueDate
    };

    setFurnitureItems([...furnitureItems, newFurnitureItem]);
    setNewItem({ name: "", value: 0, description: "", dueDate: "" });
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

  // Calculate total furniture value
  const totalValue = furnitureItems.reduce((sum, item) => sum + item.value, 0);

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
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-gray-400">Total Value</div>
              <div className="text-3xl font-bold text-white">{formatCurrency(totalValue)}</div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {furnitureItems.map((item) => (
            <Card key={item.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="text-lg font-medium">{formatCurrency(item.value)}</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {item.description && (
                  <p className="text-gray-400 text-sm">{item.description}</p>
                )}
                
                <div className="flex gap-2 items-center text-sm">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-gray-300">
                    {item.dueDate 
                      ? `Target date: ${new Date(item.dueDate).toLocaleDateString()}`
                      : "No target date set"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
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
              </CardContent>
            </Card>
          ))}
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
              <Label htmlFor="price">Price*</Label>
              <Input 
                id="price" 
                placeholder="1000" 
                type="number"
                value={newItem.value || ''} 
                onChange={(e) => setNewItem({...newItem, value: parseFloat(e.target.value)})}
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
    </div>
  );
}
