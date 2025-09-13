"use client";
import { h1 } from "framer-motion/client";
import { useState } from "react";

interface Job {
  posisi: string;
  tanggal: string;
  status: "AKTIF" | "DITUTUP" | "MENUNGGU";
}

interface LowonganSayaTableProps {
  jobs: Job[];
}

export default function LowonganSayaTable({ jobs }: LowonganSayaTableProps) {
  const getStatusStyle = (status: string) => {
    const baseStyle = "inline-flex items-center justify-center min-w-[100px] px-3 py-1 rounded-full text-xs font-semibold text-center";

    switch (status) {
      case "AKTIF":
        return `${baseStyle} bg-green-500 text-white`;
      case "DITUTUP":
        return `${baseStyle} bg-red-500 text-white`;
      case "MENUNGGU":
        return `${baseStyle} bg-yellow-500 text-white`;
      default:
        return `${baseStyle} bg-gray-300 text-black`;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lowongan Saya</h1>

      <div className="bg-white rounded-lg shadow-md p-4 ">
        {/* Scrollable table */}
        <div className="overflow-x-auto ">
          <div className="max-h-96 overflow-y-auto border rounded">
            <table className="w-full border-separate min-w-[600px]">
              <thead className="sticky top-0 z-10 bg-gray-300 ">
                <tr>
                  <th className="p-3 border text-left ">Posisi</th>
                  <th className="p-3 border text-left">Tanggal Posting</th>
                  <th className="p-3 border text-center">Status</th>
                  <th className="p-3 border text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{job.posisi}</td>
                    <td className="p-3">{job.tanggal}</td>
                    <td className="p-3 text-center">
                      <span className={getStatusStyle(job.status)}>{job.status}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="text-blue-600 cursor-pointer hover:underline">Lihat</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
