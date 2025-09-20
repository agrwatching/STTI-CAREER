"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/pelamar/Sidebar";

export default function PelamarLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<null | boolean>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const role = user ? JSON.parse(user).role : null;

    if (!token || role !== "pelamar") {
      // redirect sekali saja, tanpa reload
      router.replace("/login");
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Masih loading → jangan render apapun
  if (authorized === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Tidak authorized → biarkan router.replace jalan
  if (!authorized) return null;

  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
