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
        hostname: "backendstticareer-123965511401.asia-southeast2.run.app",
      },
    ],
  },
};

export default nextConfig;
