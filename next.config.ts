import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname
  : "";

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
      // ✅ pakai hostname dari ENV
      {
        protocol: "https",
        hostname: apiUrl,
        pathname: "/uploads/images/**",
      },
    ],
  },
};

export default nextConfig;
