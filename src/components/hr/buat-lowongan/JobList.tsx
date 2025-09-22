"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { JobType } from "./types";

interface JobListProps {
  jobs: JobType[];
  onEdit: (job: JobType) => void;
  onDelete: (id: number) => void;
}

export default function JobList({ jobs, onEdit, onDelete }: JobListProps) {
  if (!jobs.length) {
    return <p className="text-gray-500">Belum ada lowongan tersedia.</p>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
          <div>
            <h3 className="font-bold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.location} • {job.type}</p>
            <p className="text-sm">{job.salary_range}</p>
            <div className="flex items-center gap-2 mt-1">
              {job.icon}
              <span className={`${job.statusColor} text-sm`}>{job.statusLabel}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => job.id && onEdit(job)}
              className="p-2 rounded bg-yellow-400 text-white hover:bg-yellow-500"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => job.id && onDelete(job.id)}
              className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
