"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Profile = {
  full_name: string;
  email: string;
  profile_photo?: string | null;
  created_at: string;
};

export default function ProfileHeader({ onEdit }: { onEdit?: () => void }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.ok && data?.data) {
          setProfile(data.data);
        }
      } catch (err) {
        console.error("Gagal fetch profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p className="text-red-500">Profil tidak ditemukan</p>;
  }

  const initial = profile.full_name.charAt(0).toUpperCase();
  const joinedDate = new Date(profile.created_at).toLocaleDateString("id-ID", {
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center mb-5">
      {/* Avatar + Info */}
      <div className="flex items-center gap-3">
        {profile.profile_photo ? (
          <div className="relative w-12 h-12">
            <Image
              src={profile.profile_photo}
              alt={profile.full_name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-base">
            {initial}
          </div>
        )}
        <div>
          <h1 className="text-lg font-semibold">{profile.full_name}</h1>
          <p className="text-gray-500 text-sm">Bergabung sejak {joinedDate}</p>
        </div>
      </div>

      {/* Tombol Edit */}
      <button
        onClick={onEdit}
        className="flex items-center gap-2 bg-blue-600 text-white px-3.5 py-1.5 text-sm rounded-md hover:bg-blue-700"
      >
        ✏️ Edit Profil
      </button>
    </div>
  );
}
