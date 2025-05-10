
import { calculateNetWorth, calculateTotalAssets, calculateTotalLiabilities } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function NetWorthSummary() {
  const assets = calculateTotalAssets();
  const liabilities = calculateTotalLiabilities();
  const netWorth = calculateNetWorth();
  
  const data = [
    { name: "Assets", value: assets },
    { name: "Liabilities", value: liabilities },
  ];
  
  const COLORS = ["#9b87f5", "#ef4444"];
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-50 rounded-full opacity-50"></div>
      <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-blue-50 rounded-full opacity-50"></div>
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        <span className="bg-finance-accent/10 text-finance-accent p-1 rounded-full mr-2">
          <ArrowUpRight size={18} />
        </span>
        Net Worth
      </h2>
      
      <div className="flex justify-between mb-4">
        <div className="bg-purple-50 rounded-lg p-2 flex-1 mr-2">
          <div className="text-sm text-gray-500">Assets</div>
          <div className="text-lg font-medium text-finance-dark flex items-center">
            <ArrowUpRight className="text-finance-positive mr-1" size={16} />
            {formatCurrency(assets)}
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-2 flex-1">
          <div className="text-sm text-gray-500">Liabilities</div>
          <div className="text-lg font-medium text-finance-negative flex items-center">
            <ArrowDownRight className="text-finance-negative mr-1" size={16} />
            {formatCurrency(liabilities)}
          </div>
        </div>
      </div>
      
      <div className="h-40 relative">
        <ChartContainer
          config={{
            assets: { color: "#9b87f5" },
            liabilities: { color: "#ef4444" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={false}
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="flex justify-center items-center mt-4">
        <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-3 rounded-xl">
          <div className="text-sm text-gray-500">Total Net Worth</div>
          <div className="text-2xl font-bold text-finance-dark">{formatCurrency(netWorth)}</div>
        </div>
      </div>
    </div>
  );
}
