"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/hr/buat-lowongan/Header";
import JobList from "@/components/hr/buat-lowongan/JobList";
import JobForm from "@/components/hr/buat-lowongan/JobForm";
import type { JobApiResponse, JobType, JobFormValues } from "@/components/hr/buat-lowongan/types";

export default function BuatLowonganContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [editJob, setEditJob] = useState<JobType | null>(null);

  // Ambil data dari backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil data lowongan");

        const data = await res.json();

        const mappedJobs: JobType[] = (
          Array.isArray(data.data) ? data.data : [data.data]
        ).map((job: JobApiResponse) => {
          let statusLabel = "";
          let statusColor = "";
          let icon: React.ReactNode = null;

          switch (job.verification_status) {
            case "pending":
              statusLabel = "Tunggu Verifikasi";
              statusColor = "text-blue-600";
              icon = <Clock className="w-5 h-5 text-blue-600" />;
              break;
            case "approved":
              statusLabel = "Terverifikasi";
              statusColor = "text-green-600";
              icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
              break;
            case "rejected":
              statusLabel = "Ditolak";
              statusColor = "text-red-600";
              icon = <XCircle className="w-5 h-5 text-red-600" />;
              break;
          }

          return {
            ...job,
            title: job.job_title,
            description: job.job_description,
            requirements: job.qualifications || "-",
            salary_range:
              job.salary_min && job.salary_max
                ? `Rp ${job.salary_min} - Rp ${job.salary_max}`
                : "Negotiable",
            logo: job.logo || "/logo-stti.png",
            statusLabel,
            statusColor,
            icon,
          };
        });

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

  // Tambah job
  const handleAddJob = async (job: JobFormValues) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Job ditambahkan:", data);
        router.refresh();
        setShowForm(false);
        setEditJob(null);
        router.push("/hr/buat-lowongan");
      } else {
        console.error("Gagal tambah job:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit job
  const handleEditJob = async (job: JobFormValues, id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Job diupdate:", data);
        router.refresh();
        setShowForm(false);
        setEditJob(null);
      } else {
        console.error("Gagal update job:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Hapus job
  const handleDeleteJob = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        console.log("Job dihapus");
        setJobs((prev) => prev.filter((job) => job.id !== id));
      } else {
        const data = await res.json();
        console.error("Gagal hapus job:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col bg-gray-50 p-8">
        <Header onAddClick={() => setShowForm(true)} />
        {showForm ? (
          <JobForm
            initialValues={editJob || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditJob(null);
              router.push("/hr/buat-lowongan");
            }}
            onSubmit={(values) =>
              editJob ? handleEditJob(values, editJob.id) : handleAddJob(values)
            }
          />
        ) : (
          <JobList
            jobs={jobs}
            onEdit={(job) => {
              setEditJob(job);
              setShowForm(true);
            }}
            onDelete={handleDeleteJob}
          />
        )}
      </div>
    </div>
  );
}
