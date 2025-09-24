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

// Type untuk response API
type ProfileApiResponse = {
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
    profile_photo: string;
    education_level: string;
    major: string;
    institution_name: string;
    gpa: string;
    graduation_year: number;
    entry_year: number;
    work_experience: any;
    certificates: any[];
    cv_file: any;
    cover_letter_file: any;
    portfolio_file: any;
    created_at: string;
    updated_at: string;
    date_of_birth: any;
    user_created_at: string;
    profile_photo_url: string;
    cv_file_url: any;
    cover_letter_file_url: any;
    portfolio_file_url: any;
    work_experiences: any[];
    skills: any[];
  };
};

type User = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  profile_photo?: string | null;
  profile_photo_url?: string | null;
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
  const [education, setEducation] = useState<Education | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk fetch data dari API
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://apicareer-production.up.railway.app/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Tambahkan headers authentication jika diperlukan
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ProfileApiResponse = await response.json();
      
      if (result.success && result.data) {
        const apiData = result.data;
        
        // Mapping data API ke format User
        const mappedUser: User = {
          id: apiData.user_id,
          full_name: apiData.full_name,
          email: apiData.email,
          role: 'pelamar', // default role, sesuaikan dengan kebutuhan
          profile_photo: apiData.profile_photo,
          profile_photo_url: apiData.profile_photo_url,
          created_at: apiData.user_created_at,
          phone: apiData.phone,
          address: apiData.address,
          city: apiData.city,
          country: apiData.country,
        };

        // Mapping data API ke format Education
        const mappedEducation: Education = {
          education_level: apiData.education_level,
          institution_name: apiData.institution_name,
          major: apiData.major,
          gpa: apiData.gpa,
          entry_year: apiData.entry_year.toString(),
          graduation_year: apiData.graduation_year.toString(),
        };

        setUser(mappedUser);
        setEducation(mappedEducation);

        // Optional: Simpan ke localStorage sebagai backup
        localStorage.setItem("user", JSON.stringify(mappedUser));
        localStorage.setItem("education", JSON.stringify(mappedEducation));
      } else {
        throw new Error(result.message || 'Failed to fetch profile data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching profile data:', err);
      
      // Fallback ke localStorage jika API gagal
      const storedUser = localStorage.getItem("user");
      const storedEdu = localStorage.getItem("education");
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedEdu) {
        setEducation(JSON.parse(storedEdu));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <>
        <Header
          title="Dashboard Pelamar"
          name="Loading..."
          role="pelamar"
          avatarUrl={undefined}
        />
        <div className="bg-white rounded-xl p-6 mt-4 h-[calc(100vh-110px)] overflow-y-auto">
          <div className="animate-pulse">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded mb-2 w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error && !user) {
    return (
      <>
        <Header
          title="Dashboard Pelamar"
          name="Error"
          role="pelamar"
          avatarUrl={undefined}
        />
        <div className="bg-white rounded-xl p-6 mt-4 h-[calc(100vh-110px)] overflow-y-auto">
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">Error loading profile: {error}</p>
            <button
              onClick={fetchProfileData}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </>
    );
  }

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
    
    // Optional: Sync dengan API
    // syncUserToAPI(newUser);
  };

  // update education
  const handleUpdateEducation = (updated: Education) => {
    setEducation(updated);
    localStorage.setItem("education", JSON.stringify(updated));
    setIsEditing(false);
    
    // Optional: Sync dengan API
    // syncEducationToAPI(updated);
  };

  return (
    <>
      <Header
        title="Dashboard Pelamar"
        name={user.full_name}
        role={user.role}
        avatarUrl={user.profile_photo_url || user.profile_photo || undefined}
      />

      <div className="bg-white rounded-xl p-6 mt-4 h-[calc(100vh-110px)] overflow-y-auto">
        {/* Error banner jika ada error tapi masih ada data fallback */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Warning: {error} (Showing cached data)</span>
              <button
                onClick={fetchProfileData}
                className="text-yellow-700 underline text-sm hover:no-underline"
              >
                Refresh
              </button>
            </div>
          </div>
        )}

        <ProfileHeader
          name={user.full_name}
          joined={joinedYear}
          avatarUrl={user.profile_photo_url || user.profile_photo || undefined}
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