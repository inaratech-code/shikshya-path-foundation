import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async rewrites() {
    // Browsers often request /favicon.ico; serve the same JPEG as `src/app/icon.jpeg`.
    return [{ source: "/favicon.ico", destination: "/icon.jpeg" }];
  },
  images: {
    /** Used by next/image `quality` across heroes, cards, and flags (Next 16 defaults to [75] only). */
    qualities: [75, 85, 88, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
