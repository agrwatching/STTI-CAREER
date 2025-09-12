import Link from "next/link";

export default function SidebarHR() {
  return (
    <div className="w-64 h-screen bg-[#0B1B54] text-white flex flex-col">
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-lg font-bold">STTICAREER</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/hr/dashboard"
              className="block px-4 py-2 rounded-lg bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/hr/buat-lowongan"
              className="block px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Buat Lowongan
            </Link>
          </li>
          <li>
            <Link
              href="/hr/lowongan-saya"
              className="block px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Lowongan Saya
            </Link>
          </li>
          <li>
            <Link
              href="/hr/pelamar"
              className="block px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Pelamar
            </Link>
          </li>
          <li>
            <Link
              href="/hr/pengaturan"
              className="block px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Pengaturan
            </Link>
          </li>
        </ul>
      </nav>

      {/* Tombol bawah */}
      <div className="p-4">
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Buat Lowongan
        </button>
      </div>
    </div>
  );
}
