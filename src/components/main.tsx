// pages/index.tsx
"use client";

import Menu from "../components/menu";
import Graph from "../components/graph";
import { useEffect, useRef, useState } from "react";
import { Theme, allThemes } from "@/lib/theme";
import html2canvas from "html2canvas";
import DataInput from "@/components/data-input";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

/**
 * The issue in the original code is that the `allThemes["firecrawl"]` object does not match the expected `Theme` type.
 * To fix this, we need to ensure that the `allThemes["firecrawl"]` object conforms to the `Theme` type.
 */

export default function MainComponent() {
  const initialData = [
    { Date: "Apr 15, 2024", Stars: 0 },
    { Date: "Apr 16, 2024", Stars: 160 },
    { Date: "Apr 17, 2024", Stars: 320 },
    { Date: "Apr 18, 2024", Stars: 480 },
    { Date: "Apr 19, 2024", Stars: 720 },
    { Date: "Apr 20, 2024", Stars: 990 },
    { Date: "Apr 21, 2024", Stars: 1125 },
    { Date: "Apr 22, 2024", Stars: 1260 },
    { Date: "Apr 23, 2024", Stars: 1530 },
    { Date: "Apr 24, 2024", Stars: 1620 },
    { Date: "Apr 25, 2024", Stars: 1710 },
    { Date: "Apr 26, 2024", Stars: 1755 },
    { Date: "Apr 27, 2024", Stars: 1800 },
    { Date: "Apr 28, 2024", Stars: 2040 },
    { Date: "Apr 29, 2024", Stars: 2175 },
    { Date: "Apr 30, 2024", Stars: 2242 },
    { Date: "May 01, 2024", Stars: 2310 },
    { Date: "May 02, 2024", Stars: 2378 },
    { Date: "May 03, 2024", Stars: 2445 },
    { Date: "May 04, 2024", Stars: 2512 },
    { Date: "May 05, 2024", Stars: 2546 },
    { Date: "May 06, 2024", Stars: 2580 },
    { Date: "May 07, 2024", Stars: 2648 },
    { Date: "May 08, 2024", Stars: 2715 },
    { Date: "May 09, 2024", Stars: 2782 },
    { Date: "May 10, 2024", Stars: 2850 },
    { Date: "May 11, 2024", Stars: 2917 },
    { Date: "May 12, 2024", Stars: 2985 },
    { Date: "May 13, 2024", Stars: 3052 },
    { Date: "May 14, 2024", Stars: 3120 },
    { Date: "May 15, 2024", Stars: 3187 },
    { Date: "May 16, 2024", Stars: 3255 },
    { Date: "May 17, 2024", Stars: 3322 },
    { Date: "May 18, 2024", Stars: 3390 },
    { Date: "May 19, 2024", Stars: 3510 },
    { Date: "May 20, 2024", Stars: 3630 },
    { Date: "May 21, 2024", Stars: 3900 },
    { Date: "May 22, 2024", Stars: 4082 },
    { Date: "May 23, 2024", Stars: 4263 },
    { Date: "May 24, 2024", Stars: 4445 },
    { Date: "May 25, 2024", Stars: 4594 },
  ];
  const [chartData, setChartData] = useState(initialData);
  const [xName, setXName] = useState("Date");
  const [yName, setYName] = useState("Stars");
  const [padding, setPadding] = useState(32);
  const [width, setWidth] = useState("400");
  const [theme, setTheme] = useState<Theme>(
    () => allThemes["firecrawl"] as Theme
  );

  const [background, setBackground] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [copyAsImage, setCopyAsImage] = useState(false);
  const [pastedCsvData, setPastedCsvData] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [openCsv, setOpenCsv] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [githubLink, setGithubLink] = useState<string>("");
  const [csvData, setCsvData] = useState<string>("");
  const [graphTitle, setGraphTitle] = useState<string>("Firegraph🔥");
  const [maxValue, setMaxValue] = useState(0);
  const [finalChartData, setFinalChartData] = useState(chartData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPadding(window.innerWidth < 450 ? 16 : 32);
    }
  }, []);

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
      <main className="relative flex h-[95vh] flex-col items-center justify-start bg-transparent bg-opacity-80">
        {/* <Button
          onClick={() => {
            window.open('https://github.com/mendableai/firecrawl', '_blank');
          }}
          variant="outline"
          size="icon"
          className="px-3 w-22 gap-2"
        >
          <Github className="h-4 w-4" />{' '}
          {githubStars ? `${(githubStars / 1000).toFixed(1)}k` : 'GitHub'}
        </Button> */}
        <DataInput
          setChartData={setChartData}
          setXName={setXName}
          setYName={setYName}
          setGraphTitle={setGraphTitle}
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          open={open}
          setOpen={setOpen}
          openCsv={openCsv}
          setOpenCsv={setOpenCsv}
          pastedCsvData={pastedCsvData}
          setPastedCsvData={setPastedCsvData}
        />
        <Graph
          padding={padding}
          width={width}
          theme={theme}
          background={background}
          darkMode={darkMode}
          chartRef={chartRef}
          chartData={chartData}
          xName={xName}
          yName={yName}
          graphTitle={graphTitle}
          setGraphTitle={setGraphTitle}
          maxValue={maxValue}
          setMaxValue={setMaxValue}
          finalChartData={finalChartData}
          setFinalChartData={setFinalChartData}
        />

        <Menu
          padding={padding}
          setPadding={setPadding}
          width={width}
          setWidth={setWidth}
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
          setGraphTitle={setGraphTitle}
          graphTitle={graphTitle}
          pastedCsvData={pastedCsvData}
          setPastedCsvData={setPastedCsvData}
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          open={open}
          setOpen={setOpen}
          openCsv={openCsv}
          setOpenCsv={setOpenCsv}
        />
        {typeof window !== "undefined" && (
          <div
            className={`fixed bottom-0 left-0 right-0 ${
              window.innerHeight < 700 ? "p-2" : "p-4"
            } text-white text-center font-light flex justify-center items-center gap-4`}
          >
            <a
              href="https://firecrawl.dev"
              target="_blank"
              className="text-black md:text-white hover:text-orange-400"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.15)" }}
            >
              Made by Firecrawl 🔥
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
