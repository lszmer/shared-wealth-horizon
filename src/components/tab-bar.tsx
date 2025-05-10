
import { Home, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TabBarProps {
  currentTab?: string;
}

export function TabBar({ currentTab = "home" }: TabBarProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Cash", path: "/" },
    { id: "portfolio", icon: LayoutGrid, label: "Portfolio", path: "/portfolio" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-4 z-10">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const IconComponent = tab.icon;
        
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className={cn(
              "flex flex-col items-center px-3 py-1",
              isActive ? "text-finance-dark" : "text-gray-400"
            )}
          >
            <IconComponent size={20} />
            <span className="text-xs mt-1">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
