"use client";

import React, { useState } from "react";

const About = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });

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
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            TENTANG STICKAREER
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-start gap-8">
            {/* Left Content */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Misi Kami
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                STICKAREER hadir dengan misi untuk mempermudah kebersamaan
                antara talenta terbaik dengan perusahaan impian. Kami percaya
                bahwa setiap individu memiliki potensi bertemunan untuk
                memberikan kontribusi bagi individu, Berbagai eksistansi
                ketersangkutan, kami menciptakan platform yang memungkinkan para
                pencari kerja dan perusahaan untuk bertemu dan terhubung secara
                mudah melalui satu yang modern dan transsparan. Kami bertujuan
                membantu menciptakan masa depan karir yang lebih cerah dan
                berkualitas.
              </p>

              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Visi Kami
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-8">
                Menjadi platform karir nomor satu di Indonesia yang dapat
                membantu sejumlah orang dengan karir terbaik untuk masa depan
                yang lebih baik, serta membantu perusahaan menemukan dengan
                menampilkan informasi, kesenangan, dan kemudahan yang maksimun
                untuk semua kalangan tanpa bapak dari tuntutan dan lainnya.
              </p>

              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pertanyaan yang sering di ajukan
              </h2>

              {/* FAQ Dropdowns */}
              <div className="space-y-3 mb-8">
                <details className="bg-gray-50 rounded-lg border border-gray-200">
                  <summary className="p-4 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100">
                    Bagaimana Cara saya membuat akun di STICKAREER ?
                  </summary>
                </details>

                <details className="bg-gray-50 rounded-lg border border-gray-200">
                  <summary className="p-4 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100">
                    Apakah layanan di STICKAREER berbayar ?
                  </summary>
                </details>

                <details className="bg-gray-50 rounded-lg border border-gray-200">
                  <summary className="p-4 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100">
                    Bagaimana saya bisa yakin pada pekerjaan lowongan ?
                  </summary>
                </details>

                <details className="bg-gray-50 rounded-lg border border-gray-200">
                  <summary className="p-4 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100">
                    Apa yang harus saya lakukan ketika masa kerja tidak?
                  </summary>
                </details>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Hubungi Kami
              </h2>

              {/* Contact Form */}
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telepon
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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

            {/* Right Logo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-900 font-bold text-lg">S</span>
                  </div>
                  <div className="text-xs">STICKAREER</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
