import { Github, ClipboardPasteIcon, FileIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";

type DataInputProps = {
  setChartData: any;
  setXName: any;
  setYName: any;
  setGraphTitle: any;
  repoUrl: string;
  setRepoUrl: any;
  open: boolean;
  setOpen: any;
  openCsv: boolean;
  setOpenCsv: any;
  pastedCsvData: string;
  setPastedCsvData: any;
};

export default function DataInput({
  setChartData,
  setXName,
  setYName,
  setGraphTitle,
  repoUrl,
  setRepoUrl,
  open,
  setOpen,
  openCsv,
  setOpenCsv,
  pastedCsvData,
  setPastedCsvData,
}: DataInputProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {typeof window !== "undefined" && (
        <div
          className={`${
            window.innerHeight < 700 ? "mt-2" : "mt-8 md:mt-8 xl:mt-12"
          } mb-0 md:mb-8 xl:mb-12 flex flex-col items-start rounded-lg px-4`}
        >
          <p className="text-zinc-700 mx-auto mb-1 text-sm">
            Choose data you want to visualize
          </p>

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
                      if (repoUrl) {
                        try {
                          const response = await fetch(
                            `/api/githubStars?repo=${encodeURIComponent(
                              repoUrl
                            )}`
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
                  <FileIcon size={16} className="mr-1" />
                  CSV
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
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            );
                          if (isDate(valueValue))
                            valueValue = new Date(
                              valueValue
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            });
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
                      setGraphTitle(`Firegraph🔥`);
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
      )}
    </div>
  );
}
