export async function useGithubStars() {
  const res = await fetch("https://api.github.com/repos/mendableai/firegraph");
  const data = await res.json();
  return data.stargazers_count;
}
