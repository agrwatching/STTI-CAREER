"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/hr/buat-lowongan/Header";
import JobList from "@/components/hr/buat-lowongan/JobList";
import JobForm from "@/components/hr/buat-lowongan/JobForm";

export default function BuatLowonganPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([
    {
      status: "Tunggu Verifikasi",
      statusColor: "text-blue-600",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: "Frontend Developer",
      desc: "Kami mencari Frontend Developer...",
      salary: "Rp. 3.000.000 - Rp. 6.000.000",
      location: "Jakarta Selatan, Indonesia",
      logo: "https://i.pravatar.cc/150?img=5",
      type: "WFH",
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
  ]);

  // cek query param
  useEffect(() => {
    if (searchParams.get("mode") === "form") {
      setShowForm(true);
    }
  }, [searchParams]);

  const handleAddJob = (job: any) => {
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
    router.push("/hr/buat-lowongan"); // balik ke list
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col bg-gray-50 p-8">
        <Header onAddClick={() => setShowForm(true)} />

        {showForm ? (
          <JobForm onCancel={() => {
            setShowForm(false);
            router.push("/hr/buat-lowongan");
          }} onSubmit={handleAddJob} />
        ) : (
          <JobList jobs={jobs} />
        )}
      </div>
    </div>
  );
}
