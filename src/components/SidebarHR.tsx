"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarHR() {
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", href: "/hr/dashboard" },
    { name: "Buat Lowongan", href: "/hr/buat-lowongan" },
    { name: "Lowongan Saya", href: "/hr/lowongan-saya" },
    { name: "Pelamar", href: "/hr/pelamar" },
    { name: "Pengaturan", href: "/hr/pengaturan" },
  ];

  return (
    <div className="w-64 h-screen bg-[#0B1B54] text-white flex flex-col">
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-lg font-bold">STTICAREER</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menus.map((menu) => {
            const isActive = pathname === menu.href;
            return (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className={`block px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "font-semibold text-black"
                      : "text-white hover:bg-gray-600"
                  }`}
                  style={{
                    backgroundColor: isActive ? "#D9D9D9" : "transparent",
                  }}
                >
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Tombol bawah */}
      <div className="p-4">
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Buat Lowongan
        </button>
      </div>
    </div>
  );
}
