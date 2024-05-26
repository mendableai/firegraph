// pages/index.tsx

"use client";

import Menu from "../components/menu";
import Graph from "../components/graph";
import { useRef, useState } from "react";
import { Theme, allThemes } from "@/lib/theme";
import html2canvas from "html2canvas";

/**
 * The issue in the original code is that the `allThemes["sunset"]` object does not match the expected `Theme` type.
 * To fix this, we need to ensure that the `allThemes["sunset"]` object conforms to the `Theme` type.
 */

export default function Home() {
  const [padding, setPadding] = useState(64);
  const [theme, setTheme] = useState<Theme>(() => allThemes["sunset"] as Theme);

  const [background, setBackground] = useState(true);

  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
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
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "chart.png";
      link.click();
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
        <Graph padding={padding} theme={theme} background={background} chartRef={chartRef} />

        <Menu
          padding={padding}
          setPadding={setPadding}
          theme={theme}
          setTheme={setTheme}
          handleExport={handleExport}
          background={background}
          setBackground={setBackground}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white  text-center font-light">
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
