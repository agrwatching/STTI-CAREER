import { Pencil, Trash2, Wallet, MapPin } from "lucide-react";

interface Job {
  status: string;
  statusColor: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  salary: string;
  location: string;
  logo: string;
  type: string;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex gap-4">
      {/* Logo */}
      <img
        src={job.logo}
        alt="Company Logo"
        className="w-14 h-14 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <p
          className={`text-sm font-semibold mb-1 flex items-center gap-1 ${job.statusColor}`}
        >
          {job.icon}
          {job.status}
        </p>

        <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>

        <p className="text-gray-600 text-sm mb-3">{job.desc}</p>

        {/* Info + Actions */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
          <span className="flex items-center gap-1">
            <Wallet className="w-4 h-4" />
            {job.salary}
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
