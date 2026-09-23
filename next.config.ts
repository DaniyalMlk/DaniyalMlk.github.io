import type { NextConfig } from "next";

// Static export: `next build` writes a plain HTML/CSS/JS site into ./out,
// which GitHub Pages (or any static host) can serve. No server needed.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
