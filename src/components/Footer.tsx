// src/components/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand & Deskripsi */}
        <div>
          <h2 className="text-lg font-bold">STTICAREER</h2>
          <p className="text-sm text-gray-300 mt-2">
            Platform untuk mencari lowongan kerja dan melamar dengan mudah.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-400">Beranda</a></li>
            <li><a href="/lowongan" className="hover:text-yellow-400">Lowongan</a></li>
            <li><a href="/perusahaan" className="hover:text-yellow-400">Perusahaan</a></li>
            <li><a href="/tentang" className="hover:text-yellow-400">Tentang Kami</a></li>
          </ul>
        </div>

        {/* Kontak / Sosial Media */}
        <div>
          <h3 className="font-semibold mb-3">Kontak</h3>
          <p className="text-sm text-gray-300">Email: info@stticareer.com</p>
          <p className="text-sm text-gray-300">Telp: +62 812-3456-7890</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-yellow-400">Facebook</a>
            <a href="#" className="hover:text-yellow-400">LinkedIn</a>
            <a href="#" className="hover:text-yellow-400">Instagram</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} STTICAREER. All rights reserved.
      </div>
    </footer>
  );
}
