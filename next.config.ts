import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
