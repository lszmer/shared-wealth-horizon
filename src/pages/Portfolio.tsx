
import { useState } from "react";
import { CategoryTile } from "@/components/category-tile";
import { TabBar } from "@/components/tab-bar";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TileEditorDialog } from "@/components/tile-editor-dialog";
import { TileVisibilityProvider, useTileVisibility } from "@/context/TileVisibilityContext";

// Inner component that uses the context
function PortfolioContent() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { visibleTiles } = useTileVisibility();
  
  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-pink-500 p-1.5 rounded-md">
              <Briefcase size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Wealth</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
            onClick={() => setIsEditMode(true)}
          >
            Edit Tiles
          </Button>
        </div>
        
        {visibleTiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleTiles.map((category) => (
              <CategoryTile key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
            <p className="text-gray-400">
              No tiles selected. Click "Edit Tiles" to add financial categories to your dashboard.
            </p>
          </div>
        )}
      </div>
      
      <TabBar currentTab="portfolio" showAccountSwitcher={true} />
      <TileEditorDialog open={isEditMode} onOpenChange={setIsEditMode} />
    </div>
  );
}

// Main export with provider wrapper
export default function Portfolio() {
  return (
    <TileVisibilityProvider>
      <PortfolioContent />
    </TileVisibilityProvider>
  );
}
