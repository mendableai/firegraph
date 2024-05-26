"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import Graph from "@/components/graph";
import { allThemes, Theme } from "@/lib/theme";

function EmbedPageContent() {
  const searchParams = useSearchParams();
  const padding = searchParams?.get("padding") || "64";
  const theme =
    searchParams?.get("theme") || "firecrawl"
  const background = searchParams?.get("background") || "false";
  const darkMode = searchParams?.get("darkMode") || "false";

  const [parsedPadding, setParsedPadding] = useState(0);
  const [parsedTheme, setParsedTheme] = useState<string>("firecrawl");
  const [parsedBackground, setParsedBackground] = useState(false);
  const [parsedDarkMode, setParsedDarkMode] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (padding) {
      setParsedPadding(parseInt(padding, 10));
    }
    if (theme) {
        setParsedTheme(theme);
    }
    if (background) {
      setParsedBackground(background === "true");
    }
    if (darkMode) {
      setParsedDarkMode(darkMode === "true");
    }
  }, [padding, theme, background, darkMode]);

  if (!parsedTheme) {
    return <div>Loading...</div>;
  }

  
  return (
    <Graph
      padding={parsedPadding}
      //@ts-ignore
      theme={allThemes[parsedTheme as keyof typeof allThemes]}
      background={parsedBackground}
      darkMode={parsedDarkMode}
      chartRef={chartRef}
    />
  );
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmbedPageContent />
    </Suspense>
  );
}