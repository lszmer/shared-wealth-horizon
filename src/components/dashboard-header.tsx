
import { Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AccountSwitcher } from "@/components/account-switcher";
import { accounts } from "@/data/mockData";
import { useState } from "react";
import { Account } from "@/types/portfolio";

export function DashboardHeader() {
  const [currentAccount, setCurrentAccount] = useState<Account>(accounts[0]);
  const location = useLocation();
  
  const handleAccountChange = (account: Account) => {
    setCurrentAccount(account);
  };

  return (
    <div className="bg-white py-2 px-4 sticky top-0 z-10 shadow-sm flex items-center justify-between border-b border-gray-100">
      <div className="flex-none">
        <AccountSwitcher
          accounts={accounts}
          currentAccount={currentAccount}
          onAccountChange={handleAccountChange}
        />
      </div>
      
      <div className="flex-none">
        <Link to="/family" className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={18} className="text-gray-600" />
        </Link>
      </div>
    </div>
  );
}
