import { Pencil, Trash2 } from "lucide-react";
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

  // Status configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Terverifikasi":
        return {
          color: "text-green-600",
          borderColor: "border-green-400",
          bgColor: "bg-green-50"
        };
      case "Tunggu Verifikasi":
        return {
          color: "text-blue-600",
          borderColor: "border-blue-400",
          bgColor: "bg-blue-50"
        };
      case "Tidak Terverifikasi":
      case "Ditolak":
        return {
          color: "text-red-600",
          borderColor: "border-red-400",
          bgColor: "bg-red-50"
        };
      default:
        return {
          color: "text-gray-600",
          borderColor: "border-gray-400",
          bgColor: "bg-gray-50"
        };
    }
  };

  const statusConfig = getStatusConfig(job.statusLabel);
  const workTypeLabel = getTypeLabel(job.type);

  return (
    <div className={`border-l-4 rounded-lg p-5 mb-4 shadow-sm bg-white ${statusConfig.borderColor} border border-gray-200`}>
      {/* Top section with status and work type badge */}
      <div className="flex justify-between items-start mb-3">
        {/* Left content: Logo and details */}
        <div className="flex gap-4 flex-1">
          {/* Company logo */}
          <div className="flex-shrink-0 w-16 h-16 relative">
            <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center border border-gray-300 overflow-hidden">
              <span className="text-2xl font-black text-yellow-300 drop-shadow-sm">
                PT
              </span>
            </div>
          </div>

          {/* Job details */}
          <div className="flex-1 min-w-0">
            {/* Status label */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-sm font-semibold ${statusConfig.color}`}>
                {job.statusLabel}
              </span>
            </div>
            
            {/* Job title */}
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
              {job.title}
            </h2>

            {/* Job description */}
            <p className="text-gray-700 text-sm mb-3 leading-relaxed line-clamp-3">
              {job.description}
            </p>

            {/* Salary and location info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
              {/* Salary */}
              <div className="flex items-center gap-1">
                <span className="font-medium">
                  {job.salary_range}
                </span>
              </div>
              {/* Location */}
              <div className="flex items-center gap-1">
                <span className="font-medium">
                  📍 {job.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Work type badge */}
        <div className="flex-shrink-0 ml-4">
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {workTypeLabel}
          </span>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit?.(job)}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => job.id && onDelete?.(job.id)}
          className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}