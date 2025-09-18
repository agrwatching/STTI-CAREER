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
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-semibold">Pengaturan</h1>

          {/* Tombol Logout */}
          <button
            onClick={() => console.log("Logout clicked")}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Logout
          </button>
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
