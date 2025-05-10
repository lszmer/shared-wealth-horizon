
import { PercentageChange } from "./ui/percentage-change";
import { PortfolioChart, generateChartData } from "./ui/portfolio-chart";
import { TimeFilter } from "./ui/time-filter";

interface AccountBalanceProps {
  balance: number;
  percentageChange: number;
  type?: "personal" | "joint";
  currency?: string;
}

export function AccountBalance({
  balance,
  percentageChange,
  type = "personal",
  currency = "€",
}: AccountBalanceProps) {
  const chartColor = percentageChange >= 0 ? "#22C55E" : "#EF4444";
  const trend = percentageChange >= 0 ? "up" : "down";
  const chartData = generateChartData(30, trend);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-medium">
          {type === "personal" ? "Portfolio" : "Gemeinsam"}{" "}
          <span className="text-gray-400">Cash</span>
        </h2>
        <h1 className="text-4xl font-bold">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2,
          }).format(balance)}
        </h1>
        <PercentageChange value={percentageChange} />
      </div>

      <TimeFilter />

      <PortfolioChart data={chartData} color={chartColor} height={120} />
    </div>
  );
}
