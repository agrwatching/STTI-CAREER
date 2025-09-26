"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarHR from "@/components/hr/SidebarHR";

export default function HRLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<null | boolean>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const role = user?.role;

    if (!token || role !== "hr") {
      router.replace("/login");
    } else {
      // simpan hrId supaya bisa dipakai StatsSection
      if (user?.id) {
        localStorage.setItem("hrId", user.id);
      }
      setAuthorized(true);
    }
  }, [router]);

  if (authorized === null) {
    return <div className="flex h-screen items-center justify-center">Checking access...</div>;
  }

  if (!authorized) return null;

  return (
    <div className="flex">
      <SidebarHR />
      <main className="flex-1 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
