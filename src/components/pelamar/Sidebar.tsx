"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Home, BriefcaseBusiness, FileText, Settings, Menu, X, type LucideIcon } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { name: "Data Pribadi", href: "/pelamar/profile/{id}", icon: Home },
  { name: "Simpan Lowongan", href: "/pelamar/lowongan", icon: BriefcaseBusiness },
  { name: "Lamaran saya", href: "/pelamar/lamaran", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0C1E6F] text-white min-h-screen flex-col">
        {/* Logo + Back Button */}
        <div className="flex items-center gap-3 p-6">
          <button onClick={() => window.history.back()}>
            <Image
              src="/back.png"
              alt="Back"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>

          <Image
            src="/logo-stti.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
            priority
          />
          <span className="font-bold text-lg">STTICAREER</span>
        </div>

        {/* Menu Tengah */}
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

        {/* Menu Bawah */}
        <div className="p-6">
          <Link
            href="/pelamar/pengaturan"
            className={`flex items-center gap-3 px-6 py-2 rounded-lg transition-colors
              ${pathname === "/dashboard/settings"
                ? "bg-[#1C2E9E]"
                : "hover:bg-[#1C2E9E]/50"
              }`}
          >
            <Settings size={20} />
            <span>Pengaturan</span>
          </Link>
        </div>
      </aside>

      {/* ✅ Mobile Navbar */}
      <div className="md:hidden bg-[#0C1E6F] text-white">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <button onClick={() => window.history.back()}>
              <Image
                src="/back.png"
                alt="Back"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
            <Image
              src="/logo-stti.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-bold text-base">STTICAREER</span>
          </div>

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="flex flex-col space-y-2 px-4 pb-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                    ${isActive ? "bg-[#1C2E9E]" : "hover:bg-[#1C2E9E]/50"}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <Link
              href="/pelamar/pengaturan"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                ${pathname === "/dashboard/settings"
                  ? "bg-[#1C2E9E]"
                  : "hover:bg-[#1C2E9E]/50"
                }`}
              onClick={() => setIsOpen(false)}
            >
              <Settings size={18} />
              <span>Pengaturan</span>
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
