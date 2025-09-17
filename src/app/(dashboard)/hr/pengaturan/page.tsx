"use client";

import CompanyProfileForm from "@/components/hr/pengaturan/CompanyProfileForm";
import ChangePasswordForm from "@/components/hr/pengaturan/ChangePasswordForm";

export default function PengaturanPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex-shrink-0">
          <h1 className="text-xl font-semibold">Pengaturan</h1>
        </div>
        
        {/* Content Area dengan scroll */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6 max-w-4xl">
            <CompanyProfileForm />
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
