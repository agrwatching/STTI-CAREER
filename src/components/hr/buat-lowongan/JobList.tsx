// src/components/hr/buat-lowongan/JobList.tsx
import JobCard from "./JobCard";
import type { JobType } from "./types";

interface JobListProps {
  jobs: JobType[];
}

export default function JobList({ jobs }: JobListProps) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Belum ada lowongan yang tersedia.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id ?? job.title} job={job} />
      ))}
    </div>
  );
}
