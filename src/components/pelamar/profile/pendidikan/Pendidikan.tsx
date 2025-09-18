"use client";

import { useState, useEffect } from "react";

type Education = {
  education_level: string;
  institution_name: string;
  major: string;
  gpa: string;
  entry_year: string;
  graduation_year: string;
};

type Props = {
  education: Education | null;
  isEditing: boolean;
  onCancel: () => void;
  onSaveSuccess: (updated: Education) => void;
};

export default function Pendidikan({ education, isEditing, onCancel, onSaveSuccess }: Props) {
  const [form, setForm] = useState<Education>({
    education_level: "",
    institution_name: "",
    major: "",
    gpa: "",
    entry_year: "",
    graduation_year: "",
  });
  const [loading, setLoading] = useState(false);

  // isi form dari props
  useEffect(() => {
    if (education) setForm(education);
  }, [education]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile/education`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Pendidikan berhasil diperbarui ✅");
        onSaveSuccess(form); // simpan ke state induk
      } else {
        alert("Gagal memperbarui pendidikan: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error update education:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof Education, value: string) {
    setForm({ ...form, [field]: value });
  }

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSave}>
      <div>
        <label className="block text-sm font-medium">Pilih Jenjang</label>
        <input
          type="text"
          value={form.education_level}
          disabled={!isEditing}
          onChange={(e) => handleChange("education_level", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Nama Institusi</label>
        <input
          type="text"
          value={form.institution_name}
          disabled={!isEditing}
          onChange={(e) => handleChange("institution_name", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Jurusan</label>
        <input
          type="text"
          value={form.major}
          disabled={!isEditing}
          onChange={(e) => handleChange("major", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Nilai/IPK</label>
        <input
          type="text"
          value={form.gpa}
          disabled={!isEditing}
          onChange={(e) => handleChange("gpa", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tahun Masuk</label>
        <input
          type="text"
          value={form.entry_year}
          disabled={!isEditing}
          onChange={(e) => handleChange("entry_year", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tahun Keluar</label>
        <input
          type="text"
          value={form.graduation_year}
          disabled={!isEditing}
          onChange={(e) => handleChange("graduation_year", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>

      {isEditing && (
        <div className="col-span-2 flex gap-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "💾 Simpan"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Batal
          </button>
        </div>
      )}
    </form>
  );
}
