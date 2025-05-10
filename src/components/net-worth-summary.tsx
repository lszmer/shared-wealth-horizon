
import { calculateNetWorth, calculateTotalAssets, calculateTotalLiabilities } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-3">Net Worth</h2>
      
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-sm text-gray-500">Assets</div>
          <div className="text-lg font-medium text-finance-dark">{formatCurrency(assets)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Liabilities</div>
          <div className="text-lg font-medium text-finance-negative">{formatCurrency(liabilities)}</div>
        </div>
      </div>
      
      <div className="h-40">
        <ChartContainer
          config={{
            assets: { color: "#9b87f5" },
            liabilities: { color: "#ef4444" },
          }}
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
          </PieChart>
        </ChartContainer>
      </div>
      
      <div className="flex justify-center items-center mt-2">
        <div className="text-center">
          <div className="text-sm text-gray-500">Total Net Worth</div>
          <div className="text-2xl font-bold text-finance-dark">{formatCurrency(netWorth)}</div>
        </div>
      </div>
    </div>
  );
}
