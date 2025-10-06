"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/pelamar/Sidebar";
import { refreshAccessToken, logout } from "@utils/auth";

export default function PelamarLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = localStorage.getItem("user");
      const role = user ? JSON.parse(user).role : null;

      if (!role || role !== "pelamar") {
        logout(); // pakai fungsi logout dari utils
        return;
      }

      const newToken = await refreshAccessToken(); // refresh token
      if (!newToken) {
        logout();
        return;
      }

      setAuthorized(true);
    };

    checkAuth();

    // Optional: auto-refresh tiap 20 menit
    const interval = setInterval(checkAuth, 20 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
