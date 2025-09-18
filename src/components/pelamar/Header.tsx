"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type User = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  profile_photo?: string | null;
};

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Ambil user dari localStorage setelah login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-red-500">User belum login</p>
      </header>
    );
  }

  const initial = user.full_name?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="flex justify-between items-center">
      {/* Kiri */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Kanan */}
      <div className="flex items-center gap-3">
        {user.profile_photo ? (
          <Image
            src={user.profile_photo}
            alt={user.full_name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
            {initial}
          </div>
        )}

        <div className="text-left">
          <p className="font-semibold">{user.full_name}</p>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>
      </div>
    </header>
  );
}
