"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";

type CardLowonganProps = {
  judul: string;
  perusahaan: string;
  lokasi: string;
  kategori: string;
  warnaKategori?: string; // default hijau
  logoUrl?: string;
};

export default function CardLowongan({
  judul,
  perusahaan,
  lokasi,
  kategori,
  warnaKategori = "bg-green-500",
  logoUrl,
}: CardLowonganProps) {
  const avatarSrc =
    logoUrl ||
    `https://i.pravatar.cc/48?img=${Math.floor(Math.random() * 70) + 1}`;

  return (
    <div className="flex items-center justify-between py-3 border-b-2 last:border-none">
      {/* Kiri */}
      <div className="flex items-center gap-3">
        {/* Logo / Avatar */}
        <Image
          src={avatarSrc}
          alt={perusahaan}
          width={48}
          height={48}
          className="w-12 h-12 rounded-md object-cover"
        />

        {/* Info Lowongan */}
        <div>
          <h3 className="font-semibold">{judul}</h3>
          <p className="text-sm text-gray-600">{perusahaan}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-white text-xs px-2 py-0.5 rounded ${warnaKategori}`}
            >
              {kategori}
            </span>
            <span className="text-sm text-gray-500">{lokasi}</span>
          </div>
        </div>
      </div>

      {/* Kanan: Tombol Simpan */}
      <button className="text-gray-600 hover:text-black">
        <Bookmark size={28} />
      </button>
    </div>
  );
}