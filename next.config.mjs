/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
};

export default nextConfig;
