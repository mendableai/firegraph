// pages/index.tsx

"use client";

import Menu from "../components/menu";
import Graph from "../components/graph";
import { useState } from "react";
import { Theme, allThemes } from "@/lib/theme";

/**
 * The issue in the original code is that the `allThemes["sunset"]` object does not match the expected `Theme` type.
 * To fix this, we need to ensure that the `allThemes["sunset"]` object conforms to the `Theme` type.
 */

// Start of Selection
export default function Home() {
  const [padding, setPadding] = useState(64);
  const [theme, setTheme] = useState<Theme>(() => allThemes["sunset"] as Theme);
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
        <Menu
          padding={padding}
          setPadding={setPadding}
          theme={theme}
          setTheme={setTheme}
        />
        <Graph padding={padding} theme={theme} />
        <div className="absolute bottom-5 left-0 right-0 p-4 text-white text-center">
          Made by Firecrawl
        </div>
      </main>
    </div>
  );
}
