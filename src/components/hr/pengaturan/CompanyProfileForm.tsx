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
      className="bg-white border rounded-lg shadow-sm p-6"
    >
      <h2 className="text-lg font-semibold mb-6">Profil Perusahaan</h2>

      {/* Form grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nama Perusahaan
          </label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Perusahaan
          </label>
          <input
            type="email"
            className="border rounded px-3 py-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Website</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full text-sm"
          />
        </div>
      </div>

      {/* Alamat */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Alamat Perusahaan
        </label>
        <textarea
          className="border rounded px-3 py-2 w-full text-sm"
          rows={3}
        ></textarea>
      </div>

      {/* Logo */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Logo Perusahaan
        </label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border flex items-center justify-center bg-gray-100 overflow-hidden">
            {logo ? (
              <img
                src={URL.createObjectURL(logo)}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">Logo</span>
            )}
          </div>
          <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">
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
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded border hover:bg-gray-100 text-sm"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}
