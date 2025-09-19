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
  profile_photo?: string | null;
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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("biodata");
  const [user, setUser] = useState<User | null>(null);
  const [education, setEducation] = useState<Education | null>(null); // ✅ tambahan
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    const storedEdu = localStorage.getItem("education");
    if (storedEdu) {
      setEducation(JSON.parse(storedEdu));
    }
  }, []);

  if (!user) {
    return <p className="text-red-500">User belum login</p>;
  }

  const joinedYear = new Date(user.created_at).toLocaleDateString("id-ID", {
    year: "numeric",
  });

  // update user biodata
  const handleUpdateUser = (updated: Partial<User>) => {
    const newUser = { ...user, ...updated };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsEditing(false);
  };

  // update education
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
        avatarUrl={user.profile_photo ?? undefined}
      />

      <div className="bg-white rounded-xl p-6 mt-4 h-[calc(100vh-110px)] overflow-hidden">
        <ProfileHeader
          name={user.full_name}
          joined={joinedYear}
          avatarUrl={user.profile_photo ?? undefined}
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
              education={education}   // ✅ lempar data awal
              isEditing={isEditing}
              onCancel={() => setIsEditing(false)}
              onSaveSuccess={handleUpdateEducation} // ✅ update education state
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
