"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  role: string;
  foto?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0A1FB5] to-[#0A18E0] text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="text-xl font-bold">STTICAREER</div>

        {/* Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-400 text-yellow-400">
            Beranda
          </Link>
          <Link href="/lowongan" className="hover:text-yellow-400">
            Lowongan
          </Link>
          <Link href="/perusahaan" className="hover:text-yellow-400">
            Perusahaan
          </Link>
          <Link href="/tentang" className="hover:text-yellow-400">
            Tentang Kami
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <Link
              href="/login"
              className="bg-yellow-400 text-white px-6 py-1 rounded-lg font-medium hover:bg-yellow-500 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Profil */}
              <Link
                href="/pelamar/profile"
                className="flex items-center space-x-2"
              >
                {user.foto ? (
                  <img
                    src={user.foto}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-blue-900 font-bold">
                    {user.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:inline">{user.full_name}</span>
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

          {/* Language */}
          <button className="flex items-center space-x-1">
            <span>ID</span>
            <Globe size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
