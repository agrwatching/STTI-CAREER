"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BriefcaseBusiness, FileText, Settings } from "lucide-react"; // icon lucide-react

const menuItems = [
  { name: "Data Pribadi", href: "/pelamar/profile/{id}", icon: Home },
  { name: "Simpan Lowongan", href: "/pelamar/lowongan", icon: BriefcaseBusiness },
  { name: "Lamaran saya", href: "/pelamar/lamaran", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0C1E6F] text-white min-h-screen flex flex-col">
      {/* Logo di atas */}
      <div className="flex items-center gap-2 p-6">
        <img src="/logo-stti.png" alt="Logo" className="w-10 h-10" />
        <span className="font-bold text-lg">STTICAREER</span>
      </div>

      {/* Menu di tengah */}
      <nav className="flex flex-col flex-grow justify-center space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-2 rounded-lg transition-colors
                ${isActive ? "bg-[#1C2E9E]" : "hover:bg-[#1C2E9E]/50"}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Pengaturan di bawah */}
      <div className="p-6">
        <Link
          href="/pelamar/pengaturan"
          className={`flex items-center gap-3 px-6 py-2 rounded-lg transition-colors
            ${pathname === "/dashboard/settings" ? "bg-[#1C2E9E]" : "hover:bg-[#1C2E9E]/50"}`}
        >
          <Settings size={20} />
          <span>Pengaturan</span>
        </Link>
      </div>
    </aside>
  );
}
