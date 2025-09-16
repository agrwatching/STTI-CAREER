import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div>
            <div className="text-sm font-medium">Admin</div>
            <div className="text-xs text-gray-400">AdminCareer@gmail.com</div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-4xl">
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
    </div>
  );
};

export default Dashboard;
