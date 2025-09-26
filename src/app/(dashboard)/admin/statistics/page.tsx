// src/app/(dashboard)/admin/statistics/page.tsx
"use client";

import React from "react";

const Statistics: React.FC = () => {
  return (
    <>
    <div className="px-6">
      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">Statistics & Analytics</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Monthly User Growth Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="mb-4">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Monthly User Growth
            </h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-emerald-400">+15%</span>
              <span className="text-emerald-400 text-sm">
                ↗ 4% vs last 2 months
              </span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-24 relative">
            <svg viewBox="0 0 200 60" className="w-full h-full">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 45 Q 20 35 40 38 Q 60 30 80 25 Q 100 20 120 22 Q 140 18 160 15 Q 180 12 200 10"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 0 45 Q 20 35 40 38 Q 60 30 80 25 Q 100 20 120 22 Q 140 18 160 15 Q 180 12 200 10 L 200 60 L 0 60 Z"
                fill="url(#gradient1)"
              />
            </svg>
          </div>
        </div>

        {/* Monthly Job Growth Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="mb-4">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Monthly Job Growth
            </h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-emerald-400">+10%</span>
              <span className="text-emerald-400 text-sm">
                ↗ 2% vs last 2 months
              </span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-24 relative">
            <svg viewBox="0 0 200 60" className="w-full h-full">
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 50 Q 25 45 50 40 Q 75 35 100 30 Q 125 35 150 32 Q 175 28 200 25"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 0 50 Q 25 45 50 40 Q 75 35 100 30 Q 125 35 150 32 Q 175 28 200 25 L 200 60 L 0 60 Z"
                fill="url(#gradient2)"
              />
            </svg>
          </div>
        </div>

        {/* Monthly Application Growth Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="mb-4">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Monthly Application Growth
            </h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-emerald-400">+20%</span>
              <span className="text-emerald-400 text-sm">
                ↗ 4% vs last 2 months
              </span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-24 relative">
            <svg viewBox="0 0 200 60" className="w-full h-full">
              <defs>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 40 Q 30 35 60 30 Q 90 25 120 28 Q 150 32 180 35 Q 190 38 200 40"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 0 40 Q 30 35 60 30 Q 90 25 120 28 Q 150 32 180 35 Q 190 38 200 40 L 200 60 L 0 60 Z"
                fill="url(#gradient3)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Statistics;
