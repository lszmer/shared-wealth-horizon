
import { useEffect, useState, useRef } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface PortfolioChartProps {
  data: { value: number }[];
  color?: string;
  height?: number;
}

export function PortfolioChart({ 
  data, 
  color = "#9b87f5",
  height = 100 
}: PortfolioChartProps) {
  const [chartData, setChartData] = useState(data);
  
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function generateChartData(points: number = 20, trend: 'up' | 'down' | 'mixed' = 'mixed') {
  const data = [];
  let value = 1000 + Math.random() * 500;
  
  for (let i = 0; i < points; i++) {
    switch(trend) {
      case 'up':
        value += Math.random() * 100 - 20; // Mostly up
        break;
      case 'down':
        value -= Math.random() * 100 - 20; // Mostly down
        break;
      case 'mixed':
      default:
        value += Math.random() * 100 - 50; // Mixed
    }
    
    // Make sure value doesn't go negative
    value = Math.max(value, 200);
    data.push({ value });
  }
  
  return data;
}
