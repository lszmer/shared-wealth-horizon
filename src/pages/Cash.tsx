
import { useState } from "react";
import { TabBar } from "@/components/tab-bar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  Sankey, 
  Tooltip,
  Rectangle, 
  Layer, 
  Label
} from "recharts";

// Sample cash flow data for the Sankey diagram
const cashFlowData = {
  nodes: [
    { name: 'Income' },
    { name: 'Salary' },
    { name: 'Investments' },
    { name: 'Expenses' },
    { name: 'Housing' },
    { name: 'Food' },
    { name: 'Travel' },
    { name: 'Entertainment' },
    { name: 'Savings' },
    { name: 'Emergency Fund' },
    { name: 'Retirement' },
  ],
  links: [
    { source: 0, target: 1, value: 5000, color: '#F97316' },
    { source: 0, target: 2, value: 1500, color: '#F97316' },
    { source: 1, target: 3, value: 3000, color: '#ea384c' },
    { source: 1, target: 8, value: 2000, color: '#33C3F0' },
    { source: 3, target: 4, value: 1200, color: '#ea384c' },
    { source: 3, target: 5, value: 800, color: '#ea384c' },
    { source: 3, target: 6, value: 500, color: '#ea384c' },
    { source: 3, target: 7, value: 500, color: '#ea384c' },
    { source: 8, target: 9, value: 800, color: '#33C3F0' },
    { source: 8, target: 10, value: 1200, color: '#33C3F0' },
  ],
};

// Custom Sankey node with enhanced styling
const CustomSankeyNode = ({ x, y, width, height, index, payload }: any) => {
  const colors = {
    'Income': '#F97316',
    'Salary': '#F97316',
    'Investments': '#F97316',
    'Expenses': '#ea384c',
    'Housing': '#ea384c',
    'Food': '#ea384c',
    'Travel': '#ea384c',
    'Entertainment': '#ea384c',
    'Savings': '#33C3F0',
    'Emergency Fund': '#33C3F0',
    'Retirement': '#33C3F0',
  };
  const nodeName = payload.name;
  const color = colors[nodeName as keyof typeof colors] || '#8E9196';

  return (
    <>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        fillOpacity={0.9}
        rx={4}
        ry={4}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#FFFFFF"
        fontSize={12}
        fontWeight={500}
      >
        {nodeName}
      </text>
    </>
  );
};

// Custom Link with enhanced styling
const CustomSankeyLink = (props: any) => {
  const { sourceX, targetX, sourceY, targetY, sourceControlX, targetControlX, linkWidth, index } = props;
  const linkColor = props.payload.color;
  
  return (
    <Layer key={`CustomLink-${index}`}>
      <path
        d={`
          M${sourceX},${sourceY + linkWidth / 2}
          C${sourceControlX},${sourceY + linkWidth / 2}
          ${targetControlX},${targetY + linkWidth / 2}
          ${targetX},${targetY + linkWidth / 2}
        `}
        fill="none"
        stroke={linkColor}
        strokeWidth={linkWidth}
        strokeOpacity={0.5}
      />
    </Layer>
  );
};

// Custom Tooltip for the Sankey diagram
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 border border-gray-700 rounded-md text-xs">
        <p className="text-white font-medium">{`${payload[0].payload.source.name} → ${payload[0].payload.target.name}`}</p>
        <p className="text-gray-300">{`Value: $${payload[0].payload.value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function Cash() {
  return (
    <div className="min-h-screen bg-[#1A1F2C] pb-20">
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="bg-pink-500 p-1.5 rounded-md">
            <Wallet size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Cash Flow</h1>
        </div>
        
        <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white font-medium">Cash Flow Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[480px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <Sankey
                  data={cashFlowData}
                  node={<CustomSankeyNode />}
                  link={<CustomSankeyLink />}
                  nodePadding={40}
                  margin={{
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                  }}
                >
                  <Tooltip content={<CustomTooltip />} />
                </Sankey>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#F97316] rounded-sm"></div>
            <span className="text-xs text-gray-300">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ea384c] rounded-sm"></div>
            <span className="text-xs text-gray-300">Expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#33C3F0] rounded-sm"></div>
            <span className="text-xs text-gray-300">Savings</span>
          </div>
        </div>
      </div>
      
      <TabBar currentTab="home" />
    </div>
  );
}
