"use client";

import { useState } from "react";
import Header from "@/components/pelamar/profile/Header";
import ProfileHeader from "@/components/pelamar/profile/ProfileHeader";
import Tabs from "@/components/pelamar/profile/Tabs";
import Biodata from "@/components/pelamar/profile/biodata/Biodata";
import Pendidikan from "@/components/pelamar/profile/pendidikan/Pendidikan";
import PengalamanSection from "@/components/pelamar/profile/pengalaman/PengalamanSection";
import SertifikatSection from "@/components/pelamar/profile/sertifikat/SertifikatSection";
import KeterampilanSection from "@/components/pelamar/profile/keterampilan/KeterampilanSection";

// nanti tinggal tambah Sertifikat, Keterampilan
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("biodata");

  return (
    <>
      <Header title="Dashboard Pelamar" name="Muhammad Rizal" role="Pelamar" />

      <div className="bg-white rounded-xl p-6 mt-4 h-[calc(100vh-110px)] overflow-hidden">
        <ProfileHeader name="Muhammad Rizal" joined="2024" onEdit={() => alert("Edit Profil diklik")} />

        {/* Tabs navigasi */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Konten dinamis */}
        <div className="pb-6">
          {activeTab === "biodata" && <Biodata />}
          {activeTab === "pendidikan" && <Pendidikan />}
          {activeTab === "pengalaman" && <PengalamanSection />}
          {activeTab === "sertifikat" && <SertifikatSection />}
          {activeTab === "keterampilan" && <KeterampilanSection />}
        </div>
      </div>
    </>
  );
}
