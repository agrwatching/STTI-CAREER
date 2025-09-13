"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // atau dari react-router-dom

// Interface untuk tipe data job detail
interface JobDetail {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
  salary: string;
  postedAt: string;
  companyLogo?: string;
  companyDescription?: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  workingSystem: string[];
  companyCriteria: string[];
  applicants?: number;
  views?: number;
}

const JobDetail: React.FC = () => {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;

  // Mock job detail data - akan diganti dengan API call
  const mockJobDetail: JobDetail = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "PT Perusahaan Lokal",
    location: "Surabaya, Indonesia",
    type: "Full Time",
    description:
      "Kami mencari Senior Frontend Developer berpengalaman untuk memimpin pengembangan antarmuka aplikasi web modern. Kandidat ideal memiliki kemampuan teknis yang mendalam pada framework frontend populer serta mampu memimpin tim dalam menciptakan produk yang skalabel, responsif, dan berpererforma tinggi.",
    tags: ["Remote", "Senior"],
    salary: "Rp 15.000.000 – Rp 25.000.000 per bulan",
    postedAt: "2 days ago",
    companyDescription:
      "PT Perusahaan Lokal adalah perusahaan teknologi terkemuka yang fokus pada pengembangan solusi digital inovatif.",
    requirements: [
      "Minimal 5 tahun pengalaman sebagai Frontend Developer",
      "Menguasai React, Vue, atau Angular",
      "Memahami konsep UI/UX dengan baik",
      "Pengalaman dengan RESTful API",
      "Mampu bekerja dalam tim dan memiliki komunikasi yang baik",
    ],
    responsibilities: [
      "Memimpin pengembangan antarmuka pengguna untuk aplikasi web",
      "Berkolaborasi dengan tim design dan backend",
      "Mengoptimalkan performa aplikasi",
      "Melakukan code review dan mentoring junior developer",
      "Mengimplementasikan best practices dalam pengembangan frontend",
    ],
    benefits: [
      "Gaji kompetitif sesuai pengalaman",
      "Asuransi kesehatan",
      "Bonus tahunan",
      "Flexible working hours",
      "Professional development budget",
    ],
    workingSystem: [
      "Jam kerja fleksibel",
      "Bekerja secara remote",
      "Proyek berbasis tim",
      "Agile methodology",
    ],
    companyCriteria: [
      "Berpengalaman di bidang teknologi",
      "Lingkungan kerja yang kolaboratif",
      "Mendukung perkembangan karir",
      "Budaya kerja yang sehat",
    ],
    applicants: 45,
    views: 128,
  };

  // Fetch job detail from API
  const fetchJobDetail = async (id: string | string[]) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await fetch(`/api/jobs/${id}`);
      // if (!response.ok) throw new Error('Job not found');
      // const data = await response.json();
      // setJob(data.job);

      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (id === "1") {
        setJob(mockJobDetail);
      } else {
        throw new Error("Job not found");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch job details"
      );
      console.error("Error fetching job details:", err);
    } finally {
      setLoading(false);
    }
  };

  // Check if job is bookmarked
  const checkBookmarkStatus = async (id: string | string[]) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/jobs/${id}/bookmark`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const data = await response.json();
      // setIsBookmarked(data.isBookmarked);

      // Mock check
      setIsBookmarked(false);
    } catch (err) {
      console.error("Error checking bookmark status:", err);
    }
  };

  // Handle bookmark toggle
  const handleBookmark = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/jobs/${job?.id}/bookmark`, {
      //   method: isBookmarked ? 'DELETE' : 'POST',
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // Mock API response
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  // Handle navigate to application form
  const handleApplyNow = () => {
    router.push(`/lowongan/${jobId}/lamar`);
  };

  // Handle share
  const handleShare = async () => {
    try {
      if (navigator.share && job) {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.company}`,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Job link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
      // Fallback for clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Job link copied to clipboard!");
      } catch (clipboardErr) {
        console.error("Clipboard not supported");
      }
    }
  };

  // Load job detail on component mount
  useEffect(() => {
    if (jobId) {
      fetchJobDetail(jobId);
      checkBookmarkStatus(jobId);
    }
  }, [jobId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto p-6">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error || "Job not found"}
            </h3>
            <p className="text-gray-500 mb-4">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/lowongan")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Back
        </button>

        {/* Main Job Detail Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
            <div className="flex items-start space-x-4 mb-4 lg:mb-0">
              {/* Company Logo */}
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-white"
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
                )}
              </div>

              {/* Job Title and Company Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-gray-600 mb-1 text-lg">{job.company}</p>
                <p className="text-gray-500 mb-3">{job.location}</p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>Posted {job.postedAt}</span>
                  {job.applicants && <span>{job.applicants} applicants</span>}
                  {job.views && <span>{job.views} views</span>}
                </div>
              </div>
            </div>

            {/* Job Type Badge and Tags */}
            <div className="flex flex-col space-y-2">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center">
                {job.type}
              </div>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
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
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Deskripsi Pekerjaan
            </h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
            {job.companyDescription && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  Tentang Perusahaan
                </h3>
                <p className="text-gray-700">{job.companyDescription}</p>
              </div>
            )}
          </div>

          <hr className="border-gray-200 mb-8" />

          {/* Gaji Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Gaji</h2>
            <p className="text-gray-700 text-lg font-medium">{job.salary}</p>
          </div>

          {/* Two Column Layout for Desktop, Stacked for Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Job Requirements */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Kualifikasi
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Tanggung Jawab
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Working System */}
            {job.workingSystem && job.workingSystem.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Sistem Kerja
                </h2>
                <ul className="space-y-3">
                  {job.workingSystem.map((system, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{system}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Company Criteria */}
          {job.companyCriteria && job.companyCriteria.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Kriteria Perusahaan
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.companyCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <hr className="border-gray-200 mb-8" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Simpan Button */}
            <button
              onClick={handleBookmark}
              className={`flex items-center justify-center px-6 py-3 rounded-md transition-colors font-medium ${
                isBookmarked
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg
                className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              {isBookmarked ? "Tersimpan" : "Simpan"}
            </button>

            {/* Bagikan Button */}
            <button
              onClick={handleShare}
              className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              Bagikan
            </button>

            {/* Apply Now Button - Now navigates to LamarKerja page */}
            <button
              onClick={handleApplyNow}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
