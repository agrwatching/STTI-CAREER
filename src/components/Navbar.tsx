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
  profile_photo_url?: string;
}

interface ApiProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    full_name: string;
    email: string;
    profile_photo_url: string;
    // ... other fields
  };
}

export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Fungsi untuk fetch data profil dari API
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('https://apicareer-production.up.railway.app/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result: ApiProfileResponse = await response.json();
        
        if (result.success && result.data) {
          const userData: UserProfile = {
            id: result.data.user_id,
            full_name: result.data.full_name,
            email: result.data.email,
            role: 'pelamar',
            profile_photo_url: result.data.profile_photo_url
          };
          
          setUser(userData);
          // Simpan juga ke localStorage untuk cache
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback ke localStorage jika API gagal
      fallbackToLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  // Fallback ke data localStorage
  const fallbackToLocalStorage = () => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed: UserProfile = JSON.parse(savedUser);
        if (parsed.role === "pelamar") {
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // Cek dulu localStorage untuk loading cepat
      fallbackToLocalStorage();
      // Kemudian fetch data terbaru dari API
      fetchProfileData();
    } else {
      setLoading(false);
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

  // Tentukan URL foto profil
  const getProfilePhotoUrl = () => {
    if (!user) return null;
    
    // Prioritaskan profile_photo_url dari API
    if (user.profile_photo_url) {
      return user.profile_photo_url;
    }
    
    // Fallback ke foto lama jika ada
    if (user.foto) {
      return user.foto;
    }
    
    return null;
  };

  const profilePhotoUrl = getProfilePhotoUrl();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0A1FB5] to-[#0A18E0] text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-bold hover:text-yellow-400 transition-colors"
        >
          STTICAREER
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`hover:text-yellow-400 transition-colors ${
                isActiveLink(item.href) ? "text-yellow-400" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {loading ? (
            // Loading state
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-400 rounded animate-pulse"></div>
            </div>
          ) : !user ? (
            <Link
              href="/login"
              className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Profil untuk pelamar */}
              <Link
                href={`/pelamar/profile/${user.id}`}
                className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
              >
                {profilePhotoUrl ? (
                  <Image
                    src={profilePhotoUrl}
                    alt={`${user.full_name} profile`}
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      // Fallback jika gambar error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-blue-900 font-bold">
                    {user.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="max-w-32 truncate">{user.full_name}</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
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
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 border-t border-blue-600">
          <div className="flex flex-col space-y-2 mt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors ${
                  isActiveLink(item.href) ? "text-yellow-400 bg-blue-700" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-blue-600 pt-4 mt-4 space-y-2">
              {loading ? (
                // Loading state mobile
                <div className="flex items-center space-x-2 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-400 rounded animate-pulse"></div>
                </div>
              ) : !user ? (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-yellow-400 text-blue-900 px-3 py-2 rounded-md font-medium text-center hover:bg-yellow-500 transition-colors"
                >
                  Login
                </Link>
              ) : (
                <>
                  {/* Profile mobile */}
                  <Link
                    href={`/pelamar/profile/${user.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {profilePhotoUrl ? (
                      <Image
                        src={profilePhotoUrl}
                        alt={`${user.full_name} profile`}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-blue-900 font-bold">
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="truncate">{user.full_name}</span>
                  </Link>

                  {/* Logout mobile */}
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