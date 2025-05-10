
import { 
  calculateNetWorth, 
  calculateTotalAssets, 
  calculateTotalLiabilities, 
  getNetValuesByCategory 
} from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function NetWorthSummary() {
  const assets = calculateTotalAssets();
  const liabilities = calculateTotalLiabilities();
  const netWorth = calculateNetWorth();
  
  // Get net values by category for the pie chart
  const netValuesByCategory = getNetValuesByCategory();
  
  // Colors for different categories
  const CATEGORY_COLORS = {
    home: "#4299e1", // blue
    investments: "#9b87f5", // purple
    vehicles: "#48bb78", // green
    valuables: "#f687b3", // pink
  };

  // Chart configuration for categories
  const chartConfig = {
    home: { label: "Home", color: "#4299e1" },
    investments: { label: "Investments", color: "#9b87f5" },
    vehicles: { label: "Vehicles", color: "#48bb78" },
    valuables: { label: "Valuables", color: "#f687b3" },
  };
  
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
      
      <div className="h-40 relative">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={netValuesByCategory}
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
                {netValuesByCategory.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CATEGORY_COLORS[entry.id as keyof typeof CATEGORY_COLORS]} 
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={<ChartTooltipContent labelKey="name" />}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-sm text-gray-500">Net</div>
          <div className="font-semibold">{formatCurrency(netWorth)}</div>
        </div>
      </div>
    </div>
  );
}
