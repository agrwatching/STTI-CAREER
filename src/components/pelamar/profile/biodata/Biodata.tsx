"use client";

import { useState } from "react";

type User = {
  full_name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  profile_photo?: string | null;
};

type Props = {
  user: User;
  isEditing: boolean;
  onCancel: () => void;
  onSaveSuccess: (updated: Partial<User>) => void;
};

export default function Biodata({ user, isEditing, onCancel, onSaveSuccess }: Props) {
  const [formData, setFormData] = useState<User>({
    full_name: user.full_name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    profile_photo: user.profile_photo || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const cleanFormData = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v ?? null])
      );

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/biodata`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanFormData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Biodata berhasil diperbarui");
        onSaveSuccess(formData);
      } else {
        alert(data.message || "Gagal memperbarui biodata");
      }
    } catch (err) {
      console.error("Error update biodata:", err);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Nama Lengkap</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Nomor Telepon</label>
        <input
          type="text"
          name="phone"
          value={formData.phone ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Alamat</label>
        <input
          type="text"
          name="address"
          value={formData.address ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Kota</label>
        <input
          type="text"
          name="city"
          value={formData.city ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Negara</label>
        <input
          type="text"
          name="country"
          value={formData.country ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500 disabled:bg-gray-100"
        />
      </div>

      {/* Upload Foto */}
      <div>
        <label className="block text-sm font-medium">Upload Foto</label>
        <input
          type="file"
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500 disabled:bg-gray-100"
        />
      </div>

      {isEditing && (
        <div className="col-span-2 flex gap-2 mt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
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
