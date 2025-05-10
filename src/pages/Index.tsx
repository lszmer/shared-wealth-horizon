
import { useState } from "react";
import { AccountSwitcher } from "@/components/account-switcher";
import { AccountBalance } from "@/components/account-balance";
import { InvestmentList } from "@/components/investment-list";
import { TabBar } from "@/components/tab-bar";

// Mock data
const accounts = [
  {
    id: "personal1",
    type: "personal" as const,
    name: "My Account",
    initial: "D",
  },
  {
    id: "joint1",
    type: "joint" as const,
    name: "Shared with Alex",
    initial: "D",
    partnerInitial: "A",
  },
];

const investments = [
  {
    id: "inv1",
    name: "Tesla",
    value: 997.60,
    percentageChange: 0.34,
    logo: "https://storage.googleapis.com/iex/api/logos/TSLA.png",
  },
  {
    id: "inv2",
    name: "Meta Platforms",
    value: 305.15,
    percentageChange: 0.33,
    logo: "https://storage.googleapis.com/iex/api/logos/META.png",
  },
  {
    id: "inv3",
    name: "MSCI World EUR",
    value: 283.78,
    percentageChange: 0.17,
  },
  {
    id: "inv4",
    name: "Apple",
    value: 144.66,
    percentageChange: 0.33,
    logo: "https://storage.googleapis.com/iex/api/logos/AAPL.png",
  },
];

const realEstate = [
  {
    id: "re1",
    name: "City Apartment",
    value: 450000,
    percentageChange: 2.3,
  },
  {
    id: "re2",
    name: "Vacation Home",
    value: 320000,
    percentageChange: -0.5,
  },
];

export default function Index() {
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <AccountSwitcher
          accounts={accounts}
          currentAccount={currentAccount}
          onAccountChange={setCurrentAccount}
        />
      </div>

      {/* Main content */}
      <div className="p-4 space-y-6">
        <div className="finance-card">
          <AccountBalance 
            balance={2460.21} 
            percentageChange={0.16}
            type={currentAccount.type}
          />
        </div>
        
        <div className="finance-card">
          <InvestmentList investments={investments} />
        </div>

        <div className="finance-card">
          <InvestmentList 
            investments={realEstate} 
            title="Real Estate" 
            sortBy="value"
          />
        </div>
        
        <div className="finance-card bg-finance-accent/5">
          <h2 className="text-xl font-medium mb-3">Loan Analysis</h2>
          <p className="text-gray-600 mb-3">
            Compare different mortgage options for your next real estate investment.
          </p>
          <button className="bg-finance-accent text-white px-4 py-2 rounded-lg w-full">
            Compare Loans
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <TabBar currentTab="home" />
    </div>
  );
}
