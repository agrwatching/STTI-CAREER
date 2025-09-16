"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import KeterampilanForm from "./KeterampilanForm";

export default function KeterampilanSection() {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [skills, setSkills] = useState([
    {
      nama: "UI/UX Design",
      deskripsi: " Saya memiliki pengalaman dalam membuat wireframe, prototype, dan desain visual yang mempertimbangkan pengalaman pengguna yang optimal.",
    },
    {
      nama: "React Developer",
      deskripsi: "Menguasai pengembangan aplikasi web modern menggunakan React, Next.js, dan ekosistem JavaScript.",
    },
    {
      nama: "UI/UX Design",
      deskripsi: " Saya memiliki pengalaman dalam membuat wireframe, prototype, dan desain visual yang mempertimbangkan pengalaman pengguna yang optimal.",
    },
    {
      nama: "React Developer",
      deskripsi: "Menguasai pengembangan aplikasi web modern menggunakan React, Next.js, dan ekosistem JavaScript.",
    },
    {
      nama: "UI/UX Design",
      deskripsi: " Saya memiliki pengalaman dalam membuat wireframe, prototype, dan desain visual yang mempertimbangkan pengalaman pengguna yang optimal.",
    },
    {
      nama: "React Developer",
      deskripsi: "Menguasai pengembangan aplikasi web modern menggunakan React, Next.js, dan ekosistem JavaScript.",
    },
    {
      nama: "UI/UX Design",
      deskripsi: " Saya memiliki pengalaman dalam membuat wireframe, prototype, dan desain visual yang mempertimbangkan pengalaman pengguna yang optimal.",
    },
    {
      nama: "UI/UX Design",
      deskripsi: " Saya memiliki pengalaman dalam membuat wireframe, prototype, dan desain visual yang mempertimbangkan pengalaman pengguna yang optimal.",
    },
    {
      nama: "UI/UX Design",
      deskripsi: " Saya memiliki pengalaman dalam membuat wireframe, prototype, dan desain visual yang mempertimbangkan pengalaman pengguna yang optimal.",
    },
    {
      nama: "React Developer",
      deskripsi: "Menguasai pengembangan aplikasi web modern menggunakan React, Next.js, dan ekosistem JavaScript.",
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
    if (confirm("Yakin mau hapus keterampilan ini?")) {
      setSkills((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditIndex(null);
  };

  const handleSave = (data: { nama: string; deskripsi: string }) => {
    if (editIndex !== null) {
      setSkills((prev) => prev.map((s, i) => (i === editIndex ? { ...s, ...data } : s)));
    } else {
      setSkills((prev) => [...prev, data]);
    }
    setShowForm(false);
    setEditIndex(null);
  };

  return (
    <div className="mt-3">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-end items-center mb-2">
          {!showForm && (
            <button onClick={handleAdd} className="inline-flex items-center bg-blue-600 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors">
              <Plus className="w-3 h-3 mr-1" />
              Tambah Keterampilan
            </button>
          )}
        </div>

        <h2 className="text-sm font-semibold pb-1">Keterampilan</h2>

        {/* Content */}
        {showForm ? (
          <KeterampilanForm mode={editIndex === null ? "add" : "edit"} initialData={editIndex !== null ? skills[editIndex] : undefined} onCancel={handleCancel} onSave={handleSave} />
        ) : (
          <div className="max-h-80 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-white rounded-md border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{skill.nama}</h3>
                    <div className="flex items-center gap-1 ml-2">
                      <button onClick={() => handleEdit(idx)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit keterampilan">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(idx)} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus keterampilan">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-5">{skill.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
