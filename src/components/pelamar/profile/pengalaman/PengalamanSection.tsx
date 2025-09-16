"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react"; // 👉 tambah Trash2
import PengalamanForm from "./PengalamanForm";

export default function PengalamanSection() {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // 👉 jadikan state supaya bisa dihapus
  const [pengalamanList, setPengalamanList] = useState([
    {
      posisi: "Frontend Developer",
      perusahaan: "Overstack Dev",
      deskripsi: "Membangun antarmuka aplikasi web dengan React dan Tailwind CSS.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "Frontend Developer",
      perusahaan: "Overstack Dev",
      deskripsi: "Membangun antarmuka aplikasi web dengan React dan Tailwind CSS.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "Frontend Developer",
      perusahaan: "Overstack Dev",
      deskripsi: "Membangun antarmuka aplikasi web dengan React dan Tailwind CSS.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "Frontend Developer",
      perusahaan: "Overstack Dev",
      deskripsi: "Membangun antarmuka aplikasi web dengan React dan Tailwind CSS.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "Frontend Developer",
      perusahaan: "Overstack Dev",
      deskripsi: "Membangun antarmuka aplikasi web dengan React dan Tailwind CSS.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "Frontend Developer",
      perusahaan: "Overstack Dev",
      deskripsi: "Membangun antarmuka aplikasi web dengan React dan Tailwind CSS.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "UI/UX Designer",
      perusahaan: "PT Digital Kreatif",
      deskripsi:
        "Mendesain interface dan pengalaman pengguna untuk aplikasi mobile dan website.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "Backend Developer",
      perusahaan: "PT Solusi Teknologi",
      deskripsi:
        "Mengembangkan REST API, mengatur database, serta optimasi performa server.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "Intern Web Developer",
      perusahaan: "Startup Inovatif",
      deskripsi:
        "Membantu tim dev membuat fitur dasar aplikasi e-commerce dan belajar CI/CD.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
    {
      posisi: "Freelance Developer",
      perusahaan: "Remote Project",
      deskripsi:
        "Menghandle proyek kecil pembuatan landing page dan integrasi API pembayaran.",
       tahunMasuk: "2022",
    tahunKeluar: "2023",
    },
     {
    posisi: "Frontend Developer",
    perusahaan: "Overstack Dev",
    deskripsi: "Membangun antarmuka aplikasi web dengan React dan Tailwind CSS.",
    tahunMasuk: "2023",
    tahunKeluar: "2026",
  },
  {
    posisi: "UI/UX Designer",
    perusahaan: "PT Digital Kreatif",
    deskripsi: "Mendesain interface aplikasi mobile dan website.",
    tahunMasuk: "2022",
    tahunKeluar: "2023",
  },
  ]);

  const handleAdd = () => {
    setEditIndex(null); // mode tambah
    setShowForm(true);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx); // mode edit
    setShowForm(true);
  };

  const handleDelete = (idx: number) => {
    if (confirm("Yakin mau hapus pengalaman ini?")) {
      setPengalamanList((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditIndex(null);
  };

  return (
    <div className="mt-3">
      {/* Header */}
    <div className="flex justify-end items-center mb-3">
  {!showForm && (
    <button
      onClick={handleAdd}
      className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 text-sm font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
    >
      <Plus className="w-4 h-4" />
      Tambah Pengalaman
    </button>
  )}
</div>

    <h2 className="text-sm font-semibold mb-2">Pengalaman Kerja</h2>
      {/* Konten */}
      {showForm ? (
        <PengalamanForm
          mode={editIndex === null ? "add" : "edit"}
          data={editIndex !== null ? pengalamanList[editIndex] : undefined}
          onCancel={handleCancel}
          onSave={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2 max-h-[45vh] overflow-y-auto pr-1">
          {pengalamanList.map((exp, idx) => (
            <div
              key={idx}
              className="border rounded p-2 flex justify-between text-xs bg-white"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{exp.posisi}</h4>
                <p className="text-gray-500 truncate">{exp.perusahaan}</p>
                <p className="text-gray-400 mt-0.5">
                  {exp.tahunMasuk} - {exp.tahunKeluar}
                </p>
                <p className="text-gray-600 mt-0.5 break-words">
                  {exp.deskripsi}
                </p>
              </div>
              <div className="flex gap-1 ml-1">
                <Pencil
                  className="w-3 h-3 text-gray-500 cursor-pointer hover:text-blue-600"
                  onClick={() => handleEdit(idx)}
                />
                <Trash2
                  className="w-3 h-3 text-gray-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(idx)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
