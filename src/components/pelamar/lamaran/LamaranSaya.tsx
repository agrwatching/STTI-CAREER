"use client";

import CardLamaran from "./CardLamaran";

const dataLamaran = [
  {
    posisi: "UI/UX Designer",
    perusahaan: "PT Maju Kedepan",
    nama: "Sufrianto",
    telepon: "08xxxxxxxxxx",
    email: "majuterus@gmail.com",
    status: "terkirim" as const,
  },
  {
    posisi: "Frontend Developer",
    perusahaan: "PT Tech Solutions",
    nama: "Sufrianto",
    telepon: "08xxxxxxxxxx",
    email: "contoh@gmail.com",
    status: "dilihat" as const,
  },
  {
    posisi: "Backend Developer",
    perusahaan: "PT Digital Innovate",
    nama: "Sufrianto",
    telepon: "08xxxxxxxxxx",
    email: "contoh@gmail.com",
    status: "proses" as const,
  },
  {
    posisi: "Full Stack Developer",
    perusahaan: "PT Startup Hebat",
    nama: "Sufrianto",
    telepon: "08xxxxxxxxxx",
    email: "contoh@gmail.com",
    status: "diterima" as const,
  },
  {
    posisi: "Mobile Developer",
    perusahaan: "PT App Maker",
    nama: "Sufrianto",
    telepon: "08xxxxxxxxxx",
    email: "contoh@gmail.com",
    status: "gagal" as const,
  },
];

export default function LamaranSaya() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-120px)] overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="p-6">
          {dataLamaran.map((lamaran, index) => (
            <CardLamaran key={index} {...lamaran} />
          ))}
        </div>
      </div>
    </div>
  );
}
