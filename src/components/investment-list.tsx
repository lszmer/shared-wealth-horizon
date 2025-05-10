
import { PortfolioChart, generateChartData } from "./ui/portfolio-chart";
import { PercentageChange } from "./ui/percentage-change";

interface Investment {
  id: string;
  name: string;
  value: number;
  percentageChange: number;
  logo?: string;
}

interface InvestmentListProps {
  investments: Investment[];
  title?: string;
  sortBy?: "alphabetical" | "value" | "performance";
}

export function InvestmentItem({ investment }: { investment: Investment }) {
  const chartColor = investment.percentageChange >= 0 ? "#22C55E" : "#EF4444";
  const trend = investment.percentageChange >= 0 ? "up" : "down";
  const chartData = generateChartData(15, trend);
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="flex items-center gap-3">
        {investment.logo ? (
          <img src={investment.logo} alt={investment.name} className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            {investment.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-medium">{investment.name}</div>
          <div className="text-sm text-gray-500">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 2,
            }).format(investment.value)}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-20 h-10">
          <PortfolioChart data={chartData} color={chartColor} height={40} />
        </div>
        <PercentageChange 
          value={investment.percentageChange} 
          iconSize={14}
          className="text-sm"
        />
      </div>
    </div>
  );
}

export function InvestmentList({
  investments,
  title = "Investments",
  sortBy = "value",
}: InvestmentListProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">{title}</h2>
        <span className="text-sm text-finance-accent">DAILY TREND</span>
      </div>
      <div className="space-y-1">
        {investments.map(investment => (
          <InvestmentItem key={investment.id} investment={investment} />
        ))}
      </div>
    </div>
  );
}
