// src/app/(dashboard)/admin/dashboard/page.tsx
"use client";

import React from "react";

const Dashboard: React.FC = () => {
  return (
    <>
      {/* Overview Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 px-6">Overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-4xl px-6">
        {/* Row 1 */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Total Users</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Total Job Posts</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Pending Verification</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        {/* Row 2 */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Verified Job</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Rejected Job</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Total Application</div>
          <div className="text-2xl font-bold">1.234</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
