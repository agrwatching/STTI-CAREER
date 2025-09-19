// src/app/%28dashboard%29/hr/HRLayoutClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarHR from "@/components/hr/SidebarHR";

export default function HRLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const role = user ? JSON.parse(user).role : null;

    if (!token || role !== "hr") {
      router.replace("/login"); // langsung redirect kalau belum login / bukan HR
    } else {
      setAuthorized(true); // token valid & role HR
    }
  }, [router]);

  if (!authorized) return null; // render kosong sampai authorized

  return (
    <div className="flex">
      <SidebarHR />
      <main className="flex-1 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
