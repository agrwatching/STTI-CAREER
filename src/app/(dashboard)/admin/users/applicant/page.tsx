"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // ✅ import toast

interface Applicant {
  id: number;
  full_name: string;
  email: string;
  role: string;
  address?: string | null;
  phone?: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

const ApplicantTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null); // ✅ simpan ID yg mau dihapus
  const [showConfirm, setShowConfirm] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/admin/users";
  const TOKEN = localStorage.getItem("token");

  // ✅ Ambil data pelamar
 // ✅ Ambil semua data pelamar dari semua halaman
const fetchApplicants = async () => {
  try {
    setLoading(true);

    let allUsers: Applicant[] = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const res = await fetch(`${API_URL}?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Gagal mengambil data pelamar");

      const json = await res.json();
      const users: Applicant[] = json?.data?.users || [];
      totalPages = json?.data?.pagination?.total_pages || 1;

      allUsers = [...allUsers, ...users];
      currentPage++;
    } while (currentPage <= totalPages);

    // ✅ Filter hanya user pelamar
    const filtered = allUsers.filter(
      (u) => u.role?.toLowerCase() === "pelamar"
    );
    setApplicants(filtered);
  } catch (err) {
    console.error("❌ Error fetching applicants:", err);
    toast.error("Gagal memuat data pelamar");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchApplicants();
  }, []);

  // ✅ Tampilkan modal konfirmasi
  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  // ✅ Hapus user setelah konfirmasi
  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(`${API_URL}/${selectedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Gagal menghapus pelamar");

      // ✅ TOAST BERHASIL
      toast.success("Pelamar berhasil dihapus ");
      setShowConfirm(false);
      await fetchApplicants();
    } catch (err) {
      console.error("❌ Error deleting pelamar:", err);

      // ❌ TOAST GAGAL
      toast.error("Gagal menghapus pelamar");
    } finally {
      setSelectedId(null);
    }
  };

  const filtered = applicants.filter((a) => a.full_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative bg-[#1E2235] rounded-xl p-6">
      {/* Search */}
      <div className="flex items-center mb-6">
        <input type="text" placeholder="Cari pelamar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-1/3 px-6 py-3 rounded-md bg-[#2A2E42] text-gray-200 placeholder-gray-400 focus:outline-none" />
        <button onClick={fetchApplicants} className="ml-auto px-6 py-3 rounded-md bg-[#3A3E55] text-gray-200 hover:bg-[#4A4E66]">
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg">
        {loading ? (
          <div className="text-center py-6 text-gray-400">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-[#2A2E42]">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">NAME</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">EMAIL</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">ADDRESS</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">STATUS</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-t border-gray-700 hover:bg-[#2A2E42]">
                  <td className="py-4 px-6 text-white">{user.full_name}</td>
                  <td className="py-4 px-6 text-gray-300">{user.email}</td>
                  <td className="py-4 px-6 text-gray-300">{user.address || "-"}</td>
                  <td className="py-4 px-6">
                    <span className={`px-4 py-1 rounded-full text-xs font-medium ${user.is_active ? "bg-green-500 text-black" : "bg-gray-400 text-black"}`}>{user.is_active ? "Active" : "Inactive"}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2 text-sm">
                      <button className="text-yellow-400 hover:text-yellow-300 font-medium">Edit</button>
                      <span className="text-gray-500">|</span>
                      <button onClick={() => confirmDelete(user.id)} className="text-red-400 hover:text-red-300 font-medium">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    Tidak ada pelamar ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1E2235] rounded-md w-[550px] shadow-lg border border-[#2A2E42] p-5">
            {/* Baris teks + tombol */}
            <div className="flex items-center justify-between">
              {/* teks di kiri */}
              <p className="text-gray-200 text-sm font-medium whitespace-nowrap">Apakah anda yakin ingin menghapus akun ini ?</p>

              {/* tombol di kanan */}
              <div className="flex gap-2 ml-4">
                <button onClick={handleDelete} className="px-4 py-1.5 text-sm font-semibold text-white bg-[#2A2E42] rounded-md hover:bg-[#343850] transition-colors">
                  Iya
                </button>
                <button onClick={() => setShowConfirm(false)} className="px-4 py-1.5 text-sm font-semibold text-white bg-[#2A2E42] rounded-md hover:bg-[#343850] transition-colors">
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantTable;
