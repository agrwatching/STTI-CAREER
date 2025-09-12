"use client";

import { useState } from "react";
import Image from "next/image";

type Company = {
  id: number;
  name: string;
  logo: string;
  interns: number;
  alumni: number;
};

const companies: Company[] = [
  {
    id: 1,
    name: "Pakulaga Code",
    logo: "https://i.pravatar.cc/150?img=12",
    interns: 1200,
    alumni: 1000,
  },
  {
    id: 2,
    name: "TechnoWorks",
    logo: "https://i.pravatar.cc/150?img=13",
    interns: 800,
    alumni: 900,
  },
  {
    id: 3,
    name: "DesignHub",
    logo: "https://i.pravatar.cc/150?img=2",
    interns: 1500,
    alumni: 1200,
  },
  {
    id: 4,
    name: "InsightAI",
    logo: "https://i.pravatar.cc/150?img=14",
    interns: 600,
    alumni: 500,
  },
  {
    id: 5,
    name: "GlobalSoft",
    logo: "https://i.pravatar.cc/150?img=15",
    interns: 2000,
    alumni: 1800,
  },
  {
    id: 5,
    name: "GlobalSoft",
    logo: "https://i.pravatar.cc/150?img=15",
    interns: 2000,
    alumni: 1800,
  },
  {
    id: 5,
    name: "GlobalSoft",
    logo: "https://i.pravatar.cc/150?img=15",
    interns: 2000,
    alumni: 1800,
  },
];

export default function Company() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(companies.length / itemsPerSlide);

  return (
    <section className="px-8 py-16 bg-gray-50 text-center">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Join Leading Multinational Companies</h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">STTICAREER has helped more than 120 companies and 12,000 participants carry out internships at top companies</p>

      {/* Slider */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-full flex-shrink-0">
              {companies.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide).map((company) => (
                <div key={company.id} className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
                  <img src={company.logo} alt={company.name} width={100} height={100} className="mb-4 rounded-sm" />

                  <h3 className="font-semibold text-lg">{company.name}</h3>
                  <div className="w-12 h-[2px] bg-gray-200 my-3"></div>
                  <p className="text-sm text-gray-600">👥 {company.interns} Interns</p>
                  <p className="text-sm text-gray-600">🎓 {company.alumni} Alumni</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-blue-800" : "bg-gray-300"}`} />
        ))}
      </div>
    </section>
  );
}
