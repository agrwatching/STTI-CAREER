"use client";

import React, { useState } from "react";

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

    setShowNotification(true);

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
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-mx-4 text-center">
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
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              PESAN BERHASIL
              <br />
              DIKIRIM!!!
            </h3>
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
        {/* Tentang Kami */}
        <div className="bg-white rounded-lg border border-gray-300 p-8 mb-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">
              TENTANG KAMI
            </h1>
          </div>
          <div className="text-sm text-gray-800 leading-relaxed text-justify space-y-4">
            <p>
              Sekolah Tinggi Teknologi Informatika Sony Sugema Career Center
              yang berada di bawah Bidang Kemahasiswaan Sekolah Tinggi Teknologi
              Informatika Sony Sugema adalah sebuah lembaga yang didedikasikan
              untuk menjembatani mahasiswa dan alumni dengan Dunia Usaha dan
              Dunia Industri (DUDI). Dengan misi{" "}
              <span className="italic">
                'Membangun SDM profesional yang berkualitas tinggi dan memiliki
                karakter esensial untuk mengatasi tantangan di era globalisasi,
                serta tetap memiliki kewajiban moral untuk membangun bangsa'
              </span>
              , Career Center memberikan layanan karir berupa info lowongan
              kerja daring (online), info magang (internship), program
              wirausaha, pelatihan persiapan karir, konseling karir, serta bursa
              kerja "Integrated Career Days" yang rutin diselenggarakan dua kali
              setiap tahunnya.
            </p>
            <p>
              Selain itu, Career Center juga menjembatani para 'experienced
              jobseeker' dan pihak perusahaan dalam memenuhi kebutuhan tenaga
              profesional. Bagi DUDI sendiri, Career Center memberikan layanan
              publikasi iklan lowongan kerja dan rekrutmen SDM, di antaranya
              rekrutmen daring (online), penyelenggaraan rekrutmen kampus,
              presentasi profil perusahaan, 'company branding', serta 'career
              days' khusus bagi perusahaan.
            </p>
            <p>
              Sebagai bagian dari layanan pada masyarakat umum, Career Center
              membuka kesempatan yang luas bagi para mahasiswa dan alumni
              perguruan tinggi di luar Sekolah Tinggi Teknologi Informatika Sony
              Sugema, untuk bergabung dalam keanggotaan 'jobseeker' di situs
              Career Center. Anggota 'jobseeker' akan mendapatkan info terbaru
              tentang lowongan, program magang, dan berbagai kegiatan rekrutmen
              di kampus. Dan yang tak kalah menariknya, anggota Career Center
              dapat masuk ke Titian Karir Terpadu secara gratis*.
            </p>
            <p>
              Detail Website:{" "}
              <a
                href="https://sttisonysugema.ac.id/"
                target="_blank"
                className="text-blue-700 underline"
              >
                sttisonysugema.ac.id
              </a>
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-blue-900 mb-6 text-center">
            Pertanyaan yang Sering Diajukan
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

        {/* Contact Form */}
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50"
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
