"use client";

import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("Applicant");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const applicants: User[] = [
    { id: 1, name: "Sulaer", email: "sulaerbolbol@gmail.com", role: "Applicant", status: "Active" },
    { id: 2, name: "Agra ganesilia", email: "agraelisapobolic@gmail.com", role: "Applicant", status: "Active" },
    { id: 3, name: "Sumiho", email: "sumihokunkun@gmail.com", role: "Applicant", status: "Inactive" },
  ];

  const hrRepresentatives: User[] = [
    { id: 4, name: "John Doe", email: "john.doe@company.com", role: "HR Representative", status: "Active" },
    { id: 5, name: "Jane Smith", email: "jane.smith@company.com", role: "HR Representative", status: "Active" },
  ];

  const currentUsers: User[] = activeTab === "Applicant" ? applicants : hrRepresentatives;

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleSave = () => {
    console.log("Saving user:", editingUser);
    handleCloseModal();
  };

  return (
    <div className="h-screen text-white">
      {/* ✅ Judul utama */}
      <h2 className="text-3xl px-6 py-4 font-bold">Management Users</h2>

      {/* ✅ Tabs */}
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

      {/* ✅ Card Search & Table */}
      <div className="p-6">
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          {/* 🔍 Search & Filter */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${activeTab.toLowerCase()}`}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="ml-4 flex items-center space-x-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white hover:bg-gray-600 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* ✅ Table Wrapper (scrollable tbody only) */}
          <div className="max-h-80 overflow-y-auto rounded-md">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-700/90 z-10">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">NAME</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">EMAIL</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">ROLE</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">STATUS</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">ACTIONS</th>
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
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
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

      {/* ✅ Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Edit User</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Masukkan Email"
                  defaultValue={editingUser?.email}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Masukkan Password"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCloseModal}
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
