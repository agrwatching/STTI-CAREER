import JobCard from "./JobCard";
import type { JobType } from "@/app/(dashboard)/hr/buat-lowongan/BuatLowonganContent";

interface JobListProps {
  jobs: JobType[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[calc(100vh-100px)]">
      {jobs.map((job, idx) => (
        <JobCard key={idx} job={job} />
      ))}
    </div>
  );
}
