//src/components/lowongan/Lamar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

// Interface untuk tipe data job detail
interface JobDetail {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
  salary: string;
  postedAt: string;
  companyLogo?: string;
}

// Interface untuk application form
interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  resume: File | null;
}

const LamarKerja: React.FC = () => {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    fullName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    resume: null,
  });

  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;

  // Fetch job detail (dummy dulu)
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock job detail data
        const mockJobDetail: JobDetail = {
          id: 1,
          title: "Senior Frontend Developer",
          company: "PT Pelagenda Code",
          location: "Karawang, Indonesia",
          type: "Full Time",
          description:
            "Kami mencari Senior Frontend Developer berpengalaman untuk memimpin pengembangan antarmuka aplikasi web modern. Kandidat ideal memiliki kemampuan teknis yang mendalam pada framework frontend populer serta mampu memimpin tim dalam menciptakan produk yang skalabel, responsif, dan berperforma tinggi.",
          tags: ["Remote", "Senior"],
          salary: "Rp 15.000.000 – Rp 25.000.000 per bulan",
          postedAt: "2 days ago",
        };

        if (jobId === "1") {
          setJob(mockJobDetail);
        } else {
          throw new Error("Job not found");
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
        router.push("/lowongan");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetail();
    }
  }, [jobId, router]); // ✅ fix: mockJobDetail tidak jadi dependency

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      // Validasi form
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.resume
      ) {
        alert("Please fill in all required fields");
        return;
      }

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Gagal mengirim lamaran. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle success modal actions
  const handleViewStatus = () => {
    setShowSuccessModal(false);
    router.push("/status-lamaran");
  };

  const handleBackToJobs = () => {
    setShowSuccessModal(false);
    router.push("/lowongan");
  };

  // Handle back button
  const handleGoBack = () => {
    router.back();
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (allowedTypes.includes(file.type)) {
        setFormData((prev) => ({
          ...prev,
          resume: file,
        }));
      } else {
        alert("Please upload a valid file (PDF, DOC, DOCX, PNG, JPG, JPEG)");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Job not found
            </h3>
            <button
              onClick={() => router.push("/lowongan")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Job Information Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start space-x-4">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                <path d="M10 12h4v4h-4z" fill="white" />
                <circle cx="8" cy="8" r="1" fill="white" />
                <circle cx="16" cy="8" r="1" fill="white" />
              </svg>
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {job.title}
              </h1>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <div className="text-gray-700 text-sm leading-relaxed mb-3 select-text">
                {job.description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tag === "Remote"
                        ? "bg-green-100 text-green-800"
                        : tag === "Senior"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm">{job.location}</p>
            </div>
          </div>
        </div>

        {/* Application Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Submit Your Application
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Portfolio/Website URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/Website URL
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Your Resume
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="resume-upload"
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    upload file
                  </label>
                  <span className="text-gray-600"> atau seret dan simpan</span>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 10MB
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="resume-upload"
                  required
                />
              </div>
              {formData.resume && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {formData.resume.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {submitting ? "Submitting..." : "Apply Now"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Lamaran Anda Telah Berhasil Dikirim
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Terima kasih telah melamar posisi ini. Kami akan meninjau
                lamaran Anda dan menghubungi Anda jika ada perkembangan lebih
                lanjut.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleViewStatus}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Lihat Status Lamaran
              </button>
              <button
                onClick={handleBackToJobs}
                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition-colors font-medium"
              >
                Kembali Ke Beranda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LamarKerja;
