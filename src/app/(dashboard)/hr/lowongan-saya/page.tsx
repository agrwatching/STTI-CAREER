import LowonganSayaTable from "@/components/hr/lowongan-saya/LowonganSayaTable";
import type { Job } from "@/components/hr/lowongan-saya/LowonganSayaTable";

export default async function LowonganSayaPage() {
  // Mengirim request ke API untuk mendapatkan data lowongan pekerjaan
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
    cache: "no-store", // Memastikan data yang diambil selalu fresh, tidak menggunakan cache
  });

  // Mengubah response menjadi JSON
  const data = await res.json();

  // Menampilkan data yang diterima dari API ke console untuk debugging
  console.log("Response from /api/jobs:", data);

  // Mendefinisikan array kosong untuk menyimpan daftar pekerjaan yang sudah diproses
  let jobs: Job[] = [];

  // Memeriksa apakah data yang diterima sesuai format yang diharapkan
  if (data?.data && Array.isArray(data.data)) {
    // Memetakan data dari API ke format yang dibutuhkan oleh komponen LowonganSayaTable
    jobs = data.data.map((item: any) => ({
      hr_id: item.hr_id,
      posisi: item.job_title, 
      tanggal: new Date(item.created_at).toLocaleDateString("id-ID"), // Mengubah tanggal pembuatan ke format tanggal Indonesia
      status: convertStatus(item.verification_status), // Mengkonversi status verifikasi ke status yang dapat ditampilkan
    }));
  } else {
    // Jika format data tidak sesuai, tampilkan error di console
    console.error("Unexpected response format:", data);
  }

  // Mengembalikan JSX yang menampilkan tabel lowongan pekerjaan dengan data yang sudah diproses
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <LowonganSayaTable jobs={jobs} />
    </div>
  );
}

// Fungsi untuk mengkonversi status verifikasi API menjadi status yang ramah pengguna
function convertStatus(status: string): Job["status"] {
  switch (status.toLowerCase()) {
    case "verified":
      return "AKTIF"; // Jika sudah diverifikasi, statusnya AKTIF
    case "rejected":
      return "DITUTUP"; // Jika ditolak, statusnya DITUTUP
    case "pending":
      return "MENUNGGU"; // Jika status pending, berarti MENUNGGU
    default:
      return "MENUNGGU"; // Default status MENUNGGU jika tidak dikenali
  }
}
