import React, { useEffect } from "react";
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
  ClipboardPasteIcon,
  Code,
  Copy,
  Download,
  Github,
  Image,
  MoveUpIcon,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { SelectIcon } from "@radix-ui/react-select";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

export default function Menu({
  padding,
  setPadding,
  width,
  setWidth,
  setChartData,
  setXName,
  setYName,
  theme,
  setTheme,
  background,
  setBackground,
  darkMode,
  setDarkMode,
  handleExportCopyAsImage,
  handleExport,
  graphTitle,
  setGraphTitle,
  pastedCsvData,
  setPastedCsvData,
  repoUrl,
  setRepoUrl,
  open,
  setOpen,
  openCsv,
  setOpenCsv,
}: {
  padding: number;
  setPadding: (padding: number) => void;
  width: string;
  setWidth: (width: string) => void;
  setChartData: (data: any) => void;
  setXName: (xName: string) => void;
  setYName: (yName: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  background: boolean;
  setBackground: (background: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  handleExportCopyAsImage: () => void;
  handleExport: () => void;
  graphTitle: string;
  setGraphTitle: (graphTitle: string) => void;
  pastedCsvData: string;
  setPastedCsvData: (pastedCsvData: string) => void;
  repoUrl: string;
  setRepoUrl: (repoUrl: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  openCsv: boolean;
  setOpenCsv: (openCsv: boolean) => void;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const generateEmbedCode = () => {
    const embedCode = `
      <iframe
        src="${window.location.origin}/embed?padding=${padding}&theme=${theme.name}&background=${background}&darkMode=${darkMode}"
        style="border:none;width:100%;height:400px;"
        allowfullscreen
      ></iframe>
    `;
    navigator.clipboard.writeText(embedCode).then(() => {
      toast("Embed code copied to clipboard!");
    });
  };
  return (
    <div
      className={`w-full mx-auto fixed ${
        window.innerHeight < 700 ? "bottom-10 px-4" : "bottom-14 p-4"
      } left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center justify-center`}
    >
      <div
        className={`flex flex-col items-start md:flex-row md:items-end md:space-x-8 rounded-lg bg-white border border-zinc-500/25 shadow-xl ${
          window.innerHeight < 700 ? "px-4" : "py-[20px] p-4"
        }`}
      >
        {/* <div className="flex flex-col items-start justify-start">
      <Button className="bg-black text-white px-3 py-2 rounded hover:bg-zinc-700/10">
          <Plus size={16} className="mr-1" />
          Add data
        </Button>
        </div> */}

        <div className="mt-4 flex flex-row mb-4 md:mb-0 md:mt-0 md:flex-row gap-4 items-start justify-start">
          <div className="flex flex-col items-start justify-start">
            <span
              className={`text-zinc-700 ${
                window.innerHeight < 700 ? "text-xs" : "text-sm"
              }`}
            >
              Theme
            </span>
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
                  <SelectItem
                    key={themeKey}
                    value={themeValue.name}
                    className=""
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: themeValue.gradient }}
                      />
                      <div
                        className={`${
                          window.innerHeight < 700 ? "text-xs" : ""
                        }`}
                      >
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
            <span
              className={`text-zinc-700 ${
                window.innerHeight < 700 ? "text-xs" : "text-sm"
              }`}
            >
              Background
            </span>
            <Switch
              className="mt-2 scale-90 -ml-[2px]"
              checked={background}
              onCheckedChange={(checked) => setBackground(checked)}
            />
          </div>
          <div className="flex h-full flex-col items-start justify-start pb-2">
            <span
              className={`text-zinc-700 ${
                window.innerHeight < 700 ? "text-xs" : "text-sm"
              }`}
            >
              Dark Mode
            </span>
            <Switch
              className="mt-2 scale-90 -ml-[2px]"
              checked={darkMode}
              onCheckedChange={(checked) => setDarkMode(checked)}
            />
          </div>
        </div>
        <div className="flex flex-row items-end mb-4 md:mb-0 md:flex-row gap-4  justify-start">
          <div className="flex flex-col items-start justify-start">
            <span
              className={`text-zinc-700 ${
                window.innerHeight < 700 ? "text-xs" : "text-sm"
              }`}
            >
              Padding
            </span>
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
          <div className="flex flex-col items-start justify-start">
            <span
              className={`text-zinc-700 ${
                window.innerHeight < 700 ? "text-xs" : "text-sm"
              }`}
            >
              Width
            </span>
            <Select
              value={width.toString()}
              onValueChange={(value) => setWidth(value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="400px" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300">300px</SelectItem>
                <SelectItem value="350">350px</SelectItem>
                <SelectItem value="400">400px</SelectItem>
                <SelectItem value="600">500px</SelectItem>
                <SelectItem value="800">700px</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleExport}
              style={{
                backgroundColor: `${theme.startColor}40`, // 1A in hex represents 10% opacity
                color: theme.startColor,
              }}
              className="px-3 py-2 rounded hover:bg-red-400/10"
            >
              <Download size={16} className="mr-1" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                style={{ backgroundColor: `${theme.startColor}40` }}
                className="h-[40px] border-0 w-[32px] p-0 rounded"
              >
                <ChevronUp
                  size={18}
                  className="mx-auto"
                  color={theme.startColor}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit" side="top">
                <DropdownMenuItem onClick={() => generateEmbedCode()}>
                  <div className="flex items-center justify-start gap-2">
                    <Code size={16} className="mr-1" />
                    Embed
                  </div>
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={handleExportCopyAsImage}>
                <div className="flex items-center justify-start gap-2">
                  <Image size={16} className="-ml-4 mr-1" />
                  Copy PNG
                </div>
              </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
