"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Translation interfaces
interface TranslationSet {
  [key: string]: {
    [lang: string]: string;
  };
}

interface CompanyTranslations {
  [key: string]: {
    [lang: string]: {
      name: string;
    };
  };
}

// Language change event interface
interface LanguageChangeEvent extends CustomEvent {
  detail: {
    language: string;
    previousLanguage?: string;
  };
}

type Company = {
  id: number;
  name: string;
  logo: string;
  interns: number;
  alumni: number;
};

// Static translations for UI elements
const translations: TranslationSet = {
  'joinCompanies': {
    'id': 'Bergabung dengan Perusahaan Multinasional Terkemuka',
    'en': 'Join Leading Multinational Companies',
    'ja': '主要な多国籍企業に参加する'
  },
  'companyDescription': {
    'id': 'STTICAREER telah membantu lebih dari 120 perusahaan dan 12.000 peserta melakukan magang di perusahaan top',
    'en': 'STTICAREER has helped more than 120 companies and 12,000 participants carry out internships at top companies',
    'ja': 'STTICAREERは120社以上の企業と12,000人の参加者がトップ企業でのインターンシップを実施するのを支援してきました'
  },
  'interns': {
    'id': 'Magang',
    'en': 'Interns',
    'ja': 'インターン'
  },
  'alumni': {
    'id': 'Alumni',
    'en': 'Alumni',
    'ja': '卒業生'
  }
};

// Company name translations (if needed for localization)
const companyTranslations: CompanyTranslations = {
  '1': {
    'id': { name: 'Pakulaga Code' },
    'en': { name: 'Pakulaga Code' },
    'ja': { name: 'Pakulaga Code' }
  },
  '2': {
    'id': { name: 'TechnoWorks' },
    'en': { name: 'TechnoWorks' },
    'ja': { name: 'TechnoWorks' }
  },
  '3': {
    'id': { name: 'DesignHub' },
    'en': { name: 'DesignHub' },
    'ja': { name: 'DesignHub' }
  },
  '4': {
    'id': { name: 'InsightAI' },
    'en': { name: 'InsightAI' },
    'ja': { name: 'InsightAI' }
  },
  '5': {
    'id': { name: 'GlobalSoft' },
    'en': { name: 'GlobalSoft' },
    'ja': { name: 'GlobalSoft' }
  },
  '6': {
    'id': { name: 'InnovateTech' },
    'en': { name: 'InnovateTech' },
    'ja': { name: 'InnovateTech' }
  },
  '7': {
    'id': { name: 'DataCore' },
    'en': { name: 'DataCore' },
    'ja': { name: 'DataCore' }
  }
};

// Utility functions
const getCurrentLanguage = (): string => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('selectedLanguage') || 'id';
    } catch (error) {
      console.error('Error reading current language:', error);
      return 'id';
    }
  }
  return 'id';
};

const getTranslation = (key: string, lang: string): string => {
  return translations[key]?.[lang] || translations[key]?.['id'] || key;
};

const getCompanyTranslation = (companyId: string, lang: string) => {
  return companyTranslations[companyId]?.[lang] || companyTranslations[companyId]?.['id'] || null;
};

export default function Company() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<string>('id');
  const itemsPerSlide = 3;

  // Create translated companies based on current language
  const getTranslatedCompanies = (): Company[] => {
    const baseCompanies = [
      {
        id: 1,
        logo: "https://i.pravatar.cc/150?img=12",
        interns: 1200,
        alumni: 1000,
      },
      {
        id: 2,
        logo: "https://i.pravatar.cc/150?img=13",
        interns: 800,
        alumni: 900,
      },
      {
        id: 3,
        logo: "https://i.pravatar.cc/150?img=2",
        interns: 1500,
        alumni: 1200,
      },
      {
        id: 4,
        logo: "https://i.pravatar.cc/150?img=14",
        interns: 600,
        alumni: 500,
      },
      {
        id: 5,
        logo: "https://i.pravatar.cc/150?img=15",
        interns: 2000,
        alumni: 1800,
      },
      {
        id: 6,
        logo: "https://i.pravatar.cc/150?img=16",
        interns: 1500,
        alumni: 1300,
      },
      {
        id: 7,
        logo: "https://i.pravatar.cc/150?img=17",
        interns: 1800,
        alumni: 1600,
      },
    ];

    return baseCompanies.map(baseCompany => {
      const translation = getCompanyTranslation(baseCompany.id.toString(), currentLanguage);
      return {
        ...baseCompany,
        name: translation?.name || `Company ${baseCompany.id}`
      };
    });
  };

  const companies = getTranslatedCompanies();
  const totalSlides = Math.ceil(companies.length / itemsPerSlide);

  // Handle language change
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language) {
        setCurrentLanguage(e.detail.language);
        // Reset slider to first slide when language changes to prevent layout issues
        setCurrentSlide(0);
      }
    };

    // Set initial language
    setCurrentLanguage(getCurrentLanguage());

    // Listen for language changes
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // Format numbers based on language
  const formatNumber = (num: number): string => {
    if (currentLanguage === 'ja') {
      return num.toLocaleString('ja-JP');
    } else if (currentLanguage === 'en') {
      return num.toLocaleString('en-US');
    } else {
      return num.toLocaleString('id-ID');
    }
  };

  return (
    <section className="px-8 py-16 bg-gray-50 text-center">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        {getTranslation('joinCompanies', currentLanguage)}
      </h2>
      <p className="text-gray-600 mb-10 max-w-4xl mx-auto">
        {getTranslation('companyDescription', currentLanguage)}
      </p>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={`slide-${slideIndex}-${currentLanguage}`}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-full flex-shrink-0"
            >
              {companies
                .slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide
                )
                .map((company) => (
                  <div
                    key={`company-${company.id}-${currentLanguage}`}
                    className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[280px] hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={100}
                      height={100}
                      className="mb-4 rounded-sm object-cover"
                    />

                    <h3 className="font-semibold text-lg mb-3">{company.name}</h3>
                    <div className="w-12 h-[2px] bg-gray-200 my-3"></div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        👥 {formatNumber(company.interns)} {getTranslation('interns', currentLanguage)}
                      </p>
                      <p className="text-sm text-gray-600">
                        🎓 {formatNumber(company.alumni)} {getTranslation('alumni', currentLanguage)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-blue-800" : "bg-gray-300"
            } hover:bg-blue-600`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}