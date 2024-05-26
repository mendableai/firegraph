import React from "react";

export default function Menu({
  padding,
  setPadding,
  setChartData,
  setXName,
  setYName,
}: {
  padding: number;
  setPadding: (padding: number) => void;
  setChartData: (data: any) => void;
  setXName: (xName: string) => void;
  setYName: (yName: string) => void;
}) {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-transparent p-4 rounded-lg bg-slate-700">
      <div className="flex items-center space-x-2">
        <span className="text-white">Padding</span>
        <select
          className="bg-gray-700 text-white p-1 rounded"
          value={padding}
          onChange={(e) => setPadding(Number(e.target.value))}
        >
          <option value={16}>16</option>
          <option value={32}>32</option>
          <option value={64}>64</option>
          <option value={128}>128</option>
        </select>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={async () => {
          const token = process.env.GITHUB_TOKEN;
          const repoUrl = "https://github.com/mendableai/data-connectors";
          if (token && repoUrl) {
            try {
              const response = await fetch(
                `/api/githubStars?repo=${encodeURIComponent(
                  repoUrl
                )}&token=${encodeURIComponent(token)}`
              );
              if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
              }
              const data = await response.json();
              console.log("GitHub Stars Data:", data);
              setXName("Date");
              setYName("Stars");
              setChartData(data);
            } catch (error) {
              console.error("Failed to fetch GitHub stars data:", error);
              alert(
                "Failed to fetch GitHub stars data. Please check the console for more details."
              );
            }
          } else {
            alert("Both fields are required.");
          }
        }}
      >
        Add GitHub data
      </button>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={async () => {
          const pastedCsvData = `Speed,Value
1,100
2,200
3,300
4,400
5,500
6,600
7,700
8,800
9,900
10,1000
11,1100
12,1200
13,1300
14,1400
15,1500
16,1600
17,1700
18,1800
19,1900
20,2000
21,2100
22,2200
23,2300
24,2400
25,2500
26,2600
27,2700
28,2800
29,2900
30,3000
31,3100
32,3200
33,3300
34,3400
35,3500
36,3600
37,3700
38,3800
39,3900
40,4000
41,4100
42,4200
43,4300
44,4400
45,4500
46,4600
47,4700
48,4800
49,4900
50,5000`;
          const [header, ...rows] = pastedCsvData.split("\n");
          const [dateKey, valueKey] = header.split(",");
          const parsedData = rows.map((row) => {
            const [date, value] = row.split(",");
            return { [dateKey]: date, [valueKey]: Number(value) };
          });

          setChartData(parsedData);
          setXName(dateKey);
          setYName(valueKey);
        }}
      >
        Add CSV data
      </button>
      <button className="bg-red-600 text-white px-4 py-2 rounded">
        Export
      </button>
    </div>
  );
}
