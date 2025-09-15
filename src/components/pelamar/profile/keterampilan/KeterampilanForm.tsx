"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Props = {
  mode: "add" | "edit";
  initialData?: { nama: string; deskripsi: string };
  onCancel: () => void;
  onSave: (data: { nama: string; deskripsi: string }) => void;
};

export default function KeterampilanForm({
  mode,
  initialData,
  onCancel,
  onSave,
}: Props) {
  const [nama, setNama] = useState(initialData?.nama || "");
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || "");
  const [tags, setTags] = useState(["Html", "Css", "JavaScript"]);
  const [links, setLinks] = useState([""]);
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);

  const handleFileChange = (idx: number, file: File | null) => {
    const newFiles = [...files];
    newFiles[idx] = file;
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    onSave({ nama, deskripsi });
  };

  return (
    <div className="max-h-[55vh] overflow-y-auto bg-white rounded-md border border-gray-300 p-6">
      {/* Input Nama Keterampilan */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Keterampilan
        </label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Contoh : Html, Css, Data Science"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Input Deskripsi */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi
        </label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Jelaskan pengalaman atau keterampilan terkait..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Input Tautan */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Portofolio Online & Tautan terkait
        </label>
        {links.map((link, idx) => (
          <input
            key={idx}
            type="url"
            defaultValue={link}
            placeholder="http://"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 mb-2"
          />
        ))}
        <button
          type="button"
          onClick={() => setLinks([...links, ""])}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <Plus className="w-4 h-4 mr-1" /> Tambah Tautan Lain
        </button>
      </div>

      {/* Unggah File Pendukung */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Unggah File Pendukung
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Project Files",
              desc: "Tunjukkan Project yang pernah anda kerjakan (.zip)",
            },
            {
              title: "Curriculum Vitae",
              desc: "Unggah CV terbaru (PDF)",
            },
            {
              title: "Paklaring Keahlian",
              desc: "Unggah surat pengalaman kerja / sertifikat (PDF)",
            },
          ].map((item, idx) => (
            <label
              key={idx}
              className="border border-gray-300 rounded-md p-4 text-center cursor-pointer hover:shadow-md transition flex flex-col items-center"
            >
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(idx, e.target.files?.[0] || null)
                }
              />
              <h4 className="text-base font-semibold text-gray-900 mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 mb-3">{item.desc}</p>
              <img
                src="/folder-icon.png"
                alt="folder"
                className="w-16 h-16 mb-2"
              />
              <p className="text-xs">
                <span className="text-blue-600 hover:underline">
                  Unggah File
                </span>{" "}
                atau tarik & seret
              </p>
              <p className="text-[11px] text-gray-500">Maksimal 2 MB</p>
              {files[idx] && (
                <p className="mt-2 text-xs text-gray-600 truncate">
                  {files[idx]?.name}
                </p>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          type="button"
          className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Batal
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
        >
          {mode === "add" ? "Simpan" : "Update"}
        </button>
      </div>
    </div>
  );
}
