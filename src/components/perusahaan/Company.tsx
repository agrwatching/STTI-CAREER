"use client";

import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

const Company = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  // Data dummy untuk PT Palugada Code
  const companies = [
    {
      id: 1,
      name: "PT Palugada Code",
      tagline: "Teknik Informatika",
      description:
        "Usaha di bidang Teknologi Informasi (IT) meliputi kegiatan usaha yang berkaitan untuk penyediaan sistem berbasis teknologi untuk membantu pemrosesan organisasi.",
      location: "Karawang, Indonesia",
    },
    {
      id: 2,
      name: "PT Palugada Code",
      tagline: "Teknik Informatika",
      description:
        "Usaha di bidang Teknologi Informasi (IT) meliputi kegiatan usaha yang berkaitan untuk penyediaan sistem berbasis teknologi untuk membantu pemrosesan organisasi.",
      location: "Karawang, Indonesia",
    },
    {
      id: 3,
      name: "PT Palugada Code",
      tagline: "Teknik Informatika",
      description:
        "Usaha di bidang Teknologi Informasi (IT) meliputi kegiatan usaha yang berkaitan untuk penyediaan sistem berbasis teknologi untuk membantu pemrosesan organisasi.",
      location: "Karawang, Indonesia",
    },
    {
      id: 4,
      name: "PT Palugada Code",
      tagline: "Teknik Informatika",
      description:
        "Usaha di bidang Teknologi Informasi (IT) meliputi kegiatan usaha yang berkaitan untuk penyediaan sistem berbasis teknologi untuk membantu pemrosesan organisasi.",
      location: "Karawang, Indonesia",
    },
    {
      id: 5,
      name: "PT Palugada Code",
      tagline: "Teknik Informatika",
      description:
        "Usaha di bidang Teknologi Informasi (IT) meliputi kegiatan usaha yang berkaitan untuk penyediaan sistem berbasis teknologi untuk membantu pemrosesan organisasi.",
      location: "Karawang, Indonesia",
    },
    {
      id: 6,
      name: "PT Palugada Code",
      tagline: "Teknik Informatika",
      description:
        "Usaha di bidang Teknologi Informasi (IT) meliputi kegiatan usaha yang berkaitan untuk penyediaan sistem berbasis teknologi untuk membantu pemrosesan organisasi.",
      location: "Karawang, Indonesia",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearch = () => {
    // Logic untuk pencarian dapat ditambahkan di sini
    console.log("Searching for:", { searchTerm, location, industry });
  };

  const CompanyCard = ({ company }: { company: (typeof companies)[0] }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Logo placeholder */}
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
            <div className="w-2 h-2 bg-white rounded-sm"></div>
            <div className="w-2 h-2 bg-white rounded-sm"></div>
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {company.name}
          </h3>
          <p className="text-blue-600 text-sm mb-2">{company.tagline}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {company.description}
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {company.location}
          </div>
        </div>
      </div>
    </div>
  );

  const Pagination = () => (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        className="p-2 text-gray-400 hover:text-gray-600"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {[1, 2, 3, 4].map((page) => (
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
        onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {companies.map((company) => (
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
