
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AccountSwitcher } from "@/components/account-switcher";
import { accounts } from "@/data/mockData";
import { useState } from "react";
import { Account } from "@/types/portfolio";

export function DashboardHeader() {
  const [currentAccount, setCurrentAccount] = useState<Account>(accounts[0]);
  const location = useLocation();
  const isPortfolioPage = location.pathname === "/portfolio";
  const isCashPage = location.pathname === "/";
  
  const handleAccountChange = (account: Account) => {
    setCurrentAccount(account);
  };

  return (
    <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center">
      {!isPortfolioPage && !isCashPage && (
        <Link to="/portfolio" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
      )}
      <div className="flex-1">
        <AccountSwitcher
          accounts={accounts}
          currentAccount={currentAccount}
          onAccountChange={handleAccountChange}
        />
      </div>
    </div>
  );
}
