"use client";

import React, { useState } from "react";
import Image from "next/image";

const About = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Show success notification
    setShowNotification(true);

    // Reset form
    setFormData({
      nama: "",
      email: "",
      subjek: "",
      pesan: "",
    });
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqItems = [
    "Bagaimana Cara saya membuat akun di STICKAREER ?",
    "Apakah Layanan di STICKAREER berbayar ?",
    "Bagaimana saya bisa yakin data pribadi saya aman ?",
    "Apa yang harus saya lakukan ketika lupa kata sandi ?",
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      {/* Success Notification Modal */}
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-mx-4 text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              PESAN BERHASIL
              <br />
              DIKIRIM!!!
            </h3>

            {/* OK Button */}
            <button
              onClick={handleCloseNotification}
              className="bg-blue-900 text-white px-8 py-2 rounded-md hover:bg-blue-800 transition-colors font-medium"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Card Section - TENTANG STICKAREER & Misi Kami */}
        <div className="bg-white rounded-lg border border-gray-300 p-8 mb-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">
              TENTANG STICKAREER
            </h1>
          </div>

          {/* Misi Kami */}
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black mb-4">Misi Kami</h2>
              <p className="text-sm text-gray-800 leading-relaxed">
                STICKAREER lahir dengan misi untuk menjembatani kesenjangan
                antara talenta berbakat dengan perusahaan-perusahaan impian
                mereka. Kami berkomitmen untuk memberikan kesempatan bagi
                individu berbakat mendapatkan kesempatan untuk membangun karir
                sesuai dengan potensi mereka. Melalui platform kami yang
                inovatif dan terpercaya, kami bertujuan menjadi mitra terbaik
                dalam mencari dan merekrut talenta terbaik, serta mendukung
                karir mereka ke level lebih tinggi di berbagai peluang kerja
                terbaik di seluruh Indonesia.
              </p>
            </div>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/logo-stti.png"
                alt="Logo STTI"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Visi Kami - No Card */}
        <div className="bg-blue-50 p-6 rounded-lg mb-12 max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-blue-900 mb-4 text-center">
            Visi Kami
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed text-center">
            Menjadi platform karir nomor satu di Indonesia yang paling dipercaya
            oleh para pencari kerja dan perusahaan. Kami bertekad untuk
            menciptakan ekosistem yang transparan dan mendukung pertumbuhan
            profesional dengan memberikan informasi, kesempatan, dan bimbingan
            yang relevan agar talenta terbaik dapat tumbuh dan bersinar.
          </p>
        </div>

        {/* FAQ Section - No Card */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-blue-900 mb-6 text-center">
            Pertanyaan yang sering di ajukan
          </h2>

          <div className="space-y-3">
            {faqItems.map((question, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-lg border border-gray-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 text-left text-sm font-medium text-gray-900 hover:bg-blue-100 rounded-lg flex items-center justify-between"
                >
                  <span>{question}</span>
                  <span className="text-gray-500 text-lg">
                    {openFAQ === index ? "−" : "⌄"}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-4 pb-4 text-sm text-gray-700">
                    Jawaban untuk pertanyaan ini akan ditampilkan di sini.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form - No Card */}
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-bold text-blue-900 mb-6 text-center">
            Hubungi Kami
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subjek
              </label>
              <input
                type="text"
                name="subjek"
                value={formData.subjek}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pesan
              </label>
              <textarea
                name="pesan"
                value={formData.pesan}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition-colors font-medium"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
