import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.jpeg" }];
  },
  images: {
    // Vercel sets VERCEL=1 and supports the default optimizer. On Cloudflare Workers, optimization
    // requires Cloudflare Images + an IMAGES binding; without them, next/image often 500s at runtime.
    unoptimized: process.env.VERCEL !== "1",
    qualities: [75, 85, 88, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "flagcdn.com", pathname: "/**" },
    ],
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
