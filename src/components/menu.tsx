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
    <div className="w-full mx-auto fixed bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center justify-center space-x-8 p-4">
      <div className="flex flex-col items-start rounded-lg bg-white border border-zinc-500/25 shadow-xl px-4 py-[18px]">
        <p className="text-zinc-700 text-sm">Visualize</p>
        <div className="mt-1 flex flex-row items-center rounded-lg gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white px-3 py-2 rounded hover:bg-zinc-700/75">
                <Github size={16} className="mr-1" />
                GitHub stars
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter GitHub URL</DialogTitle>
                <DialogDescription>
                  Please enter the GitHub repository URL to fetch stars data.
                </DialogDescription>
              </DialogHeader>
              <Input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="https://github.com/user/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={async () => {
                    const token = process.env.GITHUB_TOKEN;

                    if (token && repoUrl) {
                      try {
                        const response = await fetch(
                          `/api/githubStars?repo=${encodeURIComponent(
                            repoUrl
                          )}&token=${encodeURIComponent(token)}`
                        );
                        if (!response.ok) {
                          throw new Error(`Error: ${response.statusText}`);
                        }
                        const data = await response.json();
                        console.log("GitHub Stars Data:", data);
                        setXName("Date");
                        setYName("Stars");
                        setChartData(data);
                        setGraphTitle(`${repoUrl} Stars`);
                        setOpen(false);
                      } catch (error) {
                        console.error(
                          "Failed to fetch GitHub stars data:",
                          error
                        );
                        alert(
                          "Failed to fetch GitHub stars data. Please check the console for more details."
                        );
                      }
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={openCsv} onOpenChange={setOpenCsv}>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="px-3 py-2 rounded hover:bg-zinc-700/10"
              >
                <ClipboardPasteIcon size={16} className="mr-1" />
                Other data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paste CSV Data</DialogTitle>
                <DialogDescription>
                  Please paste your CSV data or upload a CSV file. <br />
                  <strong>Make sure you have only 2 columns (X, Y)</strong>
                </DialogDescription>
              </DialogHeader>
              <Textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows={5}
                placeholder={`Gear, Speed
1,0
2,480
3,750..
`}
                value={pastedCsvData}
                onChange={(e) => setPastedCsvData(e.target.value)}
              ></Textarea>
              <Input
                type="file"
                accept=".csv"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                onChange={(e) => {
                  const file = e.target.files![0];
                  const reader = new FileReader();
                  reader.onload = (e: any) => {
                    setPastedCsvData(e.target.result);
                  };
                  reader.readAsText(file);
                }}
                // close the dialog after file is uploaded
              />
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={() => {
                    console.log(pastedCsvData);
                    const [header, ...rows] = pastedCsvData.split("\n");
                    const [key, value] = header.split(",");

                    // Check if any value in the key or value column is a date
                    const isDate = (str: string) =>
                      isNaN(Date.parse(str)) === false && isNaN(Number(str));
                    const containsDate = rows.some((row: any) => {
                      const [keyValue, valueValue] = row.split(",");
                      return isDate(keyValue) || isDate(valueValue);
                    });

                    const parsedData = rows.map((row: any) => {
                      let [keyValue, valueValue] = row.split(",");
                      if (containsDate) {
                        if (isDate(keyValue))
                          keyValue = new Date(keyValue).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          );
                        if (isDate(valueValue))
                          valueValue = new Date(valueValue).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          );
                      }
                      return {
                        [key]: keyValue,
                        [value]: isNaN(Number(valueValue))
                          ? valueValue
                          : Number(valueValue),
                      };
                    });
                    // print the new formatted data
                    console.log(parsedData);
                    setChartData(parsedData);
                    setXName(key);
                    setYName(value);
                    setGraphTitle(`Your awesome graph 🔥`);
                    // close the dialog after file is uploaded
                    setOpenCsv(false);
                  }}
                >
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-end space-x-8 p-4 rounded-lg bg-white border border-zinc-500/25 shadow-xl py-[20px]">
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
        <div className="flex h-full flex-col items-start justify-start pb-2">
          <span className="text-zinc-700 text-sm">Dark Mode</span>
          <Switch
            className="mt-2 scale-90 -ml-[2px]"
            checked={darkMode}
            onCheckedChange={(checked) => setDarkMode(checked)}
          />
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
