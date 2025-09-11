"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Users, UserCheck, Building2 } from "lucide-react";
import Image from "next/image";

type Review = {
  id: number;
  name: string;
  role: string;
  company: string;
  date: string;
  review: string;
  avatar: string;
  rating: number;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Muhammad Rizal",
    role: "Frontend Developer",
    company: "PT Pakulaga Code",
    date: "20 Juli 2024",
    review: "STTICAREER membantu saya menemukan pekerjaan impian dengan cepat. Platformnya mudah digunakan dan sangat membantu!",
    avatar: "https://i.pravatar.cc/15",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Amalia",
    role: "Backend Engineer",
    company: "TechnoWorks",
    date: "15 Agustus 2024",
    review: "Saya berhasil mendapat pekerjaan dalam waktu 2 minggu setelah melamar melalui STTICAREER.",
    avatar: "https://i.pravatar.cc/50",
    rating: 4,
  },
  {
    id: 3,
    name: "Dimas Putra",
    role: "UI/UX Designer",
    company: "DesignHub",
    date: "1 September 2024",
    review: "Desain platformnya clean dan lowongan kerja selalu up-to-date. Sangat direkomendasikan!",
    avatar: "https://i.pravatar.cc/2",
    rating: 5,
  },
  {
    id: 4,
    name: "Aulia Rahman",
    role: "Data Scientist",
    company: "InsightAI",
    date: "28 Juli 2024",
    review: "Banyak perusahaan besar yang membuka lowongan di sini. Saya langsung dapat interview di minggu pertama.",
    avatar: "https://i.pravatar.cc/150",
    rating: 5,
  },
];

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const nextSlide = () => {
    if (currentIndex + itemsPerSlide < reviews.length) {
      setCurrentIndex(currentIndex + 1); // geser 1 card biar smooth
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="px-8 py-16 bg-white">
      {/* ===== ULASAN ===== */}
      <div className="mb-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Ulasan <span className="text-blue-700">STTICAREER</span>
          </h2>
          <a href="#" className="text-blue-600 hover:underline text-sm">
            Lihat Selengkapnya
          </a>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
                width: `${(reviews.length / itemsPerSlide) * 100}%`,
              }}
            >
              {reviews.map((r) => (
                <div key={r.id} className="bg-white border p-6 rounded-xl shadow-sm flex flex-col justify-between min-h-[260px] w-1/3">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Image src={r.avatar} alt={r.name} width={48} height={48} className="rounded-full object-cover" />

                      <div>
                        <h3 className="font-semibold">{r.name}</h3>
                        <p className="text-sm text-gray-600">
                          {r.company} – {r.role}
                        </p>
                        <p className="text-xs text-gray-400">{r.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-4">{r.review}</p>
                  </div>
                  <div className="flex text-yellow-500 mt-auto">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          {currentIndex > 0 && (
            <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow">
              <ChevronLeft size={20} />
            </button>
          )}
          {currentIndex + itemsPerSlide < reviews.length && (
            <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow">
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* ===== STATISTIK ===== */}
      <div className="bg-gradient-to-r from-[#0A1FB5] to-[#0A18E0] text-white rounded-2xl px-10 py-12">
        <h2 className="text-2xl font-bold mb-2">
          We Have Helped <span className="text-green-400">Jobseekers</span> Gain Career Opportunities
        </h2>
        <p className="text-sm text-gray-200 mb-10">STTICAREER has supported many jobseekers around the world</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Users className="mx-auto mb-3 w-10 h-10" />
            <p className="text-2xl font-bold">100.000</p>
            <p className="text-sm">Pelamar Terdaftar</p>
          </div>
          <div>
            <UserCheck className="mx-auto mb-3 w-10 h-10" />
            <p className="text-2xl font-bold">10.000</p>
            <p className="text-sm">Pelamar Aktif Melamar</p>
          </div>
          <div>
            <Building2 className="mx-auto mb-3 w-10 h-10" />
            <p className="text-2xl font-bold">10.000</p>
            <p className="text-sm">Perusahaan</p>
          </div>
        </div>
      </div>
    </section>
  );
}
