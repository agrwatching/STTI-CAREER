"use client";

import { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Definisi tipe data Job sesuai API backend
interface Job {
  id: number;
  job_title: string;
  company_id: number;
  job_description: string;
  salary_min?: number | null;
  salary_max?: number | null;
  location?: string | null;
}

export default function Job() {
  // State management
  const [jobs, setJobs] = useState<Job[]>([]); // menyimpan data lowongan pekerjaan
  const [page, setPage] = useState(1); // pagination halaman aktif
  const [itemsPerPage] = useState(6); // jumlah item per halaman

  // Fetch data dari API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          setJobs(json.data); // simpan data ke state
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const currentJobs = jobs.slice(startIdx, startIdx + itemsPerPage);

  // Logic untuk menentukan nomor halaman yang ditampilkan
  const windowSize = 3;
  let startPage = Math.max(1, page - 1);
  let endPage = startPage + windowSize - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - windowSize + 1);
  }
  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  // Rendering (UI)
  return (
    <section className="min-h-screen px-8 py-12 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold">Find Your Next Opportunity</h1>
      </div>

      {/* Search bar */}
      <div className="flex justify-center gap-2 mb-12">
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md w-1/3">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Job, Title, Keyword or Company"
            className="w-full focus:outline-none"
          />
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md w-1/4">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="City, Province, or Region"
            className="w-full focus:outline-none"
          />
        </div>
        <button className="bg-blue-600 text-white px-6 rounded-lg shadow hover:bg-blue-700">
          Find Job
        </button>
      </div>

      {/* Featured Job Listings */}
      <h2 className="text-xl font-semibold mb-6">Featured Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              {/* API tidak ada logo → pakai dummy logo */}
              <Image
                src="https://dummyimage.com/60x60/2563eb/ffffff&text=C"
                alt="company logo"
                width={60}
                height={60}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{job.job_title}</h3>
                <p className="text-gray-600 text-sm">
                  Company #{job.company_id}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm mb-4 line-clamp-3">
              {job.job_description}
            </p>

            {/* Tags (masih statis, API belum ada) */}
            <div className="flex gap-2 flex-wrap mb-2 ml-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Fulltime
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Remote
              </span>
            </div>

            {/* Salary */}
            <div>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                {job.salary_min != null && job.salary_max != null
                  ? `Rp ${job.salary_min.toLocaleString()} - Rp ${job.salary_max.toLocaleString()}`
                  : "Salary not specified"}
              </span>
            </div>

            {/* Footer: lokasi + button */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-gray-600 text-sm">
                {job.location || "Indonesia"}
              </p>
              <Link
                href={`/lowongan/${job.id}`}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 rounded hover:bg-gray-200"
          disabled={page === 1}
        >
          &lt;
        </button>

        {visiblePages.map((num) => (
          <button
            key={num}
            className={`px-3 py-1 rounded ${
              page === num ? "bg-blue-600 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 rounded hover:bg-gray-200"
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
