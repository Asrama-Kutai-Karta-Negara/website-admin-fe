import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { RadialBar, RadialBarChart } from "recharts";

interface CircularChartProps {
  value: number;
  total: number;
  colorMain: string;
}

const CircularChart: React.FC<CircularChartProps> = ({ value, total, colorMain }) => {
  const data = [
    {
      name: "Total",
      count: total,
      fill: "white",
    },
    {
      name: "Penghuni",
      count: value,
      fill: colorMain,
    },
  ];
  const textColor = `text-[${colorMain}] dark:text-white`;
  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="80%"
        outerRadius="100%"
        barSize={10}
        data={data}
        width={100}
        height={100}
      >
        <RadialBar background dataKey="count" />
      </RadialBarChart>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className="absolute text-xs text-center cursor-pointer">
              <span className="text-gray-400">Total</span>
              <div className={`font-semibold ${textColor}`}>{total}</div>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content
            side="top"
            align="center"
            className="bg-black text-white text-xs rounded-md px-2 py-1 shadow-md"
          >
            Progress %
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export default CircularChart;