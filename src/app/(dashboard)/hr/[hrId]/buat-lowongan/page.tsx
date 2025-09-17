"use client";

import dynamic from "next/dynamic";

const BuatLowonganContent = dynamic(
  () => import("@/components/hr/buat-lowongan/BuatLowonganContent"),
  { ssr: false }
);

export default function BuatLowonganPage() {
  return <BuatLowonganContent />;
}
