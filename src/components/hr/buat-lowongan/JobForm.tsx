// src/components/hr/buat-lowongan/JobForm.tsx
"use client";

import { useState, useRef } from "react";
import type { JobType } from "./types";

interface JobFormProps {
  onCancel: () => void;
  onSubmit: (data: Omit<JobType, "status" | "statusColor" | "icon">) => void;
}

export default function JobForm({ onCancel, onSubmit }: JobFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary_range: "",
    location: "",
    type: "Remote",
    logo: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setFormData({ ...formData, logo: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // pastikan payload sesuai API
    const payload: Omit<JobType, "status" | "statusColor" | "icon"> = {
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements,
      salary_range: formData.salary_range,
      location: formData.location,
      type: formData.type,
      logo: formData.logo,
    };

    onSubmit(payload);
  };

  return (
    <div className="max-h-screen flex justify-center items-start bg-gray-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-md p-4 w-full mx-auto text-xl my-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="col-span-2 space-y-2">
            <div>
              <label className="block font-semibold mb-1 text-lg">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-base">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-base">
                Requirements
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={2}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-base">
                Work Type
              </label>
              <div className="flex gap-2 mb-1">
                {["Remote", "On-site", "Hybrid"].map((label) => (
                  <button
                    type="button"
                    key={label}
                    className={`w-24 py-1 rounded-full text-xs font-semibold text-white transition-colors ${
                      formData.type === label ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    onClick={() => setFormData({ ...formData, type: label })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-base">
                Salary Range
              </label>
              <input
                type="text"
                name="salary_range"
                value={formData.salary_range}
                onChange={handleChange}
                placeholder="Contoh: Rp. 5.000.000 - Rp. 8.000.000"
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-base">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center">
            <label className="block font-semibold mb-1 text-base">
              Company Logo
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-44 h-28 border-2 border-dashed rounded flex items-center justify-center text-gray-500 text-xs cursor-pointer hover:bg-gray-50"
            >
              {logoFile ? (
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="Logo Preview"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                "Unggah"
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleLogoChange}
              className="hidden"
            />
          </div>

          <div className="col-span-3 flex justify-end gap-2 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 text-base rounded bg-gray-300 hover:bg-gray-400"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-base rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
