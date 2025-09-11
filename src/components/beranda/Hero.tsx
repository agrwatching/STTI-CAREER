"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[#0A1FB5] to-[#0A18E0] h-screen pt-20 overflow-hidden">
      {/* wrapper flex kiri–kanan */}
      <div className="absolute top-0 left-0 w-full h-full flex">
        {/* BG putih kiri */}
        <div className="w-3/5 h-[90%] bg-white rounded-br-[40px]"></div>

        {/* BG putih kanan */}
        <div className="w-2/5 h-full relative">
          <div className="left-0 bottom-10 w-3/4 h-full flex flex-col relative">
            {/* atas putih 70% jadi background */}
            <div className="h-[65%] w-full bg-white relative z-0"></div>

            {/* bawah gambar 30%, overlap ke atas */}
            <div className="flex-1 flex items-end justify-center relative z-10">
              <img
                src="Group 61.png"
                alt="foto group"
                className="w-full object-contain relative z-20 -mt-80"
              />
            </div>
          </div>

          {/* kotak 2: 1/4 lebar, tinggi 90%, posisi bottom sama kaya kiri */}
          <div className="absolute right-0 bottom-[10%] w-1/4 h-[90%] bg-white rounded-bl-[40px]"></div>
        </div>
      </div>

      {/* konten utama */}
      <div className="relative z-10 flex h-full">
        {/* kiri: teks */}
        <div className="w-3/5 flex flex-col justify-center gap-y-4 pl-16 pb-40">
          <h1 className="md:text-[88px] font-bold leading-tight">
            It’s Easy to Find
          </h1>
          <h2 className="md:text-7xl font-bold leading-tight">
            Your Dream Job at
          </h2>
          <p className="md:text-6xl font-bold bg-gradient-to-r from-[#0A1FB5] to-[#2C6CF6] bg-clip-text text-transparent">
            STTICAREER
          </p>
        </div>
      </div>
    </section>
  );
}
