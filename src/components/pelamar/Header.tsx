"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type HeaderProps = {
  title: string;
};

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface TranslationSet {
  [key: string]: {
    [lang: string]: string;
  };
}

interface UserData {
  name: string;
  role: string;
  avatarUrl: string | null;
}

const languages: Language[] = [
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

const translations: TranslationSet = {
  'Data Pribadi': {
    'id': 'Data Pribadi',
    'en': 'Personal Data',
    'ja': '個人データ'
  },
  'Profile': {
    'id': 'Profil',
    'en': 'Profile',
    'ja': 'プロフィール'
  },
  'Dashboard': {
    'id': 'Dashboard',
    'en': 'Dashboard',
    'ja': 'ダッシュボード'
  },
  'Settings': {
    'id': 'Pengaturan',
    'en': 'Settings',
    'ja': '設定'
  },
  'Simpan Lowongan': {
    'id': 'Simpan Lowongan',
    'en': 'Saved Jobs',
    'ja': '保存した求人'
  },
  'Lamaran saya': {
    'id': 'Lamaran saya',
    'en': 'My Applications',
    'ja': '私の応募'
  },
  'pelamar': {
    'id': 'Pelamar',
    'en': 'Applicant',
    'ja': '応募者'
  },
  'admin': {
    'id': 'Admin',
    'en': 'Admin',
    'ja': '管理者'
  },
  'hr': {
    'id': 'HR',
    'en': 'HR',
    'ja': '人事'
  },
  'user': {
    'id': 'Pengguna',
    'en': 'User',
    'ja': 'ユーザー'
  },
  'perusahaan': {
    'id': 'Perusahaan',
    'en': 'Company',
    'ja': '企業'
  }
};

export default function Header({ title }: HeaderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'Loading...',
    role: 'user',
    avatarUrl: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Ambil token dari localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('No token found, redirecting to login...');
          // Optional: redirect ke login jika tidak ada token
          // window.location.href = '/login';
          setIsLoading(false);
          return;
        }

        const response = await fetch('https://backendstticareer-123965511401.asia-southeast2.run.app/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized - token might be expired');
            // Optional: redirect ke login
            // localStorage.removeItem('token');
            // window.location.href = '/login';
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          const user = result.data;
          setUserData({
            name: user.full_name || 'User',
            role: user.role || 'pelamar',
            avatarUrl: user.profile_photo_url || null
          });

          // Optional: Simpan ke localStorage untuk caching
          localStorage.setItem('userData', JSON.stringify({
            name: user.full_name,
            role: user.role,
            avatarUrl: user.profile_photo_url
          }));
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        
        // Fallback: coba ambil dari localStorage cache
        const cachedUser = localStorage.getItem('userData');
        if (cachedUser) {
          try {
            const parsedUser = JSON.parse(cachedUser);
            setUserData({
              name: parsedUser.name || 'User',
              role: parsedUser.role || 'pelamar',
              avatarUrl: parsedUser.avatarUrl || null
            });
          } catch (e) {
            console.error('Error parsing cached user data:', e);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const initial = userData.name?.charAt(0).toUpperCase() ?? "?";

  const getTranslation = (key: string, lang: string): string => {
    return translations[key]?.[lang] || key;
  };

  const handleLanguageChange = (language: Language) => {
    const previousLanguage = currentLanguage.code;
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language.code);
    setIsLanguageDropdownOpen(false);
    
    const event = new CustomEvent('languageChanged', {
      detail: {
        language: language.code,
        previousLanguage: previousLanguage
      }
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }

    const handleLanguageChange = (event: CustomEvent) => {
      const language = languages.find(lang => lang.code === event.detail.language);
      if (language) {
        setCurrentLanguage(language);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const translatedTitle = getTranslation(title, currentLanguage.code);
  const translatedRole = getTranslation(userData.role, currentLanguage.code);

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{translatedTitle}</h1>

      <div className="flex items-center gap-4">
        {/* Language Dropdown */}
        <div className="relative" ref={languageDropdownRef}>
          <button 
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center space-x-1 hover:bg-gray-100 transition-colors px-2 py-1 rounded-md border border-gray-200"
          >
            <span className="text-lg">{currentLanguage.flag}</span>
            <span className="text-sm font-medium text-gray-700">{currentLanguage.code.toUpperCase()}</span>
            <ChevronDown size={16} className={`transform transition-transform text-gray-500 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 transition-colors text-gray-800 ${
                    currentLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          ) : userData.avatarUrl ? (
            <Image
              src={userData.avatarUrl}
              alt={userData.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold';
                  fallbackDiv.textContent = initial;
                  parent.appendChild(fallbackDiv);
                }
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
              {initial}
            </div>
          )}

          <div className="text-left">
            <p className="font-semibold">{isLoading ? 'Loading...' : userData.name}</p>
            <p className="text-sm text-gray-500 capitalize">{translatedRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}