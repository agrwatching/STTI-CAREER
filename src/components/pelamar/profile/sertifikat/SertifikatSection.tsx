"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import SertifikatForm from "./SertifikatForm";

export default function SertifikatSection() {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // 👉 jadikan state agar bisa dihapus/tambah/edit
  const [sertifikatList, setSertifikatList] = useState([
    {
      nama: "UI/UX Design",
      penerbit: "PT Palugada Code",
      gambar:
        "https://dummyimage.com/250x160/4f46e5/ffffff&text=UI%2FUX+Design",
    },
    {
      nama: "React Developer",
      penerbit: "Meta Academy",
      gambar:
        "https://dummyimage.com/250x160/06b6d4/ffffff&text=React+Developer",
    },
    {
      nama: "JavaScript Expert",
      penerbit: "Google Developers",
      gambar:
        "https://dummyimage.com/250x160/f59e0b/ffffff&text=JavaScript+Expert",
    },
    {
      nama: "Next.js Mastery",
      penerbit: "Vercel Academy",
      gambar:
        "https://dummyimage.com/250x160/10b981/ffffff&text=Next.js+Mastery",
    },
    {
      nama: "Cloud Practitioner",
      penerbit: "AWS",
      gambar: "https://dummyimage.com/250x160/ef4444/ffffff&text=AWS+Cloud",
    },
  ]);

  const handleAdd = () => {
    setEditIndex(null);
    setShowForm(true);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setShowForm(true);
  };

  const handleDelete = (idx: number) => {
    if (confirm("Yakin mau hapus sertifikat ini?")) {
      setSertifikatList((prev) => prev.filter((_, i) => i !== idx));
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
            className="inline-flex items-center bg-blue-600 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          >
            <Plus className="w-3 h-3 mr-1" />
            Tambah Sertifikat
          </button>
        )}
      </div>

      <h2 className="text-sm font-semibold pb-1">Sertifikat</h2>

      {/* Konten */}
      {showForm ? (
        <SertifikatForm
          mode={editIndex === null ? "add" : "edit"}
          data={editIndex !== null ? sertifikatList[editIndex] : undefined}
          onCancel={handleCancel}
          onSave={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto pr-1">
          {sertifikatList.map((cert, idx) => (
            <div
              key={idx}
              className="border rounded overflow-hidden flex flex-col bg-white"
            >
              <div className="relative w-full h-28">
                <Image
                  src={cert.gambar}
                  alt={cert.nama}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-1.5 flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs truncate">{cert.nama}</h4>
                  <p className="text-xs text-gray-500 truncate">
                    {cert.penerbit}
                  </p>
                </div>
                <div className="flex gap-1">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
