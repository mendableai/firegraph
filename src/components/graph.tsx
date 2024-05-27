// components/Graph.tsx

import { Theme } from "@/lib/theme";
import { AreaChart, Color } from "@tremor/react";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

export default function Graph({
  padding,
  chartData,
  width,
  xName,
  yName,
  theme,
  background,
  darkMode,
  chartRef,
  graphTitle,
  setGraphTitle,
  maxValue,
  setMaxValue,
  finalChartData,
  setFinalChartData,
}: {
  padding: number;
  chartData: any;
  width: string;
  xName: string;
  yName: string;
  theme: Theme;
  background: boolean;
  darkMode: boolean;
  chartRef: React.RefObject<HTMLDivElement>;
  graphTitle: string;
  setGraphTitle: (graphTitle: string) => void;
  maxValue: number;
  setMaxValue: (maxValue: number) => void;
  finalChartData: any;
  setFinalChartData: (finalChartData: any) => void;
}) {
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
      const maxYValue = Math.max(...chartData.map((data: any) => data[yName]));
      setMaxValue(maxYValue);
      setFinalChartData(chartData);
    }
  }, [chartData, yName]);

  return (
    <div>
      {typeof window !== "undefined" && (
        <div
          className={`${
            !background ? "border border-gray-300/25" : ""
          } rounded-lg scale-75 md:scale-100`}
        >
          <div
            className="cc w-full flex items-center justify-center h-fit resize-x overflow-auto"
            style={{
              background: background ? theme.gradient : "transparent",
              transform:
                window.innerHeight < 700
                  ? "translateY(-50px)"
                  : "translateY(0)",
            }}
            ref={chartRef}
          >
            <div
              style={{ padding: `${padding}px` }}
              className="transition-all "
            >
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
                    <div
                      contentEditable
                      className="focus:outline-none text-sm text-zinc-500 focus:ring-2 mx-2 rounded-md focus:ring-zinc-300"
                    >
                      {graphTitle}
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-row items-center w-full pt-6 text-xs ">
                  <div className="-rotate-90 mb-12  mr-2 text-zinc-500">
                    {yName}
                  </div>
                  <div className="flex flex-col w-full">
                    <AreaChart
                      style={{ width: width + "px" }}
                      className={`h-72 transition-all`}
                      data={finalChartData}
                      index={xName}
                      categories={[yName]}
                      colors={[theme.color]}
                      showGridLines={false}
                      yAxisWidth={35}
                      showAnimation={true}
                      showLegend={false}
                      valueFormatter={(value) => {
                        if (value > 999) {
                          return (value / 1000).toFixed(1) + "k";
                        }
                        return value.toString();
                      }}
                      maxValue={maxValue}
                      connectNulls={true}
                      curveType="monotone"
                    />
                    <p className="mt-2 w-full flex items-center justify-center mx-auto text-md text-zinc-500">
                      {xName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
