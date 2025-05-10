
import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from "recharts";

interface PortfolioChartProps {
  data: { value: number }[];
  color?: string;
  height?: number;
  areaChart?: boolean;
}

export function PortfolioChart({ 
  data, 
  color = "#9b87f5",
  height = 100,
  areaChart = false
}: PortfolioChartProps) {
  // Create gradient ID based on color to ensure unique gradients for each chart
  const gradientId = `chartGradient-${color.replace('#', '')}`;
  
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        {areaChart ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="100%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        )}
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
