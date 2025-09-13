import PelamarDetail from "@/components/hr/pelamar/PelamarDetail";

export default function PelamarDetailPage({ params }: { params: { id: string } }) {
  // Dummy data, di real-case dari DB / API
  const pelamar = {
  id: params.id,
  nama: "Moh Rizal",
  posisi: "Webdev",
  tanggal: "23-08-2023",
  foto: "https://i.pravatar.cc/150?img=12",
  email: "rizal8024@gmail.com",
  telepon: "089xxxxxxx",
  alamat: "Jl. Sumur Selang, Cimahi",
  tanggalLahir: "11-02-2004",
  universitas: "STMIK XYZ Jakarta",
  jurusan: "Teknik Informatika",
  tahunLulus: 2025,
  ipk: 4.0,
  pengalaman: [
    {
      posisi: "Frontend Developer",
      perusahaan: "PT. Maju Mundur",
      periode: "Jan 2023 - Sekarang",
      deskripsi: [
        "Membuat dashboard admin dengan React",
        "Integrasi API dan optimasi performa",
      ],
    },
    
    {
      posisi: "Fullstack Developer",
      perusahaan: "PT. Sukses Selalu",
      periode: "Feb 2021 - Des 2022",
      deskripsi: [
        "Membangun aplikasi internal perusahaan",
        "Mengelola database MySQL dan API Node.js",
      ],
    },
  ],
  ringkasan:
    "Seorang profesional IT dengan pengalaman dalam pengembangan web frontend dan backend, terbiasa bekerja dengan tim menggunakan metodologi Agile.Seorang profesional IT dengan pengalaman dalam pengembangan web frontend dan backend, terbiasa bekerja dengan tim menggunakan metodologi Agile.Seorang profesional IT dengan pengalaman dalam pengembangan web frontend dan backend, terbiasa bekerja dengan tim menggunakan metodologi Agile.Seorang profesional IT dengan pengalaman dalam pengembangan web frontend dan backend, terbiasa bekerja dengan tim menggunakan metodologi Agile.Seorang profesional IT dengan pengalaman dalam pengembangan web frontend dan backend, terbiasa bekerja dengan tim menggunakan metodologi Agile.Seorang profesional IT dengan pengalaman dalam pengembangan web frontend dan backend, terbiasa bekerja dengan tim menggunakan metodologi Agile.",
  keahlian: ["HTML", "CSS", "JavaScript", "React", "TailwindCSS"],
};


  return <PelamarDetail pelamar={pelamar} />;
}
