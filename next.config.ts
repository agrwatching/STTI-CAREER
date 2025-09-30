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
<<<<<<< HEAD
      {
        protocol: "https",
        hostname: "backendstticareer-123965511401.asia-southeast2.run.app",
=======
      // ✅ pakai hostname dari ENV
      {
        protocol: "https",
        hostname: apiUrl,
        pathname: "/uploads/images/**",
>>>>>>> d871fa595a65df6331ad9e44cf6ffc3c6e49ef3e
      },
    ],
  },
};

export default nextConfig;
