"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import Image from "next/image";

interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  role: string;
  foto?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const isActiveLink = (href: string) => pathname === href;

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Lowongan", href: "/lowongan" },
    { name: "Perusahaan", href: "/perusahaan" },
    { name: "Tentang Kami", href: "/tentang" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0A1FB5] to-[#0A18E0] text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold hover:text-yellow-400 transition-colors">
          STTICAREER
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className={`hover:text-yellow-400 transition-colors ${isActiveLink(item.href) ? "text-yellow-400" : ""}`}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoading ? (
            <div className="w-8 h-8 animate-pulse bg-gray-300 rounded-full"></div>
          ) : !user ? (
            <Link href="/login" className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
              Login
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Profile */}
              <Link href={`/pelamar/profile/${user.id}`} className="flex items-center space-x-2 hover:text-yellow-400 transition-colors">
                {user.foto ? (
                  <Image src={user.foto} alt={`${user.full_name} profile`} width={40} height={40} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-blue-900 font-bold">{user.full_name.charAt(0).toUpperCase()}</div>
                )}
                <span className="max-w-32 truncate">{user.full_name}</span>
              </Link>

              {/* Logout */}
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Logout
              </button>
            </div>
          )}

          {/* Language */}
          <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
            <span>ID</span>
            <Globe size={18} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 border-t border-blue-600">
          <div className="flex flex-col space-y-2 mt-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors ${isActiveLink(item.href) ? "text-yellow-400 bg-blue-700" : ""}`}>
                {item.name}
              </Link>
            ))}

            <div className="border-t border-blue-600 pt-4 mt-4 space-y-2">
              {!user ? (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block bg-yellow-400 text-blue-900 px-3 py-2 rounded-md font-medium text-center hover:bg-yellow-500 transition-colors">
                  Login
                </Link>
              ) : (
                <>
                  <Link href={`/pelamar/profile/${user.id}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    {user.foto ? (
                      <Image src={user.foto} alt={`${user.full_name} profile`} width={40} height={40} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-blue-900 font-bold">{user.full_name.charAt(0).toUpperCase()}</div>
                    )}
                    <span className="truncate">{user.full_name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Language Mobile */}
              <button className="flex items-center space-x-1 px-3 py-2 mt-2 hover:bg-blue-700 rounded-md transition-colors">
                <span>ID</span>
                <Globe size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
