"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Interface untuk tipe data job
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
  salary?: string;
  postedAt?: string;
}

// Interface untuk filter
interface JobFilters {
  type: string;
  level: string;
  location: string;
  search?: string;
}

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    type: "",
    level: "",
    location: "",
    search: "",
  });
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobsPerPage] = useState<number>(5); // Jumlah job per halaman

  const router = useRouter();

  // Mock data - akan diganti dengan API call
  const mockJobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "PT Perusahaan Lokal",
      location: "Surabaya, Indonesia",
      type: "Full Time",
      description:
        "Kami mencari Senior Frontend Developer berpengalaman untuk memimpin pengembangan antarmuka aplikasi web modern. Kandidat ideal memiliki kemampuan teknis yang mendalam pada framework frontend populer serta mampu memimpin tim dalam menciptakan produk yang skalabel, responsif, dan berpererforma tinggi.",
      tags: ["Remote", "Senior"],
      salary: "Rp 15.000.000 – Rp 25.000.000",
      postedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Junior Backend Developer",
      company: "PT Teknologi Maju",
      location: "Jakarta, Indonesia",
      type: "Full Time",
      description:
        "Bergabunglah dengan tim backend kami untuk mengembangkan sistem yang robust dan scalable. Posisi ini cocok untuk fresh graduate atau developer dengan pengalaman 1-2 tahun yang ingin berkembang di bidang backend development.",
      tags: ["Onsite", "Junior"],
      salary: "Rp 8.000.000 – Rp 12.000.000",
      postedAt: "1 week ago",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "PT Creative Studio",
      location: "Bandung, Indonesia",
      type: "Contract",
      description:
        "Kami membutuhkan UI/UX Designer kreatif untuk merancang pengalaman pengguna yang menarik dan intuitif. Kandidat ideal memiliki portfolio yang kuat dan pemahaman mendalam tentang design thinking.",
      tags: ["Remote", "Contract"],
      salary: "Rp 10.000.000 – Rp 18.000.000",
      postedAt: "3 days ago",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "PT Cloud Solutions",
      location: "Yogyakarta, Indonesia",
      type: "Full Time",
      description:
        "Bergabunglah dengan tim DevOps kami untuk mengelola infrastruktur cloud dan mengoptimalkan proses deployment. Pengalaman dengan AWS, Docker, dan Kubernetes sangat diharapkan.",
      tags: ["Remote", "Senior"],
      salary: "Rp 18.000.000 – Rp 28.000.000",
      postedAt: "5 days ago",
    },
    {
      id: 5,
      title: "Full Stack Developer",
      company: "PT Digital Inovasi",
      location: "Jakarta, Indonesia",
      type: "Full Time",
      description:
        "Kami mencari Full Stack Developer yang passionate untuk mengembangkan aplikasi end-to-end. Pengalaman dengan React, Node.js, dan database management sangat dihargai.",
      tags: ["Onsite", "Senior"],
      salary: "Rp 12.000.000 – Rp 20.000.000",
      postedAt: "4 days ago",
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "PT Mobile Tech",
      location: "Surabaya, Indonesia",
      type: "Full Time",
      description:
        "Bergabunglah dengan tim mobile development kami untuk menciptakan aplikasi mobile yang inovatif. Pengalaman dengan React Native atau Flutter akan menjadi nilai tambah.",
      tags: ["Remote", "Junior"],
      salary: "Rp 9.000.000 – Rp 15.000.000",
      postedAt: "6 days ago",
    },
    {
      id: 7,
      title: "Data Scientist",
      company: "PT Analytics Pro",
      location: "Bandung, Indonesia",
      type: "Full Time",
      description:
        "Kami membutuhkan Data Scientist untuk menganalisis data besar dan memberikan insights bisnis yang valuable. Pengalaman dengan Python, R, dan machine learning sangat dibutuhkan.",
      tags: ["Remote", "Senior"],
      salary: "Rp 16.000.000 – Rp 24.000.000",
      postedAt: "1 week ago",
    },
    {
      id: 8,
      title: "Product Manager",
      company: "PT Startup Unicorn",
      location: "Jakarta, Indonesia",
      type: "Full Time",
      description:
        "Bergabunglah sebagai Product Manager untuk memimpin pengembangan produk digital yang revolusioner. Pengalaman di startup dan pemahaman teknis sangat dihargai.",
      tags: ["Onsite", "Senior"],
      salary: "Rp 20.000.000 – Rp 35.000.000",
      postedAt: "3 days ago",
    },
  ];

  // Fetch jobs from API - replace mock data
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await fetch('/api/jobs');
      // const data = await response.json();
      // setJobs(data.jobs);

      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
    } catch (err) {
      setError("Failed to fetch jobs");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = jobs.filter((job) => {
      const matchesType =
        !filters.type ||
        job.type.toLowerCase().includes(filters.type.toLowerCase());
      const matchesLocation =
        !filters.location ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesSearch =
        !filters.search ||
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());

      // Level matching berdasarkan tags
      const matchesLevel =
        !filters.level ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(filters.level.toLowerCase())
        );

      return matchesType && matchesLocation && matchesSearch && matchesLevel;
    });

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset ke halaman pertama saat filter berubah
  };

  // Handle filter changes
  const handleFilterChange = (filterType: keyof JobFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: "",
      level: "",
      location: "",
      search: "",
    });
    setFilteredJobs(jobs);
    setCurrentPage(1);
  };

  // Handle job click - Fixed routing to detail page
  const handleJobClick = (jobId: number) => {
    router.push(`/lowongan/${jobId}`);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Jika total halaman <= 5, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Jika lebih dari 5 halaman, tampilkan dengan logic
      if (currentPage <= 3) {
        // Jika di awal, tampilkan 1,2,3,4,5
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Jika di akhir, tampilkan 5 halaman terakhir
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Jika di tengah, tampilkan current-2, current-1, current, current+1, current+2
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  // Load jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50 pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchJobs}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16 md:pt-20">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-20 lg:hidden bg-white p-2 rounded-md shadow-md border border-gray-200"
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
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
          />
        </svg>
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Filter */}
      <div
        className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-20
        w-80 bg-white border-r border-gray-200 p-4 lg:p-6
        transition-transform duration-300 ease-in-out
        overflow-y-auto
      `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="border border-gray-300 rounded-lg p-4 mt-8 lg:mt-0">
          <h2 className="text-lg font-semibold mb-6">Filter</h2>

          {/* Search Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Cari Pekerjaan
            </label>
            <input
              type="text"
              placeholder="Masukkan kata kunci..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tipe Pekerjaan Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Tipe Pekerjaan
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Tipe</option>
              <option value="full time">Full Time</option>
              <option value="part time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          {/* Level Karir Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Level Karir
            </label>
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Level</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Lokasi Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Lokasi</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Lokasi</option>
              <option value="jakarta">Jakarta</option>
              <option value="surabaya">Surabaya</option>
              <option value="bandung">Bandung</option>
              <option value="yogyakarta">Yogyakarta</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          {/* Filter Buttons */}
          <div className="space-y-2">
            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Terapkan Filter
            </button>
            <button
              onClick={clearFilters}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              Reset Filter
            </button>
          </div>

          {/* Filter Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Menampilkan {indexOfFirstJob + 1}-
            {Math.min(indexOfLastJob, filteredJobs.length)} dari{" "}
            {filteredJobs.length} pekerjaan
          </div>
        </div>
      </div>

      {/* Main Content - Job Listings */}
      <div className="flex-1 p-4 lg:p-6 lg:ml-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Temukan Pekerjaan Impian Anda
          </h1>
          <p className="text-gray-600">
            {filteredJobs.length} pekerjaan tersedia
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg border border-gray-200"
                >
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Job Listings */}
            {currentJobs.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada pekerjaan ditemukan
                </h3>
                <p className="text-gray-500 mb-4">
                  Coba ubah filter atau kata kunci pencarian Anda
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 lg:space-y-6">
                  {currentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleJobClick(job.id)}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                        {/* Job Icon and Info */}
                        <div className="flex items-start space-x-4 mb-4 lg:mb-0 flex-1">
                          {/* Company Logo/Icon */}
                          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-6 h-6 lg:w-8 lg:h-8 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-4 0H3m6 0v-9a2 2 0 012-2h2a2 2 0 012 2v9"
                              />
                            </svg>
                          </div>

                          {/* Job Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {job.company}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                              {job.location}
                            </p>

                            {/* Salary and Posted Date */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-3">
                              {job.salary && (
                                <span className="text-sm font-medium text-green-600">
                                  {job.salary}
                                </span>
                              )}
                              {job.postedAt && (
                                <span className="text-sm text-gray-500">
                                  Posted {job.postedAt}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 lg:line-clamp-2">
                              {job.description}
                            </p>

                            {/* Lihat Detail Link */}
                            <button
                              className="text-blue-600 text-sm mt-3 hover:text-blue-700 font-medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobClick(job.id);
                              }}
                            >
                              Lihat Detail →
                            </button>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap lg:flex-col lg:space-y-2 gap-2 lg:gap-0 lg:ml-4 lg:items-end">
                          {job.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                tag === "Remote"
                                  ? "bg-green-100 text-green-800"
                                  : tag === "Onsite"
                                  ? "bg-orange-100 text-orange-800"
                                  : tag === "Contract"
                                  ? "bg-purple-100 text-purple-800"
                                  : tag === "Senior"
                                  ? "bg-blue-100 text-blue-800"
                                  : tag === "Junior"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            {job.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center space-x-1">
                      {/* Previous Button */}
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${
                          currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
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
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      {/* Page Numbers */}
                      {getPageNumbers().map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            currentPage === pageNumber
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      {/* Next Button */}
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md ${
                          currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
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
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Job;
