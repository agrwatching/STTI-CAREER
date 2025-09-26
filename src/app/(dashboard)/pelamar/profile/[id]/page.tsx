// src/app/(dashboard)/pelamar/profile/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/pelamar/Header";
import ProfileHeader from "@/components/pelamar/profile/ProfileHeader";
import Tabs from "@/components/pelamar/profile/Tabs";
import Biodata from "@/components/pelamar/profile/biodata/Biodata";
import Pendidikan from "@/components/pelamar/profile/pendidikan/Pendidikan";
import PengalamanSection from "@/components/pelamar/profile/pengalaman/PengalamanSection";
import SertifikatSection from "@/components/pelamar/profile/sertifikat/SertifikatSection";
import KeterampilanSection from "@/components/pelamar/profile/keterampilan/KeterampilanSection";

type User = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  profile_photo_url?: string | null; // ✅ ganti ke profile_photo_url
  created_at: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
};

type Education = {
  education_level: string;
  institution_name: string;
  major: string;
  gpa: string;
  entry_year: string;
  graduation_year: string;
};

type ApiProfileResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    profile_photo_url: string; // ✅ dari API
    education_level: string;
    major: string;
    institution_name: string;
    gpa: string;
    graduation_year: number;
    entry_year: number;
    created_at: string;
    user_created_at: string;
  };
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("biodata");
  const [user, setUser] = useState<User | null>(null);
  const [education, setEducation] = useState<Education | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiProfileResponse = await response.json();

      if (data.success) {
        // Transform data dari API ke format User
        const userData: User = {
          id: data.data.id,
          full_name: data.data.full_name,
          email: data.data.email,
          role: "pelamar", // Sesuaikan dengan role yang benar
          profile_photo_url: data.data.profile_photo_url, // ✅ ambil dari API
          created_at: data.data.user_created_at,
          phone: data.data.phone,
          address: data.data.address,
          city: data.data.city,
          country: data.data.country,
        };

        const educationData: Education = {
          education_level: data.data.education_level,
          institution_name: data.data.institution_name,
          major: data.data.major,
          gpa: data.data.gpa,
          entry_year: data.data.entry_year.toString(),
          graduation_year: data.data.graduation_year.toString(),
        };

        setUser(userData);
        setEducation(educationData);
        
        // Simpan ke localStorage untuk cache (opsional)
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("education", JSON.stringify(educationData));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Gagal memuat data profil");
      
      // Fallback ke localStorage jika API gagal
      const storedUser = localStorage.getItem("user");
      const storedEdu = localStorage.getItem("education");
      
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedEdu) setEducation(JSON.parse(storedEdu));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Memuat data profil...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">User belum login</p>
      </div>
    );
  }

  const joinedYear = new Date(user.created_at).toLocaleDateString("id-ID", {
    year: "numeric",
  });

  const handleUpdateUser = (updated: Partial<User>) => {
    const newUser = { ...user, ...updated };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsEditing(false);
  };

  const handleUpdateEducation = (updated: Education) => {
    setEducation(updated);
    localStorage.setItem("education", JSON.stringify(updated));
    setIsEditing(false);
  };

  return (
    <>
      <Header
        title="Dashboard Pelamar"
        name={user.full_name}
        role={user.role}
        avatarUrl={user.profile_photo_url ?? undefined} // ✅ gunakan profile_photo_url
      />

      <div className="bg-white rounded-xl p-6 mt-4 h-[calc(100vh-110px)] overflow-y-auto">
        <ProfileHeader
          name={user.full_name}
          joined={joinedYear}
          avatarUrl={user.profile_photo_url ?? undefined} // ✅ gunakan profile_photo_url
          onEdit={() => setIsEditing(true)}
        />

        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="pb-6">
          {activeTab === "biodata" && (
            <Biodata
              user={user}
              isEditing={isEditing}
              onCancel={() => setIsEditing(false)}
              onSaveSuccess={handleUpdateUser}
            />
          )}
          {activeTab === "pendidikan" && (
            <Pendidikan
              education={education}
              isEditing={isEditing}
              onCancel={() => setIsEditing(false)}
              onSaveSuccess={handleUpdateEducation}
            />
          )}
          {activeTab === "pengalaman" && <PengalamanSection />}
          {activeTab === "sertifikat" && <SertifikatSection />}
          {activeTab === "keterampilan" && <KeterampilanSection />}
        </div>
      </div>
    </>
  );
}