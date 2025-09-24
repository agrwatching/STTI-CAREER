"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ApiUser {
  id: number;
  full_name: string;
  email: string;
  role: "pelamar" | "hr" | "admin";
  is_active: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "Applicant" | "HR Representative";
  status: "Active" | "Inactive";
}

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Applicant" | "HR Representatives">(
    "Applicant"
  );
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // ✅ Fetch users from backend
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const mapped: User[] = json.data.users
          .filter((u: ApiUser) => u.role === "pelamar" || u.role === "hr")
          .map((u: ApiUser) => ({
            id: u.id,
            name: u.full_name,
            email: u.email,
            role: u.role === "pelamar" ? "Applicant" : "HR Representative",
            status: u.is_active === 1 ? "Active" : "Inactive",
          }));

        setUsers(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // ✅ Filter users by tab
  const currentUsers = users.filter((u) =>
    activeTab === "Applicant"
      ? u.role === "Applicant"
      : u.role === "HR Representative"
  );

  // ✅ Edit handler
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: editingUser.name,
            email: editingUser.email,
            role: editingUser.role === "Applicant" ? "pelamar" : "hr",
            is_active: editingUser.status === "Active" ? 1 : 0,
          }),
        }
      );
      if (!res.ok) throw new Error("Gagal update user");

      setShowEditModal(false);
      setEditingUser(null);

      // refresh users
      const refreshed = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`
      ).then((r) => r.json());
      const mapped: User[] = refreshed.data.users
        .filter((u: ApiUser) => u.role === "pelamar" || u.role === "hr")
        .map((u: ApiUser) => ({
          id: u.id,
          name: u.full_name,
          email: u.email,
          role: u.role === "pelamar" ? "Applicant" : "HR Representative",
          status: u.is_active === 1 ? "Active" : "Inactive",
        }));

      setUsers(mapped);
    } catch {
      alert("Error update user");
    }
  };

  // ✅ Delete handler
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin hapus user ini?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Gagal hapus user");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Error hapus user");
    }
  };

  if (loading) return <div className="p-6 text-gray-300">Loading users...</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;

  return (
    <div className="h-screen text-white">
      <h2 className="text-3xl px-6 pb-4 font-bold">Management Users</h2>

      {/* Tabs */}
      <div className="px-6">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => setActiveTab("Applicant")}
            className={`text-sm pb-2 transition-colors ${
              activeTab === "Applicant"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400"
            }`}
          >
            Applicant
          </button>
          <button
            onClick={() => setActiveTab("HR Representatives")}
            className={`text-sm pb-2 transition-colors ${
              activeTab === "HR Representatives"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400"
            }`}
          >
            HR Representatives
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="max-h-80 overflow-y-auto rounded-md">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-700/90 z-10">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">
                    NAME
                  </th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">
                    EMAIL
                  </th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">
                    ROLE
                  </th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">
                    STATUS
                  </th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700">
                    <td className="py-4 px-6 text-white">{user.name}</td>
                    <td className="py-4 px-6 text-gray-400">{user.email}</td>
                    <td className="py-4 px-6 text-gray-400">{user.role}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <span className="text-gray-600">|</span>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      status: e.target.value as "Active" | "Inactive",
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
