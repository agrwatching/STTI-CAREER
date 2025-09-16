// src/app/(dashboard)/hr/buat-lowongan/page.tsx
"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/hr/buat-lowongan/Header";
import JobList from "@/components/hr/buat-lowongan/JobList";
import JobForm from "@/components/hr/buat-lowongan/JobForm";

export interface JobType {
  status: string;
  statusColor: string;
  icon: ReactNode;
  title: string;
  desc: string;
  salary: string;
  location: string;
  logo: string;
  type: string;
}

export default function BuatLowonganPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<JobType[]>([
    {
      status: "Tunggu Verifikasi",
      statusColor: "text-blue-600",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: "Frontend Developer",
      desc: "Kami mencari Frontend Developer...",
      salary: "Rp. 3.000.000 - Rp. 6.000.000",
      location: "Jakarta Selatan, Indonesia",
      logo: "https://i.pravatar.cc/150?img=5",
      type: "Remote",
    },
    {
      status: "Terverifikasi",
      statusColor: "text-green-600",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      title: "Backend Developer",
      desc: "Mencari Backend Developer...",
      salary: "Rp. 5.000.000 - Rp. 9.000.000",
      location: "Bandung, Indonesia",
      logo: "https://i.pravatar.cc/150?img=15",
      type: "Hybrid",
    },
    {
      status: "Ditolak",
      statusColor: "text-red-600",
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      title: "UI/UX Designer",
      desc: "Butuh UI/UX Designer berpengalaman...",
      salary: "Rp. 4.000.000 - Rp. 7.000.000",
      location: "Surabaya, Indonesia",
      logo: "https://i.pravatar.cc/150?img=25",
      type: "On-site",
    },
    {
      status: "Terverifikasi",
      statusColor: "text-green-600",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      title: "Mobile Developer",
      desc: "Dicari Android/iOS Developer...",
      salary: "Rp. 6.000.000 - Rp. 10.000.000",
      location: "Yogyakarta, Indonesia",
      logo: "https://i.pravatar.cc/150?img=35",
      type: "Remote",
    },
    {
      status: "Tunggu Verifikasi",
      statusColor: "text-blue-600",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: "Data Analyst",
      desc: "Kami mencari Data Analyst untuk analisis data...",
      salary: "Rp. 5.000.000 - Rp. 8.000.000",
      location: "Semarang, Indonesia",
      logo: "https://i.pravatar.cc/150?img=45",
      type: "Hybrid",
    },
  ]);

  // cek query param
  useEffect(() => {
    if (searchParams.get("mode") === "form") {
      setShowForm(true);
    }
  }, [searchParams]);

  const handleAddJob = (job: Omit<JobType, "status" | "statusColor" | "icon" | "logo">) => {
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
