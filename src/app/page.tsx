// pages/index.tsx

"use client";

import Menu from "../components/menu";
import Graph from "../components/graph";
import { useState } from "react";

export default function Home() {
  const initialData = [
    { date: "Apr 15", Stars: 0 },
    { date: "Apr 16", Stars: 160 },
    { date: "Apr 17", Stars: 320 },
    { date: "Apr 18", Stars: 480 },
    { date: "Apr 19", Stars: 720 },
    { date: "Apr 20", Stars: 990 },
    { date: "Apr 21", Stars: 1125 },
    { date: "Apr 22", Stars: 1260 },
    { date: "Apr 23", Stars: 1530 },
    { date: "Apr 24", Stars: 1620 },
    { date: "Apr 25", Stars: 1710 },
    { date: "Apr 26", Stars: 1755 },
    { date: "Apr 27", Stars: 1800 },
    { date: "Apr 28", Stars: 2040 },
    { date: "Apr 29", Stars: 2175 },
    { date: "Apr 30", Stars: 2242 },
    { date: "May 01", Stars: 2310 },
    { date: "May 02", Stars: 2378 },
    { date: "May 03", Stars: 2445 },
    { date: "May 04", Stars: 2512 },
    { date: "May 05", Stars: 2546 },
    { date: "May 06", Stars: 2580 },
    { date: "May 07", Stars: 2648 },
    { date: "May 08", Stars: 2715 },
    { date: "May 09", Stars: 2782 },
    { date: "May 10", Stars: 2850 },
    { date: "May 11", Stars: 2917 },
    { date: "May 12", Stars: 2985 },
    { date: "May 13", Stars: 3052 },
    { date: "May 14", Stars: 3120 },
    { date: "May 15", Stars: 3187 },
    { date: "May 16", Stars: 3255 },
    { date: "May 17", Stars: 3322 },
    { date: "May 18", Stars: 3390 },
    { date: "May 19", Stars: 3510 },
    { date: "May 20", Stars: 3630 },
    { date: "May 21", Stars: 3900 },
    { date: "May 22", Stars: 4082 },
    { date: "May 23", Stars: 4263 },
    { date: "May 24", Stars: 4445 },
    { date: "May 25", Stars: 4594 },
  ];
  const [padding, setPadding] = useState(64);
  const [chartData, setChartData] = useState(initialData);
  const [xName, setXName] = useState("Date");
  const [yName, setYName] = useState("Stars");
  return (
    <main className="relative flex h-screen flex-col items-center justify-center bg-gray-900">
      <Menu
        padding={padding}
        setPadding={setPadding}
        setChartData={setChartData}
        setXName={setXName}
        setYName={setYName}
      />
      <Graph
        padding={padding}
        chartData={chartData}
        xName={xName}
        yName={yName}
      />
    </main>
  );
}
