"use client";

import React, { useState } from "react";

const ApplicantTable: React.FC = () => {
  const [search, setSearch] = useState("");

  const applicants = [
    {
      id: 1,
      name: "Subur",
      email: "suburabadi@gmail.com",
      role: "Applicant",
      status: "Active",
    },
    {
      id: 2,
      name: "Agra ganesha",
      email: "agratetapabadi@gmail.com",
      role: "Applicant",
      status: "Active",
    },
    {
      id: 3,
      name: "Sumitro",
      email: "Sumitrokunto@gmail.com",
      role: "Applicant",
      status: "Inactive",
    },
  ];

  const filtered = applicants.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#1E2235] rounded-xl p-6">
      {/* Search & Filter */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search applicant"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 px-6 py-3 rounded-md bg-[#2A2E42] text-gray-200 placeholder-gray-400 focus:outline-none"
        />
        <button className="ml-auto px-6 py-3 rounded-md bg-[#3A3E55] text-gray-200 hover:bg-[#4A4E66]">
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg">
        <table className="w-full">
          <thead className="bg-[#2A2E42]">
            <tr>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">
                NAME
              </th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">
                EMAIL
              </th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">
                ROLE
              </th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">
                STATUS
              </th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-700 hover:bg-[#2A2E42]"
              >
                <td className="py-4 px-6 text-white">{user.name}</td>
                <td className="py-4 px-6 text-gray-300">{user.email}</td>
                <td className="py-4 px-6 text-gray-300">{user.role}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-500 text-black"
                        : "bg-gray-400 text-black"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2 text-sm">
                    <button className="text-yellow-400 hover:text-yellow-300 font-medium">
                      Edit
                    </button>
                    <span className="text-gray-500">|</span>
                    <button className="text-yellow-400 hover:text-yellow-300 font-medium">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No applicant found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantTable;
