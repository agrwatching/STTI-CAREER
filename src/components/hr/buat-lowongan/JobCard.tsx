// src/components/hr/buat-lowongan/JobCard.tsx
import { Pencil, Trash2, Wallet, MapPin } from "lucide-react";
import type { JobType } from "./types";

interface JobCardProps {
  job: JobType;
  onEdit?: (job: JobType) => void;
  onDelete?: (id: number) => void;
}

export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  // Label work type
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "Remote":
        return "WFH";
      case "On-site":
        return "WFO";
      case "Hybrid":
        return "Hybrid";
      default:
        return type;
    }
  };

  // Warna status text
  const getStatusColor = (status: string) => {
    if (status === "Tunggu Verifikasi") return "text-blue-600";
    if (status === "Terverifikasi") return "text-green-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-5">
      {/* Status + Work Type */}
      <div className="flex items-center justify-between mb-3">
        <p
          className={`text-sm font-semibold ${getStatusColor(job.statusLabel)}`}
        >
          {job.statusLabel}
        </p>
        <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
          {getTypeLabel(job.type)}
        </span>
      </div>

      {/* Content */}
      <div className="flex gap-5">
        {/* Logo perusahaan */}
        <img
          src={job.logo || "https://via.placeholder.com/80"}
          alt="Company Logo"
          className="w-20 h-20 rounded-md object-cover border"
        />

        {/* Detail */}
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-3">{job.description}</p>

          {/* Info bawah */}
          <div className="flex items-center justify-between text-sm text-gray-600 mt-auto">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <Wallet className="w-4 h-4" />
                {job.salary_range || "Negotiable"}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit?.(job)}
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => job.id && onDelete?.(job.id)}
                className="flex items-center gap-1 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
