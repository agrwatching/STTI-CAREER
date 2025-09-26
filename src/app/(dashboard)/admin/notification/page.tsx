// src/app/(dashboard)/admin/notification/page.tsx
"use client";

import { Construction } from "lucide-react";

export default function NotificationPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gray-900 rounded-lg">
      <div className="text-center p-8 rounded-2xl shadow-md bg-white">
        <Construction className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Halaman ini sedang dalam pengembangan</h1>
        <p className="text-gray-600">
          Kami sedang menyiapkan fitur terbaik untukmu. Silakan kembali lagi nanti 🚀
        </p>
      </div>
    </main>
  );
}
