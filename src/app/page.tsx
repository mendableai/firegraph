// pages/index.tsx

"use client";

import Menu from "../components/menu";
import Graph from "../components/graph";
import { useRef, useState } from "react";
import { Theme, allThemes } from "@/lib/theme";
import html2canvas from "html2canvas";

/**
 * The issue in the original code is that the `allThemes["firecrawl"]` object does not match the expected `Theme` type.
 * To fix this, we need to ensure that the `allThemes["firecrawl"]` object conforms to the `Theme` type.
 */

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
  const [chartData, setChartData] = useState(initialData);
  const [xName, setXName] = useState("Date");
  const [yName, setYName] = useState("Stars");
  const [padding, setPadding] = useState(32);
  const [theme, setTheme] = useState<Theme>(
    () => allThemes["firecrawl"] as Theme
  );

  const [background, setBackground] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [copyAsImage, setCopyAsImage] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null);

  const [githubLink, setGithubLink] = useState<string>("");
  const [csvData, setCsvData] = useState<string>("");

  const handleExport = async (copyAsImage: boolean = false) => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
        logging: true,
        onclone: (document: Document) => {
          Array.from(
            document.querySelector(".cc")?.querySelectorAll("*") || []
          ).forEach((e) => {
            let existingStyle = e.getAttribute("style") || "";
            e.setAttribute(
              "style",
              existingStyle + "; font-family: Inter, sans-serif !important"
            );
          });
        },
      });
      console.log("coco");
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "chart.png";
      document.body.appendChild(link); // Append the link to the body
      link.click();
      document.body.removeChild(link); // Remove the link after download
      if (copyAsImage) {
        console.log("copying as image");
        canvas.toBlob((blob) => {
          if (blob) {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]);
          }
        });
      }
    }
  };

  return (
    <div
      className="h-screen"
      style={{
        background: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.75) 58%, ${theme.startColor}, ${theme.endColor} )`,
      }}
    >
      <main className="relative flex h-[95vh] flex-col items-center justify-center bg-transparent bg-opacity-80">
        <Graph
          padding={padding}
          theme={theme}
          background={background}
          darkMode={darkMode}
          chartRef={chartRef}
          chartData={chartData}
          xName={xName}
          yName={yName}
        />

        <Menu
          padding={padding}
          setPadding={setPadding}
          theme={theme}
          setTheme={setTheme}
          handleExport={handleExport}
          background={background}
          setBackground={setBackground}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleExportCopyAsImage={() => handleExport(true)}
          setChartData={setChartData}
          setXName={setXName}
          setYName={setYName}
        />
        <div className="fixed bottom-0 left-0 right-0 p-4 text-white  text-center font-light">
          Made by{" "}
          <a
            href="https://firecrawl.dev"
            target="_blank"
            className="text-white hover:text-gray-200"
          >
            Firecrawl 🔥
          </a>
        </div>
      </main>
    </div>
  );
}
