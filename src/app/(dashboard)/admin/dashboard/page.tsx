"use client";
import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Hapus token dan user di localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect ke login
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-3 relative">
          {/* Foto Profil */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 bg-orange-500 rounded-full overflow-hidden focus:outline-none"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </button>

          <div>
            <div className="text-sm font-medium">Admin</div>
            <div className="text-xs text-gray-400">
              AdminCareer@gmail.com
            </div>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-40 bg-slate-800 rounded-md shadow-lg overflow-hidden z-20">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-4xl">
        {/* Row 1 */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Total Users</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Total Job Posts</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Pending Verification</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        {/* Row 2 */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Verified Job</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Rejected Job</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Total Application</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
