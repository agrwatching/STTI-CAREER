// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { Globe } from "lucide-react"; // untuk ikon bahasa

export default function Navbar() {
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
          <Link
            href="/login"
            className="bg-yellow-400 text-white px-6 py-1 rounded-lg font-medium hover:bg-yellow-500 transition"
          >
            Login
          </Link>
          <button className="flex items-center space-x-1">
            <span>ID</span>
            <Globe size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}