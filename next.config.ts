import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Browsers often request /favicon.ico; serve the same JPEG as metadata `icons` (SITE_FAVICON_PATH).
    return [{ source: "/favicon.ico", destination: "/images/SPK.jpeg" }];
  },
  images: {
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
    ],
  },
};

export default nextConfig;
