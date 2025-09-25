"use client";

import { useState, useEffect } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import PengalamanForm from "./PengalamanForm";

type Pengalaman = {
  id?: string | number;
  posisi: string;
  perusahaan: string;
  deskripsi: string;
  tahunMasuk: string;
  tahunKeluar: string;
  isCurrentJob?: boolean;
};

export default function PengalamanSection() {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [pengalamanList, setPengalamanList] = useState<Pengalaman[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data API → langsung transform ke tipe Pengalaman
  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  const fetchWorkExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://apicareer-production.up.railway.app/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch work experiences");

      const result = await response.json();

      if (result.success && result.data.work_experiences) {
        const transformed: Pengalaman[] = result.data.work_experiences.map((exp: any) => ({
          id: exp.id,
          posisi: exp.position,
          perusahaan: exp.company_name,
          tahunMasuk: new Date(exp.start_date).getFullYear().toString(),
          tahunKeluar: exp.end_date ? new Date(exp.end_date).getFullYear().toString() : "",
          deskripsi: exp.job_description,
          isCurrentJob: exp.is_current === 1,
        }));

        setPengalamanList(transformed);
      }
    } catch (error) {
      console.error("Error fetching work experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditIndex(null);
    setShowForm(true);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setShowForm(true);
  };

  const handleDelete = async (idx: number) => {
    if (!confirm("Yakin mau hapus pengalaman ini?")) return;

    const experienceToDelete = pengalamanList[idx];
    try {
      const response = await fetch(
        `https://apicareer-production.up.railway.app/api/profile/work-experience/${experienceToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete work experience");

      setPengalamanList((prev) => prev.filter((_, i) => i !== idx));
    } catch (error) {
      console.error("Error deleting work experience:", error);
      alert("Gagal menghapus pengalaman kerja. Silakan coba lagi.");
    }
  };

  const handleSave = (values: Pengalaman) => {
    if (editIndex !== null) {
      setPengalamanList((prev) =>
        prev.map((item, i) => (i === editIndex ? values : item))
      );
    } else {
      setPengalamanList((prev) => [...prev, values]);
    }
    setShowForm(false);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditIndex(null);
  };

  if (loading) {
    return (
      <div className="mt-3">
        <h2 className="text-sm font-semibold mb-2">Pengalaman Kerja</h2>
        <div className="text-center py-8 text-gray-500 text-xs">
          Memuat data pengalaman kerja...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="flex justify-end items-center mb-3">
        {!showForm && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 text-sm font-medium rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Tambah Pengalaman
          </button>
        )}
      </div>

      <h2 className="text-sm font-semibold mb-2">Pengalaman Kerja</h2>

      {showForm ? (
        <PengalamanForm
          mode={editIndex === null ? "add" : "edit"}
          data={editIndex !== null ? pengalamanList[editIndex] : undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2 max-h-[45vh] overflow-y-auto pr-1">
          {pengalamanList.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-gray-500 text-xs">
              Belum ada pengalaman kerja. Klik "Tambah Pengalaman" untuk menambahkan.
            </div>
          ) : (
            pengalamanList.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="border rounded p-2 flex justify-between text-xs bg-white"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{exp.posisi}</h4>
                  <p className="text-gray-500 truncate">{exp.perusahaan}</p>
                  <p className="text-gray-400 mt-0.5">
                    {exp.tahunMasuk} - {exp.tahunKeluar || "Sekarang"}
                    {exp.isCurrentJob && (
                      <span className="ml-1 text-green-600 font-medium">(Aktif)</span>
                    )}
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
            ))
          )}
        </div>
      )}
    </div>
  );
}
