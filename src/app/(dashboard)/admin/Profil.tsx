"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // ✅ Hapus semua item auth
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // ✅ Redirect via router
    router.replace("/login");
  };

  return (
    <div className="flex justify-between items-center mb-8 relative">
      <h1 className="text-4xl font-bold text-white">{title}</h1>

      <div className="flex items-center space-x-3 relative">
        {/* Avatar Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-10 h-10 bg-orange-500 rounded-full overflow-hidden focus:outline-none"
        >
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Admin"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </button>

        {/* Nama + Email */}
        <div>
          <div className="text-sm font-medium">Admin</div>
          <div className="text-xs text-gray-400">AdminCareer@gmail.com</div>
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-40 bg-slate-800 rounded-md shadow-lg overflow-hidden z-20">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
