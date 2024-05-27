// pages/index.tsx
import MainComponent from "@/components/main";
import { useGithubStars } from "./hooks/useGithubStars";
import GithubButton from "@/components/github-button";
import { useEffect, useState } from "react";

/**
 * The issue in the original code is that the `allThemes["firecrawl"]` object does not match the expected `Theme` type.
 * To fix this, we need to ensure that the `allThemes["firecrawl"]` object conforms to the `Theme` type.
 */

export default async function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const githubStars = await useGithubStars();
  return (
    <div className="relative">
      <div className="hidden md:flex z-10 absolute top-4 right-4 p-4">
        <GithubButton githubStars={githubStars} />
      </div>
      <MainComponent />
    </div>
  );
}
