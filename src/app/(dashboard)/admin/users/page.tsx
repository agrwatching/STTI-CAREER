"use client";

import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("Applicant");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const applicants = [
    {
      id: 1,
      name: "Sulaer",
      email: "sulaerbolbol@gmail.com",
      role: "Applicant",
      status: "Active",
    },
    {
      id: 2,
      name: "Agra ganesilia",
      email: "agraelisapobolic@gmail.com",
      role: "Applicant",
      status: "Active",
    },
    {
      id: 3,
      name: "Sumiho",
      email: "sumihokunkun@gmail.com",
      role: "Applicant",
      status: "Inactive",
    },
  ];

  const hrRepresentatives = [
    {
      id: 4,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "HR Representative",
      status: "Active",
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "HR Representative",
      status: "Active",
    },
  ];

  const currentUsers =
    activeTab === "Applicant" ? applicants : hrRepresentatives;

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleSave = () => {
    // Here you would typically save the changes
    console.log("Saving user:", editingUser);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div>
          <h1 className="text-2xl font-semibold text-white">Manajemen Users</h1>
          <div className="flex items-center mt-4 space-x-8 relative">
            {/* Applicant Tab */}
            <div className="relative">
              <button
                onClick={() => setActiveTab("Applicant")}
                className={`text-sm pb-2 transition-colors ${
                  activeTab === "Applicant"
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              >
                Applicant
              </button>
              {activeTab === "Applicant" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
              )}
            </div>

            {/* HR Representatives Tab */}
            <div className="relative">
              <button
                onClick={() => setActiveTab("HR Representatives")}
                className={`text-sm pb-2 transition-colors ${
                  activeTab === "HR Representatives"
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              >
                HR Representatives
              </button>
              {activeTab === "HR Representatives" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
              )}
            </div>
          </div>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-white font-medium">Admin</div>
            <div className="text-gray-400 text-sm">AdminCareer@gmail.com</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()}`}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
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
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-gray-750"
                >
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Edit User</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan Email"
                  defaultValue={editingUser?.email}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
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
