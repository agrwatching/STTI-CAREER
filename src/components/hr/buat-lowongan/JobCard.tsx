import { Pencil, Trash2, Wallet, MapPin } from "lucide-react";
import Image from "next/image";
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

  // Warna status berdasarkan teks dari gambar
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Terverifikasi":
        return {
          color: "text-green-600",
          borderColor: "border-green-400",
        };
      case "Tunggu Verifikasi":
        return {
          color: "text-blue-600",
          borderColor: "border-blue-400",
        };
      case "Tidak Terverifikasi":
      case "Ditolak":
        return {
          color: "text-red-600",
          borderColor: "border-red-400",
        };
      default:
        return {
          color: "text-gray-600",
          borderColor: "border-gray-400",
        };
    }
  };

  const statusConfig = getStatusConfig(job.statusLabel);
  const workTypeLabel = getTypeLabel(job.type);

  return (
    // Border samping kiri dihilangkan, hanya border luar
    <div
      className={`border-l-4 rounded-xl p-5 mb-4 shadow-md bg-white border-t border-r border-b ${statusConfig.borderColor}`}
    >
      
      {/* Container utama untuk Logo, Detail, dan Badge WFH/WFO */}
      <div className="flex justify-between items-start mb-3">
        {/* Konten Kiri: Logo dan Detail */}
        <div className="flex gap-4 flex-1">
            {/* Logo perusahaan (menggunakan logo dummy PT sesuai gambar) */}
            <div className="flex-shrink-0 w-16 h-16 relative">
                <div className="w-full h-full bg-red-600 flex items-center justify-center rounded-md border border-gray-300 overflow-hidden">
                <span className="text-4xl font-black text-yellow-300 [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">
                    PT
                </span>
                </div>
            </div>

            {/* Detail lowongan */}
            <div className="flex-1 min-w-0">
                {/* Status Label (di atas Judul) */}
                <h3 className={`text-sm font-semibold mb-1 ${statusConfig.color}`}>
                    {job.statusLabel}
                </h3>
                
                {/* Judul lowongan */}
                <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">{job.title}</h2>

                {/* Deskripsi */}
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                    {job.description}
                </p>

                {/* Informasi gaji dan lokasi (Tanpa Ikon) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                    {/* Gaji */}
                    <span className="flex items-center gap-1.5 font-medium">
                        {/* Hapus ikon Wallet */}
                        Rp. {job.salary_range}
                    </span>
                    {/* Lokasi */}
                    <span className="flex items-center gap-1.5 font-medium">
                        {/* Hapus ikon MapPin */}
                        {job.location}
                    </span>
                </div>
            </div>
        </div>

        {/* Konten Kanan Atas: Work Type Badge */}
        <div className="flex-shrink-0">
            <span
                // Warna badge WFH/WFO selalu hijau sesuai gambar terbaru
                className={`bg-green-500 text-white text-xs font-bold px-3 py-0.5 rounded-full uppercase ml-4`}
            >
                {workTypeLabel}
            </span>
        </div>
      </div>
      
      {/* Action buttons (Di bawah, rata kanan) */}
      <div className="flex justify-end gap-2 mt-4">
        {/* Tombol Edit */}
        <button
          onClick={() => onEdit?.(job)}
          className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          {/* Hapus ikon Pencil */}
          Edit
        </button>
        {/* Tombol Delete */}
        <button
          onClick={() => job.id && onDelete?.(job.id)}
          className="flex items-center bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
        >
          {/* Hapus ikon Trash2 */}
          Delete
        </button>
      </div>
    </div>
  );
}