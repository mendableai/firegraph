"use client";
import { Github } from "lucide-react";
import { Button } from "./ui/button";

export default function GithubButton({ githubStars }: { githubStars: number }) {
  return (
    <Button
      onClick={() => {
        window.open("https://github.com/mendableai/firegraph", "_blank");
      }}
      variant="outline"
      size="icon"
      className="px-3 w-22 gap-2"
    >
      <Github className="h-4 w-4" />{" "}
      {/* {githubStars ? `Star us on GitHub` : "GitHub"} */}
      Star us on GitHub
    </Button>
  );
}
