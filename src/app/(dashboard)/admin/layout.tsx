// src/app/(dashboard)/admin/layout.tsx
"use client";

import "@/app/globals.css";
import SidebarAdmin from "@/app/(dashboard)/admin/adminSidebar";
import Header from "@/app/(dashboard)/admin/Profil";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/job": "",
  "/admin/users": "",
  "/admin/statistics": "",
  "/admin/notification": "Notifications",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "";

  return (
    <div className="h-screen bg-slate-900 text-white flex">
      {/* ✅ Sidebar dibikin fixed */}
      <div className="fixed inset-y-0 left-0 w-64">
        <SidebarAdmin />
      </div>

      {/* ✅ Konten utama */}
      <div className="flex-1 flex flex-col ml-64">
        <div className="px-12 pt-6">
          <Header title={title} />
        </div>

        {/* ✅ Scroll hanya di area konten */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
