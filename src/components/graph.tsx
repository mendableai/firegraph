// components/Graph.tsx

import { AreaChart, Color } from "@tremor/react";
import { useState } from "react";
import { useEffect } from "react";

export default function Graph({
  padding,
  chartData,
  xName,
  yName,
}: {
  padding: number;
  chartData: any;
  xName: string;
  yName: string;
}) {
  const [maxValue, setMaxValue] = useState(0);
  const [finalChartData, setFinalChartData] = useState(chartData);
  useEffect(() => {
    if (
      chartData.length > 0 &&
      "Stars" in chartData[0] &&
      "date" in chartData[0]
    ) {
      const maxStars = Math.max(...chartData.map((data: any) => data.Stars));
      setMaxValue(maxStars);

      setFinalChartData(chartData);
    } else {
      setMaxValue(1000);
      setFinalChartData(chartData);
    }
    console.log(finalChartData);
    console.log(maxValue);
    console.log(yName);
    console.log(xName);
  }, [chartData]);
  return (
    <div
      className="flex items-center justify-center h-fit w-fit "
      style={{
        background: "linear-gradient(135deg, #fdba74, #f97316)",
      }}
    >
      <div style={{ padding: `${padding}px` }} className="transition-all">
        <div className="bg-white bg-opacity-90 rounded-lg p-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <div className="pt-6 text-xs">
            <AreaChart
              style={{
                height: "500px",
                width: "700px",
              }}
              data={finalChartData}
              index="date"
              categories={[yName]}
              colors={["orange-400"]}
              yAxisWidth={35}
              showLegend={false}
              yAxisLabel={yName}
              xAxisLabel={xName}
              valueFormatter={(value) => {
                if (value > 99) {
                  return (value / 1000).toFixed(1) + "k";
                }
                return value.toString();
              }}
              maxValue={maxValue}
              connectNulls={true}
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
