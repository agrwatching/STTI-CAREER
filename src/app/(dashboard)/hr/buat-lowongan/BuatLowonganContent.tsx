"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/hr/buat-lowongan/Header";
import JobList from "@/components/hr/buat-lowongan/JobList";
import JobForm from "@/components/hr/buat-lowongan/JobForm";

export interface JobType {
  id?: number;
  title: string;
  description: string;
  requirements: string;
  salary_range: string;
  location: string;
  type: string;
  logo: string;
  status?: string;
  statusColor?: string;
  icon?: React.ReactNode;
}

// Interface untuk data yang datang dari API
interface JobApiResponse {
  id: number;
  job_title: string;
  job_description: string;
  qualifications?: string;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  type?: string;
  verification_status: "pending" | "approved" | "rejected";
}

export default function BuatLowonganContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<JobType[]>([]);

  // Ambil data dari backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Gagal mengambil data lowongan");

        const data = await res.json();

        // pastikan data.data berupa array
        const mappedJobs: JobType[] = (
          Array.isArray(data.data) ? data.data : [data.data]
        ).map((job: JobApiResponse) => ({
          id: job.id,
          title: job.job_title,
          description: job.job_description,
          requirements: job.qualifications || "-",
          salary_range:
            job.salary_min && job.salary_max
              ? `Rp ${job.salary_min} - Rp ${job.salary_max}`
              : "Negotiable",
          location: job.location || "-",
          type: job.type || "Hybrid",
          logo: "/logo-stti.png", // default logo

          // tambahan UI status
          status:
            job.verification_status === "pending"
              ? "Tunggu Verifikasi"
              : job.verification_status === "approved"
              ? "Terverifikasi"
              : "Ditolak",
          statusColor:
            job.verification_status === "pending"
              ? "text-blue-600"
              : job.verification_status === "approved"
              ? "text-green-600"
              : "text-red-600",
          icon:
            job.verification_status === "pending" ? (
              <Clock className="w-5 h-5 text-blue-600" />
            ) : job.verification_status === "approved" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            ),
        }));

        setJobs(mappedJobs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, [router]);

  // Kalau URL ada ?mode=form → buka form
  useEffect(() => {
    if (searchParams.get("mode") === "form") {
      setShowForm(true);
    }
  }, [searchParams]);

  // Tambah job baru (frontend-side)
  const handleAddJob = (
    job: Omit<JobType, "status" | "statusColor" | "icon" | "logo">
  ) => {
    setJobs([
      ...jobs,
      {
        ...job,
        status: "Tunggu Verifikasi",
        statusColor: "text-blue-600",
        icon: <Clock className="w-5 h-5 text-blue-600" />,
        logo: "https://i.pravatar.cc/150?img=30",
      },
    ]);
    setShowForm(false);
    router.push("/hr/buat-lowongan");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col bg-gray-50 p-8">
        <Header onAddClick={() => setShowForm(true)} />
        {showForm ? (
          <JobForm
            onCancel={() => {
              setShowForm(false);
              router.push("/hr/buat-lowongan");
            }}
            onSubmit={handleAddJob}
          />
        ) : (
          <JobList jobs={jobs} />
        )}
      </div>
    </div>
  );
}
