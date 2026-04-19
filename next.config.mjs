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
    // OpenNext on Cloudflare Workers: use unoptimized remote images unless you add a Cloudflare Images
    // binding and follow https://opennext.js.org/cloudflare/howtos/image
    unoptimized: true,
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
