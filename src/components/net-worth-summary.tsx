
import { 
  calculateNetWorth, 
  calculateTotalAssets, 
  calculateTotalLiabilities
} from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";

export function NetWorthSummary() {
  const assets = calculateTotalAssets();
  const liabilities = calculateTotalLiabilities();
  const netWorth = calculateNetWorth();
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-50 rounded-full opacity-50"></div>
      <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-blue-50 rounded-full opacity-50"></div>
      <h2 className="text-xl font-semibold mb-3">Net Worth</h2>
      
      <div className="flex justify-between mb-4">
        <div className="bg-purple-50 rounded-lg p-3 flex-1 mr-2">
          <div className="text-sm text-gray-500">Assets</div>
          <div className="text-lg font-medium text-finance-dark">
            {formatCurrency(assets)}
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-3 flex-1">
          <div className="text-sm text-gray-500">Liabilities</div>
          <div className="text-lg font-medium text-finance-negative">
            {formatCurrency(liabilities)}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center items-center h-20">
        <div className="text-center">
          <div className="text-sm text-gray-500">Net Worth</div>
          <div className="text-2xl font-semibold">{formatCurrency(netWorth)}</div>
        </div>
      </div>
    </div>
  );
}
