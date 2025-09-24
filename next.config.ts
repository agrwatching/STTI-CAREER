import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      // ✅ tambahkan domain API kamu di sini
      {
        protocol: "https",
        hostname: "apicareer-production.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
