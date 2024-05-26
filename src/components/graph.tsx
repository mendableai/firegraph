// components/Graph.tsx

import { AreaChart, Color } from "@tremor/react";
import { useState } from "react";

export default function Graph({ padding }: { padding: number }) {
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
      className="flex items-center justify-center h-fit w-fit "
      style={{
        background: "linear-gradient(135deg, #fdba74, #f97316)",
      }}
    >
      <div style={{ padding: `${padding}px` }}>
        <div className="bg-white bg-opacity-90 rounded-lg p-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <div className="pt-6 text-xs">
            <AreaChart
              className="h-72 w-96"
              data={chartData}
              index="date"
              categories={["Stars"]}
              colors={["orange-400"]}
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
  );
}
