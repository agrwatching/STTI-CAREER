// src/components/hr/buat-lowongan/JobCard.tsx
import { Pencil, Trash2, Wallet, MapPin } from "lucide-react";
import type { JobType } from "./types";

interface JobCardProps {
  job: JobType;
}

export default function JobCard({ job }: JobCardProps) {
  const getTypeStyle = (type: string) => {
    switch (type) {
      case "Remote":
        return "bg-green-500 text-white";
      case "On-site":
        return "bg-orange-500 text-white";
      case "Hybrid":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex gap-4">
      {/* Logo */}
      <img
        src={job.logo || "https://via.placeholder.com/150"}
        alt="Company Logo"
        className="w-14 h-14 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Status & Work Type */}
        <div className="flex items-center justify-between mb-1">
          {job.status && (
            <p
              className={`text-sm font-semibold flex items-center gap-1 ${job.statusColor}`}
            >
              {job.icon}
              {job.status}
            </p>
          )}

          <span
            className={`w-20 py-0.5 rounded-full text-xs font-semibold text-center ${getTypeStyle(
              job.type
            )}`}
          >
            {job.type}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>
        <p className="text-gray-600 text-sm mb-3">{job.description}</p>

        {/* Info + Actions */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
          <span className="flex items-center gap-1">
            <Wallet className="w-4 h-4" />
            {job.salary_range}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location}
          </span>

          <div className="flex gap-2 ml-auto">
            <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
