"use client";

import { useState } from "react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Password baru dan konfirmasi tidak sama!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // TODO: ganti dengan API kamu sendiri
      // contoh pakai fetch:
      // const res = await fetch("/api/change-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ oldPassword, newPassword }),
      // });

      // if (!res.ok) throw new Error("Gagal update password");

      setMessage("✅ Password berhasil diubah");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage("❌ Gagal mengubah password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold text-gray-800 mb-6">
        Ubah Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password lama */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password Lama
          </label>
          <input
            type="password"
            className="mt-1 w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        {/* Password baru */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password Baru
          </label>
          <input
            type="password"
            className="mt-1 w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {/* Konfirmasi password baru */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            className="mt-1 w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Feedback */}
        {message && (
          <p
            className={`text-sm text-center mt-2 ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Tombol submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
