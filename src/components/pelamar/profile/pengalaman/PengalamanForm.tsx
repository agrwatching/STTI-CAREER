"use client";

import { useState, FormEvent } from "react";

type Pengalaman = {
  posisi: string;
  perusahaan: string;
  deskripsi: string;
  tahunMasuk: string;
  tahunKeluar: string;
};

type PengalamanFormProps = {
  mode?: "add" | "edit"; // default add
  data?: Pengalaman;
  onSave?: (values: Pengalaman) => void;
  onCancel?: () => void;
};

export default function PengalamanForm({
  mode = "add",
  data,
  onSave,
  onCancel,
}: PengalamanFormProps) {
  const [values, setValues] = useState<Pengalaman>({
    posisi: data?.posisi || "",
    perusahaan: data?.perusahaan || "",
    tahunMasuk: data?.tahunMasuk || "",
    tahunKeluar: data?.tahunKeluar || "",
    deskripsi: data?.deskripsi || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border border-gray-300 rounded-lg p-4 bg-white"
    >
      {/* Judul */}
      <h3 className="text-sm font-medium mb-3 text-gray-800">
        {mode === "add" ? "Tambah Pengalaman Kerja" : "Edit Pengalaman Kerja"}
      </h3>

      {/* Posisi & Perusahaan */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Posisi
          </label>
          <input
            type="text"
            name="posisi"
            value={values.posisi}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
              focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            placeholder="Contoh : Frontend Developer"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Nama Perusahaan
          </label>
          <input
            type="text"
            name="perusahaan"
            value={values.perusahaan}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
              focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            placeholder="Contoh : PT Palugada"
          />
        </div>
      </div>

      {/* Tahun Masuk & Keluar */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Tahun Masuk
          </label>
          <input
            type="text"
            name="tahunMasuk"
            value={values.tahunMasuk}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
              focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            placeholder="Contoh : 2023"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Tahun Keluar
          </label>
          <input
            type="text"
            name="tahunKeluar"
            value={values.tahunKeluar}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
              focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            placeholder="Contoh : 2026"
          />
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-xs font-medium text-gray-600 pb-1">
          Deskripsi Pekerjaan
        </label>
        <textarea
          name="deskripsi"
          value={values.deskripsi}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs 
            focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none"
          rows={4}
          placeholder="Jelaskan pekerjaan Anda"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-2 ">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 text-xs bg-gray-400 text-white rounded 
            hover:bg-gray-500 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded 
            hover:bg-blue-700 transition-colors"
        >
          {mode === "add" ? "Tambah Pengalaman" : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
