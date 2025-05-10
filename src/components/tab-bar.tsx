
import { useState } from "react";
import { Wallet, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AccountSwitcher } from "./account-switcher";

interface TabBarProps {
  currentTab?: string;
  showAccountSwitcher?: boolean;
}

export function TabBar({ currentTab = "home", showAccountSwitcher = false }: TabBarProps) {
  const [currentAccount, setCurrentAccount] = useState({
    id: "1",
    name: "Personal",
    type: "personal",
    initial: "J"
  });
  
  const accounts = [
    {
      id: "1",
      name: "Personal",
      type: "personal",
      initial: "J"
    },
    {
      id: "2",
      name: "Joint Account",
      type: "joint",
      initial: "J",
      partnerInitial: "A"
    }
  ];
  
  const tabs = [
    { id: "home", icon: Wallet, label: "Cash", path: "/" },
    { id: "wealth", icon: LayoutGrid, label: "Wealth", path: "/wealth" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 border-t border-gray-700 flex justify-around py-2 px-4 z-10 backdrop-blur-sm">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const IconComponent = tab.icon;
        
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className={cn(
              "flex flex-col items-center px-3 py-1 relative",
              isActive ? "text-white" : "text-gray-400"
            )}
          >
            <div className="relative">
              <IconComponent size={20} />
              {isActive && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-pink-500"></div>
              )}
            </div>
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
            
            {isActive && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 rounded-full bg-pink-500"></div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
