import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: avoids Next.js blocking cross-origin dev resource requests
  // (e.g. HMR) when the browser hits 127.0.0.1 vs localhost. No effect on
  // the production build.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
