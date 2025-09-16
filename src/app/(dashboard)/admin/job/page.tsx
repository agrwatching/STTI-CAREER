"use client";

import React, { useState } from "react";

interface JobPost {
  id: number;
  title: string;
  company: string;
  postedDate: string;
  status: "Pending" | "Verified" | "Rejected";
}

const JobPostsVerification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Pending" | "Verified" | "Rejected"
  >("Pending");

  // Sample data - dalam implementasi nyata, ini akan datang dari API
  const [jobPosts, setJobPosts] = useState<JobPost[]>([
    {
      id: 1,
      title: "Software Engineer",
      company: "PT Pelayanan Code",
      postedDate: "2025-06-17",
      status: "Pending",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "PT Tech Solution",
      postedDate: "2025-06-16",
      status: "Pending",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "PT Digital Innovation",
      postedDate: "2025-06-15",
      status: "Verified",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "PT Creative Studio",
      postedDate: "2025-06-14",
      status: "Rejected",
    },
  ]);

  const filteredJobs = jobPosts.filter((job) => job.status === activeTab);

  const handleAction = (id: number, action: "verify" | "reject") => {
    setJobPosts((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id
          ? { ...job, status: action === "verify" ? "Verified" : "Rejected" }
          : job
      )
    );
    console.log(`${action} job with id: ${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header Section */}
      <div className="bg-slate-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">
            Job Posts Verification
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-white font-medium text-sm">Admin</div>
              <div className="text-slate-400 text-xs">
                AdminCareer@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-slate-800 px-6">
        <div className="flex gap-0 border-b border-slate-700">
          {(["Pending", "Verified", "Rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? "text-orange-400 bg-slate-700"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-750"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="p-6">
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-slate-700 px-6 py-3">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                Job Title
              </div>
              <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                Company
              </div>
              <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                Posted Date
              </div>
              <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                Status
              </div>
              <div className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-700">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="px-6 py-4 hover:bg-slate-750 transition-colors"
              >
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="text-white text-sm font-medium">
                    {job.title}
                  </div>
                  <div className="text-slate-300 text-sm">{job.company}</div>
                  <div className="text-slate-300 text-sm">{job.postedDate}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : job.status === "Verified"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {job.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAction(job.id, "verify")}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors font-medium"
                        >
                          Verified
                        </button>
                        <button
                          onClick={() => handleAction(job.id, "reject")}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors font-medium"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {job.status === "Verified" && (
                      <span className="text-green-400 text-xs font-medium">
                        Verified
                      </span>
                    )}
                    {job.status === "Rejected" && (
                      <span className="text-red-400 text-xs font-medium">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No {activeTab.toLowerCase()} job posts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostsVerification;
