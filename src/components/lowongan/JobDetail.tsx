// src/components/lowongan/JobDetail.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // App Router
import { useParams as useAppParams } from "next/navigation"; // App Router
import { useRouter as usePageRouter } from "next/router"; // Pages Router (fallback)
import Image from "next/image";

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
  const appParams = (() => {
    try {
      return useAppParams<{ id: string }>(); // kalau App Router
    } catch {
      return null;
    }
  })();

  const pageRouter = (() => {
    try {
      return usePageRouter(); // kalau Pages Router
    } catch {
      return null;
    }
  })();

  const router = useRouter(); // ini tetap bisa dipakai untuk navigate
  const jobId = appParams?.id || (pageRouter?.query?.id as string) || "";

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const mockJobDetail: JobDetail = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "PT Perusahaan Lokal",
    location: "Surabaya, Indonesia",
    type: "Full Time",
    description:
      "Kami mencari Senior Frontend Developer berpengalaman untuk memimpin pengembangan antarmuka aplikasi web modern.",
    tags: ["Remote", "Senior"],
    salary: "Rp 15.000.000 – Rp 25.000.000 per bulan",
    postedAt: "2 days ago",
    requirements: ["React", "Next.js", "5+ tahun pengalaman"],
    responsibilities: ["Membangun UI", "Kolaborasi dengan tim backend"],
    benefits: ["Asuransi", "Bonus tahunan"],
    workingSystem: ["Remote", "Flexible hours"],
    companyCriteria: ["Budaya kerja sehat"],
    applicants: 45,
    views: 128,
  };

  const fetchJobDetail = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 500)); // delay dummy

      if (id === "1") {
        setJob(mockJobDetail);
      } else {
        throw new Error("Job not found");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch job details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = () => setIsBookmarked(!isBookmarked);
  const handleApplyNow = () => router.push(`/lowongan/${jobId}/lamar`);
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
    } catch {
      console.error("Share failed");
    }
  };

  useEffect(() => {
    if (jobId) fetchJobDetail(jobId);
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {error || "Job not found"}
          </h3>
          <button
            onClick={() => router.push("/lowongan")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 mb-6"
      >
        ← Back
      </button>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-start gap-4 mb-6">
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
              <div className="w-16 h-16 bg-blue-600 flex items-center justify-center text-white font-bold rounded-lg">
                {job.company.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
          </div>
        </div>

        <h2 className="font-semibold mb-2">Deskripsi</h2>
        <p className="mb-6">{job.description}</p>

        <h2 className="font-semibold mb-2">Gaji</h2>
        <p className="mb-6">{job.salary}</p>

        <h2 className="font-semibold mb-2">Kualifikasi</h2>
        <ul className="list-disc pl-6 mb-6">
          {job.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>

        <div className="flex gap-4">
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 rounded-md ${
              isBookmarked
                ? "bg-blue-100 text-blue-700"
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
  );
};

export default JobDetail;
