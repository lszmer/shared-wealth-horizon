
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTileVisibility } from "@/context/TileVisibilityContext";
import { Plus, Minus, Home, PiggyBank, Car, Shield, Gem, Sofa } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TileEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TileEditorDialog({ open, onOpenChange }: TileEditorDialogProps) {
  const { availableTiles, toggleTileVisibility, isTileVisible } = useTileVisibility();

  // Get the icon component based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home size={20} />;
      case "piggy-bank":
        return <PiggyBank size={20} />;
      case "car":
        return <Car size={20} />;
      case "shield":
        return <Shield size={20} />;
      case "diamond":
        return <Gem size={20} />;
      case "sofa":
        return <Sofa size={20} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Financial Dashboard</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Select which financial categories to display on your dashboard.
          </p>
          
          <div className="space-y-2">
            {availableTiles.map((tile) => (
              <div 
                key={tile.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isTileVisible(tile.id) ? `bg-${tile.color.split('-')[1]}-100` : "bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-md mr-3 ${tile.color}`}>
                    {getIcon(tile.icon)}
                  </div>
                  <span>{tile.title}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTileVisibility(tile.id)}
                  className={isTileVisible(tile.id) ? "text-red-500 hover:text-red-600" : "text-green-500 hover:text-green-600"}
                >
                  {isTileVisible(tile.id) ? <Minus size={18} /> : <Plus size={18} />}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
