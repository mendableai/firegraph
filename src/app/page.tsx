// pages/index.tsx

"use client";

import Menu from "../components/menu";
import Graph from "../components/graph";
import { useState } from "react";

export default function Home() {
  const [padding, setPadding] = useState(64);
  return (
    <main className="relative flex h-screen flex-col items-center justify-center bg-gray-900">
      <Menu padding={padding} setPadding={setPadding} />
      <Graph padding={padding} />
    </main>
  );
}
