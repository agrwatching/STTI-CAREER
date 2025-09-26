"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";

const Company = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  // Data dummy (18 perusahaan berbeda) + logo dari pravatar
  const companies = [
    {
      id: 1,
      name: "PT Palugada Code",
      tagline: "Teknik Informatika",
      description:
        "Penyedia solusi teknologi informasi untuk perusahaan dan organisasi.",
      location: "Karawang, Indonesia",
      logo: "https://i.pravatar.cc/80?img=1",
    },
    {
      id: 2,
      name: "PT Nusantara Tech",
      tagline: "Software Development",
      description: "Membangun aplikasi inovatif berbasis web dan mobile.",
      location: "Jakarta, Indonesia",
      logo: "https://i.pravatar.cc/80?img=2",
    },
    {
      id: 3,
      name: "PT Digital Kreatif",
      tagline: "Creative Agency",
      description:
        "Fokus pada branding, desain grafis, dan strategi digital marketing.",
      location: "Bandung, Indonesia",
      logo: "https://i.pravatar.cc/80?img=3",
    },
    {
      id: 4,
      name: "PT Logistik Jaya",
      tagline: "Transportasi & Logistik",
      description:
        "Layanan distribusi cepat dan aman ke seluruh wilayah Indonesia.",
      location: "Surabaya, Indonesia",
      logo: "https://i.pravatar.cc/80?img=4",
    },
    {
      id: 5,
      name: "PT Agro Sejahtera",
      tagline: "Agrikultur",
      description: "Pengolahan hasil pertanian menjadi produk bernilai tambah.",
      location: "Yogyakarta, Indonesia",
      logo: "https://i.pravatar.cc/80?img=5",
    },
    {
      id: 6,
      name: "PT Edukasi Pintar",
      tagline: "EdTech",
      description: "Platform pembelajaran online untuk siswa dan profesional.",
      location: "Depok, Indonesia",
      logo: "https://i.pravatar.cc/80?img=6",
    },
    {
      id: 7,
      name: "PT Energi Baru",
      tagline: "Energi Terbarukan",
      description: "Mengembangkan solusi energi bersih dan ramah lingkungan.",
      location: "Makassar, Indonesia",
      logo: "https://i.pravatar.cc/80?img=7",
    },
    {
      id: 8,
      name: "PT Sehat Selalu",
      tagline: "Kesehatan",
      description:
        "Menyediakan layanan klinik modern dan aplikasi kesehatan digital.",
      location: "Medan, Indonesia",
      logo: "https://i.pravatar.cc/80?img=8",
    },
    {
      id: 9,
      name: "PT Properti Maju",
      tagline: "Real Estate",
      description: "Pengembang perumahan dan gedung komersial modern.",
      location: "Bekasi, Indonesia",
      logo: "https://i.pravatar.cc/80?img=9",
    },
    {
      id: 10,
      name: "PT Otomotif Jaya",
      tagline: "Otomotif",
      description: "Produsen dan distributor suku cadang kendaraan bermotor.",
      location: "Semarang, Indonesia",
      logo: "https://i.pravatar.cc/80?img=10",
    },
    {
      id: 11,
      name: "PT Retail Global",
      tagline: "Ritel Modern",
      description:
        "Mengelola jaringan supermarket dan minimarket di Indonesia.",
      location: "Bogor, Indonesia",
      logo: "https://i.pravatar.cc/80?img=11",
    },
    {
      id: 12,
      name: "PT Media Kreatif",
      tagline: "Media & Hiburan",
      description: "Produksi konten digital, film, dan iklan kreatif.",
      location: "Denpasar, Indonesia",
      logo: "https://i.pravatar.cc/80?img=12",
    },
    {
      id: 13,
      name: "PT Fintech Nusantara",
      tagline: "Finansial Teknologi",
      description: "Memberikan layanan pinjaman online dan pembayaran digital.",
      location: "Jakarta, Indonesia",
      logo: "https://i.pravatar.cc/80?img=13",
    },
    {
      id: 14,
      name: "PT Makanan Lezat",
      tagline: "F&B",
      description: "Restoran cepat saji dengan cita rasa lokal modern.",
      location: "Solo, Indonesia",
      logo: "https://i.pravatar.cc/80?img=14",
    },
    {
      id: 15,
      name: "PT Wisata Indah",
      tagline: "Pariwisata",
      description: "Penyedia layanan tour & travel domestik dan internasional.",
      location: "Bali, Indonesia",
      logo: "https://i.pravatar.cc/80?img=15",
    },
    {
      id: 16,
      name: "PT Bangun Negeri",
      tagline: "Konstruksi",
      description: "Spesialis pembangunan infrastruktur dan gedung bertingkat.",
      location: "Palembang, Indonesia",
      logo: "https://i.pravatar.cc/80?img=16",
    },
    {
      id: 17,
      name: "PT Transportasi Maju",
      tagline: "Transportasi",
      description: "Layanan transportasi online dan logistik perkotaan.",
      location: "Cirebon, Indonesia",
      logo: "https://i.pravatar.cc/80?img=17",
    },
    {
      id: 18,
      name: "PT Fashion Trendy",
      tagline: "Fashion",
      description: "Produksi dan distribusi pakaian casual dan formal.",
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
          <p className="text-blue-600 text-sm">{company.tagline}</p>
        </div>
      </div>

      {/* Bagian bawah: deskripsi & lokasi */}
      <div className="flex-1 flex flex-col items-start">
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {company.description}
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
            Cari Perusahaan Impianmu
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Nama Perusahaan"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <input
                type="text"
                placeholder="Lokasi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <input
                type="text"
                placeholder="Semua Industri"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Cari
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
