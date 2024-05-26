"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Graph from '@/components/graph';
import { allThemes, Theme } from '@/lib/theme';

export default function EmbedPage() {
  const searchParams = useSearchParams();
  const padding = searchParams?.get('padding') || '64';
  const theme = searchParams?.get('theme') || JSON.stringify(allThemes['sunset']);
  const background = searchParams?.get('background') || 'false';

  const [parsedPadding, setParsedPadding] = useState(0);
  const [parsedTheme, setParsedTheme] = useState<Theme | null>(null);
  const [parsedBackground, setParsedBackground] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (padding) {
      setParsedPadding(parseInt(padding, 10));
    }
    if (theme) {
      try {
        setParsedTheme(JSON.parse(theme) as Theme);
      } catch (error) {
        console.error('Failed to parse theme:', error);
        setParsedTheme(null);
      }
    }
    if (background) {
      setParsedBackground(background === 'true');
    }
  }, [padding, theme, background]);

  if (!parsedTheme) {
    return <div>Loading...</div>;
  }

  return (
    <Graph
      padding={parsedPadding}
      theme={parsedTheme}
      background={parsedBackground}
      chartRef={chartRef}
    />
  );
}
