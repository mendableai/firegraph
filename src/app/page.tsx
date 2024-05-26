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
  const [padding, setPadding] = useState(64);
  const [theme, setTheme] = useState<Theme>(() => allThemes["firecrawl"] as Theme);

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
      className="bg-white h-screen"
      style={{
        backgroundImage: "url(/bgd.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="relative flex h-[95vh] flex-col items-center justify-center bg-transparent bg-opacity-80">
        <Graph padding={padding} theme={theme} background={background} darkMode={darkMode} chartRef={chartRef} />

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
