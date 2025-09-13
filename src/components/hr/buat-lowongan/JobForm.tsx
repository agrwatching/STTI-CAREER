"use client";

import { useState } from "react";

interface JobFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export default function JobForm({ onCancel, onSubmit }: JobFormProps) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: "",
    qualification: "",
    type: "WFH",
    salaryMin: "",
    salaryMax: "",
    logo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-4 w-full mx-auto text-xl">
        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kiri */}
          <div className="col-span-2 space-y-2">
            <div>
              <label className="block font-semibold mb-1 text-lg">Company Name</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-base">Job Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-base">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full border rounded px-2 py-1 text-sm" />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-base">Required Qualification</label>
              <textarea name="qualification" value={formData.qualification} onChange={handleChange} rows={2} className="w-full border rounded px-2 py-1 text-sm" />
            </div>

            {/* Work Type */}
            <div>
              <label className="block font-semibold mb-1 text-base">Work Type</label>
              <div className="flex gap-2 mb-1">
                {["WFH", "Onsite", "Hybrid"].map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${formData.type === type ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                    onClick={() => setFormData({ ...formData, type })}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="block font-semibold mb-1 text-base">Salary Range</label>
              <div className="flex gap-2">
                <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} placeholder="Min" className="w-1/2 border rounded px-2 py-1 text-sm" />
                <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} placeholder="Max" className="w-1/2 border rounded px-2 py-1 text-sm" />
              </div>
            </div>
          </div>

          {/* Kanan */}
          <div className="col-span-1 flex flex-col items-center">
            <label className="block font-semibold mb-1 text-base">Company Logo</label>
            <div className="w-44 h-28 border-2 border-dashed rounded flex items-center justify-center text-gray-500 text-xs cursor-pointer">Unggah</div>
          </div>

          {/* Tombol */}
          <div className="col-span-3 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onCancel} className="px-3 py-1 text-base rounded bg-gray-300 hover:bg-gray-400">
              Kembali
            </button>
            <button type="submit" className="px-3 py-1 text-base rounded bg-blue-600 text-white hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
