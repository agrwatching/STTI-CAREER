"use client";

import CardLowongan from "./CardLowongan";

const dataLowongan = [
  {
    judul: "UI/UX Designer",
    perusahaan: "PT Palugada Code",
    lokasi: "Karawang",
    kategori: "IT",
    warnaKategori: "bg-green-500",
  },
  {
    judul: "Frontend Dev",
    perusahaan: "PT Palugada Code",
    lokasi: "Karawang",
    kategori: "IT",
    warnaKategori: "bg-green-500",
  },
  {
    judul: "Digital Marketing",
    perusahaan: "PT Palugada Code",
    lokasi: "Karawang",
    kategori: "Marketing",
    warnaKategori: "bg-pink-500",
  },
  ...Array(10).fill({
    judul: "Software Engineer",
    perusahaan: "PT Contoh Data",
    lokasi: "Bandung",
    kategori: "IT",
    warnaKategori: "bg-green-500",
  }),
];

export default function LowonganTersimpan() {
  return (
    <div className="bg-gray-50 p-4 rounded-xl max-h-[calc(100vh-110px)] overflow-y-auto">
      {dataLowongan.map((job, index) => (
        <CardLowongan key={index} {...job} />
      ))}
    </div>
  );
}
