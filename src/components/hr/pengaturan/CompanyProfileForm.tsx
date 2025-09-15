"use client";

import { useState } from "react";

export default function CompanyProfileForm() {
  const [logo, setLogo] = useState<File | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data perusahaan disimpan");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg shadow-sm p-3 mb-1 text-sm"
    >
      <h2 className="text-sm font-semibold mb-3">Profil Perusahaan</h2>

      {/* Form grid */}
      <div className="grid grid-cols-2 gap-3 mb-1">
        <div>
          <label className="block text-xs font-medium mb-1">
            Nama Perusahaan
          </label>
          <input
            type="text"
            className="border rounded px-2 py-1.5 w-full text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">
            Email Perusahaan
          </label>
          <input
            type="email"
            className="border rounded px-2 py-1.5 w-full text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">
            Nomor Telepon
          </label>
          <input
            type="text"
            className="border rounded px-2 py-1.5 w-full text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Website</label>
          <input
            type="text"
            className="border rounded px-2 py-1.5 w-full text-xs"
          />
        </div>
      </div>

      {/* Alamat */}
      <div className="mb-3">
        <label className="block text-xs font-medium mb-1">
          Alamat Perusahaan
        </label>
        <textarea
          className="border rounded px-2 py-1.5 w-full text-xs"
          rows={2}
        ></textarea>
      </div>

      {/* Logo */}
      <div className="mb-3">
        <label className="block text-xs font-medium mb-1">Logo Perusahaan</label>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full border flex items-center justify-center bg-gray-100 overflow-hidden">
            {logo ? (
              <img
                src={URL.createObjectURL(logo)}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-xs">Logo</span>
            )}
          </div>
          <label className="cursor-pointer bg-gray-200 px-3 py-1.5 rounded text-xs text-center">
            Ganti Logo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-3 py-1.5 rounded border hover:bg-gray-100 text-xs w-20"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs w-32"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}