
import { Home, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AccountSwitcher } from "@/components/account-switcher";
import { useState } from "react";
import { accounts } from "@/data/mockData";
import { Account } from "@/types/portfolio";

interface TabBarProps {
  currentTab?: string;
  showAccountSwitcher?: boolean;
}

export function TabBar({ currentTab = "home", showAccountSwitcher = false }: TabBarProps) {
  const [currentAccount, setCurrentAccount] = useState<Account>(accounts[0]);
  
  const tabs = [
    { id: "home", icon: Home, label: "Cash", path: "/" },
    { id: "portfolio", icon: LayoutGrid, label: "Portfolio", path: "/portfolio" },
  ];

  const handleAccountChange = (account: Account) => {
    setCurrentAccount(account);
  };

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
      
      {showAccountSwitcher && (
        <div className="flex flex-col items-center px-3 py-1">
          <AccountSwitcher
            accounts={accounts}
            currentAccount={currentAccount}
            onAccountChange={handleAccountChange}
            bottomTab={true}
          />
          <span className="text-xs mt-1 font-medium text-gray-400">Account</span>
        </div>
      )}
    </div>
  );
}
