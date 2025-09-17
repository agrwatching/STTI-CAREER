// app/hr/lowongan-saya/page.tsx
import LowonganSayaTable from "@/components/hr/lowongan-saya/LowonganSayaTable";

// Export type Job dari LowonganSayaTable biar bisa dipakai ulang
import type { Job } from "@/components/hr/lowongan-saya/LowonganSayaTable";

export default function LowonganSayaPage() {
  const jobs: Job[] = [
    { posisi: "Frontend Developer", tanggal: "01-08-2023", status: "AKTIF" },
    { posisi: "Backend Developer", tanggal: "05-08-2023", status: "DITUTUP" },
    { posisi: "UI/UX Designer", tanggal: "10-08-2023", status: "MENUNGGU" },
    { posisi: "Digital Marketing", tanggal: "15-08-2023", status: "AKTIF" },
    { posisi: "Data Analyst", tanggal: "20-08-2023", status: "DITUTUP" },
    { posisi: "Mobile Developer", tanggal: "25-08-2023", status: "AKTIF" },
    { posisi: "Project Manager", tanggal: "28-08-2023", status: "MENUNGGU" },
    { posisi: "HR Specialist", tanggal: "01-09-2023", status: "AKTIF" },
    { posisi: "Content Writer", tanggal: "05-09-2023", status: "DITUTUP" },
    { posisi: "SEO Specialist", tanggal: "10-09-2023", status: "AKTIF" },
    { posisi: "Customer Support", tanggal: "12-09-2023", status: "MENUNGGU" },
    { posisi: "Finance Staff", tanggal: "13-09-2023", status: "AKTIF" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <LowonganSayaTable jobs={jobs} />
    </div>
  );
}
