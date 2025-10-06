"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarHR from "@/components/hr/SidebarHR";
import { refreshAccessToken, logout } from "@utils/auth";

export default function HRLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      if (!user || user.role !== "hr") {
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

      // Simpan HR ID di localStorage untuk kemudahan akses
      if (user?.id) {
        localStorage.setItem("hrId", user.id);
      }

      setAuthorized(true);
    };

    checkAuth();
  }, [router]);

  if (authorized === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        Checking access...
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar kiri */}
      <aside className="h-screen w-64 bg-white border-r">
        <SidebarHR />
      </aside>

      {/* Kanan: header + konten */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b shadow-sm sticky top-0 z-10">
          {/* Bisa juga passing Header langsung di sini */}
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
