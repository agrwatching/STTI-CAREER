"use client";

import { useState } from "react";

type User = {
  full_name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  date_of_birth?: string | null;
  profile_photo?: string | null;
};

type Props = {
  user: User;
  isEditing: boolean;
  onCancel: () => void;
  onSaveSuccess: (updated: Partial<User>) => void;
};

export default function Biodata({
  user,
  isEditing,
  onCancel,
  onSaveSuccess,
}: Props) {
  const [formData, setFormData] = useState<User>({
    full_name: user.full_name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    date_of_birth: user.date_of_birth || "",
    profile_photo: user.profile_photo || "",
  });
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user.profile_photo || null
  );

  /** ✅ Update input text */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** ✅ Saat pilih foto baru */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setPhotoPreview(tempUrl);
    }
  };

  /** ✅ Simpan biodata + upload foto jika ada */
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      // 1️⃣ Update biodata text
      const cleanFormData = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v ?? null])
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile/biodata`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanFormData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal update biodata");

      // 2️⃣ Upload foto baru jika dipilih
      if (photoFile) {
        const formDataImg = new FormData();
        formDataImg.append("profile_photo", photoFile);

        const imgRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/profile/upload-photo`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formDataImg,
          }
        );

        const imgData = await imgRes.json();
        if (!imgRes.ok) throw new Error(imgData.message || "Gagal upload foto");

        // gunakan URL yang diberikan backend jika ada
        const uploadedUrl =
          imgData.url ||
          `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imgData.filename}`;

        cleanFormData.profile_photo = uploadedUrl;
        setPhotoPreview(uploadedUrl);
      }

      alert("Biodata berhasil diperbarui");
      onSaveSuccess(cleanFormData);
    } catch (err) {
      console.error("Error update biodata:", err);
      alert((err as Error).message || "Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-4">
      {/* Nama */}
      <div>
        <label className="block text-sm font-medium">Nama Lengkap</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
        />
      </div>

      {/* Telepon */}
      <div>
        <label className="block text-sm font-medium">Nomor Telepon</label>
        <input
          type="text"
          name="phone"
          value={formData.phone ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>

      {/* Alamat */}
      <div>
        <label className="block text-sm font-medium">Alamat</label>
        <input
          type="text"
          name="address"
          value={formData.address ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>

      {/* Kota */}
      <div>
        <label className="block text-sm font-medium">Kota</label>
        <input
          type="text"
          name="city"
          value={formData.city ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>

      {/* Negara */}
      <div>
        <label className="block text-sm font-medium">Negara</label>
        <input
          type="text"
          name="country"
          value={formData.country ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>

      {/* Tanggal Lahir */}
      <div>
        <label className="block text-sm font-medium">Tanggal Lahir</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />
      </div>

      {/* Upload Foto */}
      <div>
        <label className="block text-sm font-medium">Upload Foto</label>
        <input
          type="file"
          onChange={handlePhotoChange}
          disabled={!isEditing}
          className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
        />

        {photoPreview && (
          <div className="mt-2">
            <img
              src={photoPreview}
              alt="Preview Foto"
              className="w-32 h-32 object-cover rounded-md border"
            />
            {photoFile && (
              <p className="text-xs mt-1 text-gray-600">{photoFile.name}</p>
            )}
          </div>
        )}
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
