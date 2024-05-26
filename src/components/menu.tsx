import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Theme, allThemes } from "@/lib/theme";
import { Button } from "./ui/button";

export default function Menu({
  padding,
  setPadding,
  theme,
  setTheme,
  handleExport,
}: {
  padding: number;
  setPadding: (padding: number) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  handleExport: () => void;
}) {
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-end space-x-4 p-4 rounded-lg bg-white border border-gray-500/25 shadow-xl ">
      <div className="flex flex-col items-start justify-start">
        <span className="text-zinc-700 text-sm">Theme</span>
        <Select
          value={theme.name}
          onValueChange={(value) => setTheme(allThemes[value as keyof typeof allThemes] as Theme)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="16" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(allThemes).map(([themeKey, themeValue]) => (
              <SelectItem key={themeKey} value={themeValue.name} className="">
                <div className="flex flex-row items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ background: themeValue.gradient }} />
                  <div>{themeValue.name.charAt(0).toUpperCase() + themeValue.name.slice(1)}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-start justify-start">
        <span className="text-zinc-700 text-sm">Padding</span>
        <Select
          value={padding.toString()}
          onValueChange={(value) => setPadding(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="16" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="32">32</SelectItem>
            <SelectItem value="64">64</SelectItem>
            <SelectItem value="128">128</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="bg-orange-400/25 text-orange-400 px-4 py-2 rounded hover:bg-orange-400/10">
        Add data
      </Button>
      <Button onClick={handleExport} className="bg-red-400/25  text-red-400 px-4 py-2 rounded hover:bg-red-400/10">
        Export
      </Button>
    </div>
  );
}
