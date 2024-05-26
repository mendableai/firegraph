// components/Graph.tsx

import { Theme } from "@/lib/theme";
import { AreaChart, Color } from "@tremor/react";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

export default function Graph({
  padding,
  theme,
  background,
  darkMode,
  chartRef,
}: {
  padding: number;
  theme: Theme;
  background: boolean;
  darkMode: boolean;
  chartRef: React.RefObject<HTMLDivElement>;
}) {
  const mockchartdata = [
    {
      date: "Apr 15",
      Stars: 0,
    },
    {
      date: "Apr 18",
      Stars: 480,
    },
    {
      date: "Apr 19",
      Stars: 720,
    },
    {
      date: "Apr 20",
      Stars: 990,
    },
    {
      date: "Apr 22",
      Stars: 1260,
    },
    {
      date: "Apr 23",
      Stars: 1530,
    },
    {
      date: "Apr 27",
      Stars: 1800,
    },
    {
      date: "Apr 28",
      Stars: 2040,
    },
    {
      date: "May 01",
      Stars: 2310,
    },
    {
      date: "May 06",
      Stars: 2580,
    },
    {
      date: "May 16",
      Stars: 2850,
    },
    {
      date: "May 18",
      Stars: 3120,
    },
    {
      date: "May 19",
      Stars: 3360,
    },
    {
      date: "May 20",
      Stars: 3630,
    },
    {
      date: "May 21",
      Stars: 3900,
    },
    {
      date: "May 25",
      Stars: 4594,
    },
  ];

  const [chartData, setChartData] = useState(mockchartdata);
  const maxStars = Math.max(...mockchartdata.map((data) => data.Stars));
  const [maxValue, setMaxValue] = useState(maxStars);

  return (
    <div
      className={`${!background ? "border border-gray-300/25" : ""} rounded-lg`}
    >
      <div
        className="cc flex items-center justify-center h-fit resize-x overflow-auto"
        style={{
          background: background ? theme.gradient : "transparent",
        }}
        ref={chartRef}
      >
        <div style={{ padding: `${padding}px` }} className="transition-all">
          <div
            className={`rounded-lg p-4 ${
              darkMode ? "bg-black bg-opacity-90" : "bg-white bg-opacity-90"
            }`}
          >
            <div className="w-full flex flex-col items-center mb-4">
              <div className="w-full flex space-x-2 mb-2">
                <div
                  className={`w-3 h-3 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded-full dark-mode-circle`}
                ></div>
                <div
                  className={`w-3 h-3 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded-full dark-mode-circle`}
                ></div>
                <div
                  className={`w-3 h-3 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded-full dark-mode-circle`}
                ></div>
              </div>
              <div className="w-full text-center">
                <div contentEditable className="focus:outline-none text-sm text-zinc-500 focus:ring-2 mx-2 rounded-md focus:ring-zinc-300">Your awesome graph</div>
              </div>
            </div>
            <div className="pt-6 text-xs">
              <AreaChart
                className="h-72 w-96"
                data={chartData}
                index="date"
                categories={["Stars"]}
                colors={[theme.color]}
                showGridLines={!darkMode}
                yAxisWidth={35}
                showLegend={false}
                yAxisLabel="Stars"
                xAxisLabel="Date"
                valueFormatter={(value) => {
                  if (value > 99) {
                    return (value / 1000).toFixed(1) + "k";
                  }
                  return value.toString();
                }}
                maxValue={maxValue}
                connectNulls={true}
                curveType="natural"
              />
            </div>
          </div>
        </div>
        {/* <Image
        src="/GraphExample.png"
        alt="Graph Example"
        width={500}
        height={500}
        priority
      /> */}
      </div>
    </div>
  );
}
