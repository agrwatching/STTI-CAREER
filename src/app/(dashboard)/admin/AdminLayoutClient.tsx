"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarAdmin from "@/app/(dashboard)/admin/adminSidebar";
import Header from "@/app/(dashboard)/admin/Profil";
import { refreshAccessToken, logout } from "@utils/auth";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/job": "",
  "/admin/users": "",
  "/admin/statistics": "",
  "/admin/notification": "",
};

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<null | boolean>(null);

  const title = pageTitles[pathname] || "";

  useEffect(() => {
    const checkAuth = async () => {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      if (!user || user.role !== "admin") {
        logout(); // redirect ke login
        return;
      }

      const token = localStorage.getItem("accessToken");

      // Jika token tidak ada atau expired, coba refresh
      if (!token) {
        const newToken = await refreshAccessToken();
        if (!newToken) {
          logout();
          return;
        }
      }

      setAuthorized(true);
    };

    checkAuth();
  }, [router]);

  if (authorized === null) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Checking access...
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="h-screen bg-slate-900 text-white flex">
      {/* ✅ Sidebar fixed */}
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
