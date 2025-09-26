// src/components/lowongan/JobDetail.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const router = useRouter();
  const params = useParams<{ id: string }>();
  const jobId = params?.id;

 // Fetch job detail (API)
const fetchJobDetail = useCallback(async (id: string) => {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch job (status ${res.status})`);
    }

    const json = await res.json();

    if (json.success && json.data) {
      // mapping data API → struktur JobDetail
      const apiJob = json.data;

      const mappedJob: JobDetail = {
        id: apiJob.id,
        title: apiJob.job_title,
        company: `Company #${apiJob.company_id}`,
        location: apiJob.location,
        type: "Full Time", // sementara hardcode, karena API belum ada field type
        description: apiJob.job_description,
        tags: ["Remote"], // sementara statis, nanti bisa parsing dari location atau field baru
        salary:
          apiJob.salary_min && apiJob.salary_max
            ? `Rp ${apiJob.salary_min.toLocaleString()} – Rp ${apiJob.salary_max.toLocaleString()}`
            : "Salary not specified",
        postedAt: apiJob.created_at,
        companyLogo: undefined, // kalau backend nanti kasih logo, bisa dipakai
        companyDescription: undefined, // belum ada di API
        requirements: [], // kalau belum ada field, kosongkan
        responsibilities: [],
        benefits: [],
        workingSystem: [],
        companyCriteria: [],
        applicants: 0,
        views: 0,
      };

      setJob(mappedJob);
    } else {
      throw new Error("Job not found");
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to fetch job details");
  } finally {
    setLoading(false);
  }
}, []);


  // Check if job is bookmarked (dummy)
  const checkBookmarkStatus = useCallback(async () => {
    setIsBookmarked(false);
  }, []);

  // Toggle bookmark
  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  // Apply Now
  const handleApplyNow = () => {
    if (jobId) {
      router.push(`/lowongan/${jobId}/lamar`);
    }
  };

  // Share
  const handleShare = async () => {
    if (!job) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.company}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Job link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Job link copied to clipboard!");
      } catch {
        console.error("Clipboard not supported");
      }
    }
  };

  // Load job detail
  useEffect(() => {
    if (jobId) {
      fetchJobDetail(jobId);
      checkBookmarkStatus();
    }
  }, [jobId, fetchJobDetail, checkBookmarkStatus]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {error || "Job not found"}
          </h3>
          <p className="text-gray-500 mb-4">
            The job you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <button
            onClick={() => router.push("/lowongan")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Jobs
          </button>
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
          ← Back
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-lg border p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row justify-between mb-8">
            {/* Logo & Title */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 relative">
                {job.companyLogo ? (
                  <Image
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {job.company.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {job.title}
                </h1>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
              </div>
            </div>

            {/* Job Type & Tags */}
            <div className="mt-4 lg:mt-0 flex flex-col gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm text-center">
                {job.type}
              </span>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Deskripsi Pekerjaan</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          {/* Salary */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Gaji</h2>
            <p className="text-gray-700">{job.salary}</p>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Kualifikasi</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleBookmark}
              className={`px-4 py-2 rounded-md ${
                isBookmarked
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isBookmarked ? "Tersimpan" : "Simpan"}
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Bagikan
            </button>
            <button
              onClick={handleApplyNow}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
