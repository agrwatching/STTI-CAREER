"use client";

import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";

// Translation interface
interface TranslationSet {
  [key: string]: {
    [lang: string]: string;
  };
}

// Translation data for all languages
const translations: TranslationSet = {
  // Main title
  'Cari Perusahaan Impianmu': {
    'id': 'Cari Perusahaan Impianmu',
    'en': 'Find Your Dream Company',
    'ja': 'あなたの夢の会社を見つけよう'
  },
  
  // Placeholders
  'Nama Perusahaan': {
    'id': 'Nama Perusahaan',
    'en': 'Company Name',
    'ja': '会社名'
  },
  'Lokasi': {
    'id': 'Lokasi',
    'en': 'Location',
    'ja': '場所'
  },
  'Semua Industri': {
    'id': 'Semua Industri',
    'en': 'All Industries',
    'ja': '全業界'
  },
  'Cari': {
    'id': 'Cari',
    'en': 'Search',
    'ja': '検索'
  },
  
  // Company taglines
  'Teknik Informatika': {
    'id': 'Teknik Informatika',
    'en': 'Information Technology',
    'ja': '情報技術'
  },
  'Software Development': {
    'id': 'Software Development',
    'en': 'Software Development',
    'ja': 'ソフトウェア開発'
  },
  'Creative Agency': {
    'id': 'Creative Agency',
    'en': 'Creative Agency',
    'ja': 'クリエイティブエージェンシー'
  },
  'Transportasi & Logistik': {
    'id': 'Transportasi & Logistik',
    'en': 'Transportation & Logistics',
    'ja': '運輸・物流'
  },
  'Agrikultur': {
    'id': 'Agrikultur',
    'en': 'Agriculture',
    'ja': '農業'
  },
  'EdTech': {
    'id': 'EdTech',
    'en': 'EdTech',
    'ja': '教育技術'
  },
  'Energi Terbarukan': {
    'id': 'Energi Terbarukan',
    'en': 'Renewable Energy',
    'ja': '再生可能エネルギー'
  },
  'Kesehatan': {
    'id': 'Kesehatan',
    'en': 'Healthcare',
    'ja': '医療'
  },
  'Real Estate': {
    'id': 'Real Estate',
    'en': 'Real Estate',
    'ja': '不動産'
  },
  'Otomotif': {
    'id': 'Otomotif',
    'en': 'Automotive',
    'ja': '自動車'
  },
  'Ritel Modern': {
    'id': 'Ritel Modern',
    'en': 'Modern Retail',
    'ja': 'モダンリテール'
  },
  'Media & Hiburan': {
    'id': 'Media & Hiburan',
    'en': 'Media & Entertainment',
    'ja': 'メディア・エンターテインメント'
  },
  'Finansial Teknologi': {
    'id': 'Finansial Teknologi',
    'en': 'Financial Technology',
    'ja': '金融技術'
  },
  'F&B': {
    'id': 'F&B',
    'en': 'F&B',
    'ja': '飲食'
  },
  'Pariwisata': {
    'id': 'Pariwisata',
    'en': 'Tourism',
    'ja': '観光'
  },
  'Konstruksi': {
    'id': 'Konstruksi',
    'en': 'Construction',
    'ja': '建設'
  },
  'Transportasi': {
    'id': 'Transportasi',
    'en': 'Transportation',
    'ja': '交通'
  },
  'Fashion': {
    'id': 'Fashion',
    'en': 'Fashion',
    'ja': 'ファッション'
  },
  
  // Company descriptions
  'desc_1': {
    'id': 'Penyedia solusi teknologi informasi untuk perusahaan dan organisasi.',
    'en': 'Providing information technology solutions for companies and organizations.',
    'ja': '企業・組織向け情報技術ソリューションプロバイダー。'
  },
  'desc_2': {
    'id': 'Membangun aplikasi inovatif berbasis web dan mobile.',
    'en': 'Building innovative web and mobile applications.',
    'ja': '革新的なWebおよびモバイルアプリケーションを構築。'
  },
  'desc_3': {
    'id': 'Fokus pada branding, desain grafis, dan strategi digital marketing.',
    'en': 'Focusing on branding, graphic design, and digital marketing strategy.',
    'ja': 'ブランディング、グラフィックデザイン、デジタルマーケティング戦略に特化。'
  },
  'desc_4': {
    'id': 'Layanan distribusi cepat dan aman ke seluruh wilayah Indonesia.',
    'en': 'Fast and secure distribution services throughout Indonesia.',
    'ja': 'インドネシア全域への迅速で安全な配送サービス。'
  },
  'desc_5': {
    'id': 'Pengolahan hasil pertanian menjadi produk bernilai tambah.',
    'en': 'Processing agricultural products into value-added products.',
    'ja': '農産物を付加価値製品に加工。'
  },
  'desc_6': {
    'id': 'Platform pembelajaran online untuk siswa dan profesional.',
    'en': 'Online learning platform for students and professionals.',
    'ja': '学生・専門家向けオンライン学習プラットフォーム。'
  },
  'desc_7': {
    'id': 'Mengembangkan solusi energi bersih dan ramah lingkungan.',
    'en': 'Developing clean and environmentally friendly energy solutions.',
    'ja': 'クリーンで環境に優しいエネルギーソリューションの開発。'
  },
  'desc_8': {
    'id': 'Menyediakan layanan klinik modern dan aplikasi kesehatan digital.',
    'en': 'Providing modern clinic services and digital health applications.',
    'ja': 'モダンクリニックサービスとデジタルヘルスアプリの提供。'
  },
  'desc_9': {
    'id': 'Pengembang perumahan dan gedung komersial modern.',
    'en': 'Developer of modern residential and commercial buildings.',
    'ja': 'モダンな住宅・商業ビルの開発業者。'
  },
  'desc_10': {
    'id': 'Produsen dan distributor suku cadang kendaraan bermotor.',
    'en': 'Manufacturer and distributor of motor vehicle spare parts.',
    'ja': '自動車部品の製造・販売業者。'
  },
  'desc_11': {
    'id': 'Mengelola jaringan supermarket dan minimarket di Indonesia.',
    'en': 'Managing supermarket and minimarket networks in Indonesia.',
    'ja': 'インドネシアのスーパーマーケット・コンビニネットワークの運営。'
  },
  'desc_12': {
    'id': 'Produksi konten digital, film, dan iklan kreatif.',
    'en': 'Production of digital content, films, and creative advertisements.',
    'ja': 'デジタルコンテンツ、映画、クリエイティブ広告の制作。'
  },
  'desc_13': {
    'id': 'Memberikan layanan pinjaman online dan pembayaran digital.',
    'en': 'Providing online lending and digital payment services.',
    'ja': 'オンライン融資・デジタル決済サービスの提供。'
  },
  'desc_14': {
    'id': 'Restoran cepat saji dengan cita rasa lokal modern.',
    'en': 'Fast food restaurant with modern local flavors.',
    'ja': 'モダンなローカルフレーバーのファストフードレストラン。'
  },
  'desc_15': {
    'id': 'Penyedia layanan tour & travel domestik dan internasional.',
    'en': 'Provider of domestic and international tour & travel services.',
    'ja': '国内・国際ツアー・トラベルサービスプロバイダー。'
  },
  'desc_16': {
    'id': 'Spesialis pembangunan infrastruktur dan gedung bertingkat.',
    'en': 'Specialist in infrastructure and high-rise building construction.',
    'ja': 'インフラ・高層建築建設のスペシャリスト。'
  },
  'desc_17': {
    'id': 'Layanan transportasi online dan logistik perkotaan.',
    'en': 'Online transportation and urban logistics services.',
    'ja': 'オンライン輸送・都市物流サービス。'
  },
  'desc_18': {
    'id': 'Produksi dan distribusi pakaian casual dan formal.',
    'en': 'Production and distribution of casual and formal clothing.',
    'ja': 'カジュアル・フォーマル衣料の製造・販売。'
  }
};

const Company = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState('id');

  // Function to get translation
  const getTranslation = (key: string, lang: string): string => {
    return translations[key]?.[lang] || key;
  };

  // Listen for language changes from navbar
  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // Data dummy (18 perusahaan berbeda) + logo dari pravatar
  const companies = [
    {
      id: 1,
      name: "PT Palugada Code",
      tagline: "Teknik Informatika",
      description: "desc_1",
      location: "Karawang, Indonesia",
      logo: "https://i.pravatar.cc/80?img=1",
    },
    {
      id: 2,
      name: "PT Nusantara Tech",
      tagline: "Software Development",
      description: "desc_2",
      location: "Jakarta, Indonesia",
      logo: "https://i.pravatar.cc/80?img=2",
    },
    {
      id: 3,
      name: "PT Digital Kreatif",
      tagline: "Creative Agency",
      description: "desc_3",
      location: "Bandung, Indonesia",
      logo: "https://i.pravatar.cc/80?img=3",
    },
    {
      id: 4,
      name: "PT Logistik Jaya",
      tagline: "Transportasi & Logistik",
      description: "desc_4",
      location: "Surabaya, Indonesia",
      logo: "https://i.pravatar.cc/80?img=4",
    },
    {
      id: 5,
      name: "PT Agro Sejahtera",
      tagline: "Agrikultur",
      description: "desc_5",
      location: "Yogyakarta, Indonesia",
      logo: "https://i.pravatar.cc/80?img=5",
    },
    {
      id: 6,
      name: "PT Edukasi Pintar",
      tagline: "EdTech",
      description: "desc_6",
      location: "Depok, Indonesia",
      logo: "https://i.pravatar.cc/80?img=6",
    },
    {
      id: 7,
      name: "PT Energi Baru",
      tagline: "Energi Terbarukan",
      description: "desc_7",
      location: "Makassar, Indonesia",
      logo: "https://i.pravatar.cc/80?img=7",
    },
    {
      id: 8,
      name: "PT Sehat Selalu",
      tagline: "Kesehatan",
      description: "desc_8",
      location: "Medan, Indonesia",
      logo: "https://i.pravatar.cc/80?img=8",
    },
    {
      id: 9,
      name: "PT Properti Maju",
      tagline: "Real Estate",
      description: "desc_9",
      location: "Bekasi, Indonesia",
      logo: "https://i.pravatar.cc/80?img=9",
    },
    {
      id: 10,
      name: "PT Otomotif Jaya",
      tagline: "Otomotif",
      description: "desc_10",
      location: "Semarang, Indonesia",
      logo: "https://i.pravatar.cc/80?img=10",
    },
    {
      id: 11,
      name: "PT Retail Global",
      tagline: "Ritel Modern",
      description: "desc_11",
      location: "Bogor, Indonesia",
      logo: "https://i.pravatar.cc/80?img=11",
    },
    {
      id: 12,
      name: "PT Media Kreatif",
      tagline: "Media & Hiburan",
      description: "desc_12",
      location: "Denpasar, Indonesia",
      logo: "https://i.pravatar.cc/80?img=12",
    },
    {
      id: 13,
      name: "PT Fintech Nusantara",
      tagline: "Finansial Teknologi",
      description: "desc_13",
      location: "Jakarta, Indonesia",
      logo: "https://i.pravatar.cc/80?img=13",
    },
    {
      id: 14,
      name: "PT Makanan Lezat",
      tagline: "F&B",
      description: "desc_14",
      location: "Solo, Indonesia",
      logo: "https://i.pravatar.cc/80?img=14",
    },
    {
      id: 15,
      name: "PT Wisata Indah",
      tagline: "Pariwisata",
      description: "desc_15",
      location: "Bali, Indonesia",
      logo: "https://i.pravatar.cc/80?img=15",
    },
    {
      id: 16,
      name: "PT Bangun Negeri",
      tagline: "Konstruksi",
      description: "desc_16",
      location: "Palembang, Indonesia",
      logo: "https://i.pravatar.cc/80?img=16",
    },
    {
      id: 17,
      name: "PT Transportasi Maju",
      tagline: "Transportasi",
      description: "desc_17",
      location: "Cirebon, Indonesia",
      logo: "https://i.pravatar.cc/80?img=17",
    },
    {
      id: 18,
      name: "PT Fashion Trendy",
      tagline: "Fashion",
      description: "desc_18",
      location: "Tangerang, Indonesia",
      logo: "https://i.pravatar.cc/80?img=18",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirst, indexOfLast);

  const handleSearch = () => {
    console.log("Searching for:", { searchTerm, location, industry });
  };

  // ✅ Card perusahaan dengan logo pravatar
  const CompanyCard = ({ company }: { company: (typeof companies)[0] }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col h-full min-h-[250px]">
      {/* Bagian atas: logo, nama, tagline */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
          <Image
            src={company.logo}
            alt={company.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {company.name}
          </h3>
          <p className="text-blue-600 text-sm">
            {getTranslation(company.tagline, currentLanguage)}
          </p>
        </div>
      </div>

      {/* Bagian bawah: deskripsi & lokasi */}
      <div className="flex-1 flex flex-col items-start">
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {getTranslation(company.description, currentLanguage)}
        </p>
        <div className="flex items-center text-gray-500 text-sm mt-auto">
          <MapPin className="w-4 h-4 mr-1" />
          {company.location}
        </div>
      </div>
    </div>
  );

  const Pagination = () => (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        className="p-2 text-gray-400 hover:text-gray-600"
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        ◀
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`w-10 h-10 rounded-lg ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="p-2 text-gray-400 hover:text-gray-600"
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
      >
        ▶
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Pencarian */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            {getTranslation('Cari Perusahaan Impianmu', currentLanguage)}
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={getTranslation('Nama Perusahaan', currentLanguage)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <input
                type="text"
                placeholder={getTranslation('Lokasi', currentLanguage)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <input
                type="text"
                placeholder={getTranslation('Semua Industri', currentLanguage)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {getTranslation('Cari', currentLanguage)}
            </button>
          </div>
        </div>

        {/* Grid Perusahaan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default Company;