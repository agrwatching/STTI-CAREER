"use client";

import { CheckCircle2, Clock, XCircle, Pencil, Trash2, Wallet, MapPin } from "lucide-react";

export default function BuatLowongan() {
  const jobs = [
    {
      status: "Tunggu Verifikasi",
      statusColor: "text-blue-600",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: "Frontend Developer",
      desc: "Kami mencari Frontend Developer yang kreatif dan berpengalaman untuk mengembangkan aplikasi web modern, responsif, dan user-friendly. Deskripsi ini panjang sekali sehingga bisa ngetes apakah card otomatis menyesuaikan tinggi dengan baik. Developer diharapkan mampu bekerja dalam tim, memahami Gitflow, serta terbiasa dengan Agile Scrum.",
      salary: "Rp. 3.000.000 - Rp. 6.000.000",
      location: "Jakarta Selatan, Indonesia",
      logo: "https://i.pravatar.cc/150?img=5",
      type: "WFH",
    },
    {
      status: "Terverifikasi",
      statusColor: "text-green-600",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      title: "Backend Developer",
      desc: "Mencari Backend Developer yang menguasai Node.js dan database untuk mendukung sistem aplikasi berskala besar.",
      salary: "Rp. 5.000.000 - Rp. 9.000.000",
      location: "Bandung, Indonesia",
      logo: "https://i.pravatar.cc/150?img=15",
      type: "Hybrid",
    },
    {
      status: "Tidak Terverifikasi",
      statusColor: "text-red-600",
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      title: "UI/UX Designer",
      desc: "Kami membutuhkan UI/UX Designer yang inovatif untuk mendesain aplikasi yang menarik dan mudah digunakan.",
      salary: "Rp. 4.000.000 - Rp. 7.000.000",
      location: "Surabaya, Indonesia",
      logo: "https://i.pravatar.cc/150?img=25",
      type: "Onsite",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col bg-gray-50 p-8">
        {/* Header sticky */}
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-gray-50 z-10 pb-2">
          <h1 className="text-2xl font-bold">Buat Lowongan</h1>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900">
            + Lowongan
          </button>
        </div>

        {/* Job List (scroll hanya kalau butuh) */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[calc(100vh-100px)]">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-5 flex gap-4"
            >
              {/* Logo */}
              <img
                src={job.logo}
                alt="Company Logo"
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <p
                  className={`text-sm font-semibold mb-1 flex items-center gap-1 ${job.statusColor}`}
                >
                  {job.icon}
                  {job.status}
                </p>

                <h2 className="text-lg font-bold text-gray-800">
                  {job.title}
                </h2>

                <p className="text-gray-600 text-sm mb-3">
                  {job.desc}
                </p>

                {/* Info + Actions → tetap di bawah */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                  <span className="flex items-center gap-1">
                    <Wallet className="w-4 h-4" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>

                  <div className="flex gap-2 ml-auto">
                    <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      <Trash2 className="w-4 h-4" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
