"use client";
import { useRef } from "react";

type SertifikatFormProps = {
  mode?: "add" | "edit";
  data?: {
    nama: string;
    penerbit: string;
    gambar: string;
  };
  onSave?: () => void;
  onCancel?: () => void;
};

export default function SertifikatForm({
  mode = "add",
  data,
  onSave,
  onCancel,
}: SertifikatFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickUpload = () => {
    fileInputRef.current?.click(); // trigger input file
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File terpilih:", file.name);
      // TODO: bisa simpan ke state atau upload ke server
    }
  };

  return (
    <form className="grid grid-cols-2 gap-4 border p-4 rounded-lg relative bg-white">
      {/* Judul */}
      <h3 className="col-span-2 text-sm font-medium mb-2 text-gray-800">
        {mode === "add" ? "Tambah Sertifikat" : "Edit Sertifikat"}
      </h3>

      {/* Nama Sertifikat */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Nama Sertifikat
        </label>
        <input
          type="text"
          defaultValue={data?.nama}
          className="w-full border rounded-lg px-3 py-2 text-xs"
          placeholder="Contoh : UI/UX Design"
        />
      </div>

      {/* Penerbit */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Penerbit
        </label>
        <input
          type="text"
          defaultValue={data?.penerbit}
          className="w-full border rounded-lg px-3 py-2 text-xs"
          placeholder="Contoh : PT Palugada"
        />
      </div>

      {/* Tanggal */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Tanggal
        </label>
        <input type="date" className="w-full border rounded-lg px-3 py-2 text-xs" />
      </div>

      {/* Upload File */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Unggah Sertifikat
        </label>
        {/* Input file hidden */}
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {/* Div trigger */}
        <div
          onClick={handleClickUpload}
          className="w-full h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-blue-400"
        >
          <span className="text-3xl">🖼️</span>
          <p className="text-xs text-blue-600">
            Unggah File atau seret dan lepas
          </p>
          <p className="text-[10px]">Hanya PDF/JPG/PNG, max 10MB</p>
        </div>
      </div>

      {/* Tombol */}
      <div className="col-span-2 flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-1.5 rounded-lg hover:bg-gray-500 text-xs"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={onSave}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-xs"
        >
          {mode === "add" ? "Tambah Sertifikat" : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
