import SidebarHR from "@/components/SidebarHR";
import { Users, Hourglass, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  return (
    
    <div className="flex h-screen overflow-hidden">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-1">
          {/* Total Pelamar */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 font-medium">Total Pelamar</p>
            <h2 className="text-3xl font-bold">1.500</h2>
          </div>

          {/* Tahapan Seleksi */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 mb-2">
              <Hourglass className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-gray-600 font-medium">Tahapan Seleksi</p>
            <h2 className="text-3xl font-bold">850</h2>
          </div>

          {/* Tahapan Lolos */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-600 font-medium">Tahapan Lolos</p>
            <h2 className="text-3xl font-bold">400</h2>
          </div>
        </div>

        {/* Table Wrapper with Scroll */}
        <h2 className="font-bold py-4 text-lg">Lowongan Kerja Aktif</h2>

        <div className="max-h-full bg-white shadow rounded-lg flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3">Posisi</th>
                  <th className="px-6 py-3">Total Pelamar</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6}).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-6 py-3">Frontend Developer</td>
                    <td className="px-6 py-3">200</td>
                    <td className="px-6 py-3">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Aktif</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
