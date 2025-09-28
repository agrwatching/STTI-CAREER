// src/components/hr/buat-lowongan/JobList.tsx
"use client";

import { useState } from "react";
import JobCard from "./JobCard";
import type { JobType } from "./types";

interface JobListProps {
  jobs?: JobType[];
  onEdit?: (job: JobType) => void;
  onDelete?: (id: number) => void;
}

// Data dummy disesuaikan untuk JobCard yang baru
const jobDescriptionTemplate =
  "Kami mencari Frontend Developer yang kreatif dan berpengalaman untuk bergabung dengan tim kami dalam mengembangkan aplikasi web yang modern, responsif, dan user-friendly. Kandidat akan bertanggung jawab untuk menerjemahkan desain UI/UX menjadi kode berkualitas tinggi menggunakan teknologi frontend terkini";

const dummyJobs: JobType[] = [
  {
    id: 1,
    job_title: "Frontend Developer",
    job_description: jobDescriptionTemplate,
    qualifications: "Minimal 2 tahun pengalaman",
    salary_min: 3000000,
    salary_max: 6000000,
    location: "Jakarta Selatan, Indonesia",
    type: "On-site",
    verification_status: "verified",
    work_type: "on_site",
    work_time: "full_time",
    logo: "/company-logos/company1.png",
    // Data hasil mapping (disederhanakan untuk dummy)
    title: "Frontend Developer",
    description: jobDescriptionTemplate,
    requirements: "Minimal 2 tahun pengalaman",
    salary_range: "3.000.000 - Rp 6.000.000",
    statusLabel: "Tunggu Verifikasi", // Sesuai gambar
  },
  {
    id: 2,
    job_title: "Frontend Developer",
    job_description: jobDescriptionTemplate,
    qualifications: "Minimal 2 tahun pengalaman",
    salary_min: 3000000,
    salary_max: 6000000,
    location: "Jakarta Selatan, Indonesia",
    type: "Remote",
    verification_status: "verified",
    work_type: "remote",
    work_time: "full_time",
    logo: "/company-logos/company2.png",
    // Data hasil mapping (disederhanakan untuk dummy)
    title: "Frontend Developer",
    description: jobDescriptionTemplate,
    requirements: "Minimal 2 tahun pengalaman",
    salary_range: "3.000.000 - Rp 6.000.000",
    statusLabel: "Terverifikasi", // Sesuai gambar
  },
  {
    id: 3,
    job_title: "Frontend Developer",
    job_description: jobDescriptionTemplate,
    qualifications: "Minimal 2 tahun pengalaman",
    salary_min: 3000000,
    salary_max: 6000000,
    location: "Jakarta Selatan, Indonesia",
    type: "Hybrid",
    verification_status: "rejected",
    work_type: "hybrid",
    work_time: "full_time",
    logo: "/company-logos/company3.png",
    // Data hasil mapping (disederhanakan untuk dummy)
    title: "Frontend Developer",
    description: jobDescriptionTemplate,
    requirements: "Minimal 2 tahun pengalaman",
    salary_range: "3.000.000 - Rp 6.000.000",
    statusLabel: "Tidak Terverifikasi", // Sesuai gambar, perbaikan typo
  },
];

export default function JobList({
  jobs: externalJobs,
  onEdit,
  onDelete,
}: JobListProps) {
  const [internalJobs, setInternalJobs] = useState<JobType[]>(dummyJobs);

  // Gunakan external jobs jika disediakan, jika tidak, gunakan internal dummy jobs
  const jobs = externalJobs || internalJobs;

  const handleEdit = (job: JobType) => {
    onEdit?.(job);
  };

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    } else {
      // Default delete behavior jika onDelete tidak disediakan
      if (confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
        setInternalJobs(internalJobs.filter((job) => job.id !== id));
      }
    }
  };

  if (!jobs.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Belum ada lowongan tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}