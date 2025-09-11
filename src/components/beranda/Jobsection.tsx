"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function Job() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Dummy data manual (bisa kamu tambahin sesuka hati)
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "PakulagaCode",
      description: "Build scalable frontend apps using React, Next.js, and Tailwind CSS.",
      location: "Karawang, Indonesia",
      type: "Full-time",
      level: "Senior",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "TechnoWorks",
      description: "Design and implement backend services with Node.js, Express, and PostgreSQL.",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      level: "Mid-level",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignHub",
      description: "Create wireframes, prototypes, and design user-centric mobile & web apps.",
      location: "Bandung, Indonesia",
      type: "Contract",
      level: "Junior",
    },
    {
      id: 4,
      title: "Mobile App Developer",
      company: "Appify",
      description: "Develop cross-platform mobile applications using Flutter and React Native.",
      location: "Surabaya, Indonesia",
      type: "Full-time",
      level: "Mid-level",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "InsightAI",
      description: "Analyze datasets and build machine learning models for predictive analytics.",
      location: "Remote",
      type: "Remote",
      level: "Senior",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudOps",
      description: "Maintain CI/CD pipelines and cloud infrastructure (AWS, Docker, Kubernetes).",
      location: "Yogyakarta, Indonesia",
      type: "Full-time",
      level: "Mid-level",
    },
    {
      id: 7,
      title: "Product Manager",
      company: "NextVision",
      description: "Lead product development cycles and manage cross-functional teams effectively.",
      location: "Bali, Indonesia",
      type: "Full-time",
      level: "Senior",
    },
    {
      id: 8,
      title: "QA Engineer",
      company: "Testify",
      description: "Write automated tests and ensure software quality before production releases.",
      location: "Semarang, Indonesia",
      type: "Full-time",
      level: "Junior",
    },
    {
      id: 9,
      title: "Cybersecurity Analyst",
      company: "SafeNet",
      description: "Monitor, detect, and respond to security incidents in real-time.",
      location: "Jakarta, Indonesia",
      type: "Contract",
      level: "Mid-level",
    },
    {
      id: 10,
      title: "Marketing Specialist",
      company: "MarketPro",
      description: "Plan and execute digital marketing strategies to increase brand awareness.",
      location: "Bandung, Indonesia",
      type: "Full-time",
      level: "Junior",
    },
  ];

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const currentJobs = jobs.slice(startIdx, startIdx + itemsPerPage);

  // --- Pagination Window Logic ---
  const windowSize = 3; // tampil maksimal 3 angka
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
          <input type="text" placeholder="Job, Title, Keyword or Company" className="w-full focus:outline-none" />
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md w-1/4">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <input type="text" placeholder="City, Province, or Region" className="w-full focus:outline-none" />
        </div>
        <button className="bg-blue-600 text-white px-6 rounded-lg shadow hover:bg-blue-700">Find Job</button>
      </div>

      {/* Featured Job Listings */}
      <h2 className="text-xl font-semibold mb-6">Featured Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{job.company}</p>
            <p className="text-gray-500 text-sm line-clamp-3 mb-4">{job.description}</p>
            <div className="flex gap-2 flex-wrap mb-4">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{job.type}</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{job.level}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{job.location}</span>
            </div>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">Apply Now</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="px-3 py-1 rounded hover:bg-gray-200" disabled={page === 1}>
          &lt;
        </button>

        {visiblePages.map((num) => (
          <button key={num} className={`px-3 py-1 rounded ${page === num ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`} onClick={() => setPage(num)}>
            {num}
          </button>
        ))}

        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} className="px-3 py-1 rounded hover:bg-gray-200" disabled={page === totalPages}>
          &gt;
        </button>
      </div>
    </section>
  );
}
