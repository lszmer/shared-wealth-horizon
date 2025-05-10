
import { createContext, useContext, useState, ReactNode } from "react";
import { categoryTiles } from "@/data/mockData";
import { CategoryTile } from "@/types/portfolio";

type TileContextType = {
  visibleTiles: CategoryTile[];
  toggleTileVisibility: (tileId: string) => void;
  isTileVisible: (tileId: string) => boolean;
  availableTiles: CategoryTile[];
};

const TileVisibilityContext = createContext<TileContextType | undefined>(undefined);

export const useTileVisibility = () => {
  const context = useContext(TileVisibilityContext);
  if (!context) {
    throw new Error("useTileVisibility must be used within a TileVisibilityProvider");
  }
  return context;
};

export const TileVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [visibleTileIds, setVisibleTileIds] = useState<string[]>([]);
  
  // Filter category tiles based on visibility state
  const visibleTiles = categoryTiles.filter(tile => visibleTileIds.includes(tile.id));
  
  // All available tiles excluding "loans"
  const availableTiles = categoryTiles.filter(category => category.id !== "loans");
  
  // Toggle a tile's visibility
  const toggleTileVisibility = (tileId: string) => {
    setVisibleTileIds(prevIds => {
      if (prevIds.includes(tileId)) {
        return prevIds.filter(id => id !== tileId);
      } else {
        return [...prevIds, tileId];
      }
    });
  };
  
  // Check if a tile is visible
  const isTileVisible = (tileId: string) => {
    return visibleTileIds.includes(tileId);
  };
  
  return (
    <TileVisibilityContext.Provider value={{ 
      visibleTiles, 
      toggleTileVisibility, 
      isTileVisible,
      availableTiles
    }}>
      {children}
    </TileVisibilityContext.Provider>
  );
};
