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
import { Switch } from "./ui/switch";
import {
  ArrowUp,
  ArrowUp01,
  ChevronUp,
  Code,
  Copy,
  Download,
  Image,
  MoveUpIcon,
  Plus,
} from "lucide-react";
import { SelectIcon } from "@radix-ui/react-select";
import { toast } from "sonner";

export default function Menu({
  padding,
  setPadding,
  theme,
  setTheme,
  background,
  setBackground,
  darkMode,
  setDarkMode,
  handleExportCopyAsImage,
  handleExport,
}: {
  padding: number;
  setPadding: (padding: number) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  background: boolean;
  setBackground: (background: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  handleExportCopyAsImage: () => void;
  handleExport: () => void;
}) {
  const generateEmbedCode = () => {
    const embedCode = `
      <iframe
        src="${
          window.location.origin
        }/embed?padding=${padding}&theme=${encodeURIComponent(
      JSON.stringify(theme)
    )}&background=${background}"
        style="border:none;width:100%;height:400px;"
        allowfullscreen
      ></iframe>
    `;
    navigator.clipboard.writeText(embedCode).then(() => {
      toast("Embed code copied to clipboard!");
    });
  };
  return (
    <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 flex items-center space-x-8 p-4  ">
      {/* <div className="flex items-center rounded-lg bg-white border border-zinc-500/25 shadow-xl px-4 py-[26px] gap-4">
        <Button className="bg-black text-white px-3 py-2 rounded hover:bg-zinc-700/10">
          <Plus size={16} className="mr-1" />
          Add data
        </Button>
        
      </div> */}
      <div className="flex items-end space-x-8 p-4 rounded-lg bg-white border border-zinc-500/25 shadow-xl">
        {/* <div className="flex flex-col items-start justify-start">
      <Button className="bg-black text-white px-3 py-2 rounded hover:bg-zinc-700/10">
          <Plus size={16} className="mr-1" />
          Add data
        </Button>
        </div> */}
        <div className="flex flex-col items-start justify-start">
          <span className="text-zinc-700 text-sm">Theme</span>
          <Select
            value={theme.name}
            onValueChange={(value) =>
              setTheme(allThemes[value as keyof typeof allThemes] as Theme)
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="16" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(allThemes).map(([themeKey, themeValue]) => (
                <SelectItem key={themeKey} value={themeValue.name} className="">
                  <div className="flex flex-row items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ background: themeValue.gradient }}
                    />
                    <div>
                      {themeValue.name.charAt(0).toUpperCase() +
                        themeValue.name.slice(1)}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex h-full flex-col items-start justify-start pb-2">
          <span className="text-zinc-700 text-sm">Background</span>
          <Switch
            className="mt-2 scale-90 -ml-[2px]"
            checked={background}
            onCheckedChange={(checked) => setBackground(checked)}
          />
        </div>
        {/* <div className="flex h-full flex-col items-start justify-start pb-2">
          <span className="text-zinc-700 text-sm">Dark Mode</span>
          <Switch
            className="mt-2 scale-90 -ml-[2px]"
            checked={darkMode}
            onCheckedChange={(checked) => setDarkMode(checked)}
          />
        </div> */}
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
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExport}
            className="bg-orange-400/25 text-orange-400 px-3 py-2 rounded hover:bg-red-400/10"
          >
            <Download size={16} className="mr-1" />
            Export
          </Button>
          <Select >
            <SelectTrigger
              noIcon={true}
              className="border-0 w-[32px] p-0 bg-orange-400/25 text-orange-400"
            >
              <ChevronUp size={18} className=" mx-auto" />
            </SelectTrigger>
            <SelectContent className="w-fit" side="top">
              <SelectItem onClick={generateEmbedCode} value="embed">
                <div className="flex items-center justify-start gap-2">
                  <Code size={16} className="-ml-4 mr-1" />
                  Embed
                </div>
              </SelectItem>
              {/* <SelectItem onClick={handleExportCopyAsImage} value="copy">
                <div className="flex items-center justify-start gap-2">
                  <Image size={16} className="-ml-4 mr-1" />
                  Copy PNG
                </div>
              </SelectItem> */}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* <div className="flex items-center rounded-lg bg-white border border-zinc-500/25 shadow-xl px-4 py-[26px] gap-4">
        <Button
          onClick={handleExport}
          className="bg-orange-400/25  text-orange-400 px-3 py-2 rounded hover:bg-red-400/10"
        >
          <Download size={16} className="mr-1" />
          Export
        </Button>
      </div> */}
    </div>
  );
}
