"use client";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* ================= Desktop ================= */}
      <div className="hidden md:block relative bg-gradient-to-r from-[#0A1FB5] to-[#0A18E0] h-full">
        {/* wrapper flex kiri–kanan */}
        <div className="absolute top-0 left-0 w-full h-full flex">
          {/* BG putih kiri */}
          <div className="w-3/5 h-[90%] bg-white rounded-br-[40px]"></div>

          {/* BG putih kanan */}
          <div className="w-2/5 h-full relative">
            <div className="left-0 bottom-10 w-3/4 h-full flex flex-col relative">
              {/* atas putih 70% jadi background */}
              <div className="h-[65%] w-full bg-white relative z-0"></div>

              {/* bawah gambar overlap */}
              <div className="flex-1 flex items-end justify-center relative z-10">
                <img
                  src="/Group 61.png"
                  alt="foto group"
                  className="w-full object-contain relative z-20 -mt-80"
                />
              </div>
            </div>

            {/* kotak kanan */}
            <div className="absolute right-0 bottom-[10%] w-1/4 h-[90%] bg-white rounded-bl-[40px]"></div>
          </div>
        </div>

        {/* konten utama */}
        <div className="relative z-10 flex h-full">
          <div className="w-3/5 flex flex-col justify-center gap-y-3 pl-16 pb-40">
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
      </div>

      {/* ================= Mobile ================= */}
      <div className="block md:hidden relative bg-gradient-to-r from-[#0A1FB5] to-[#0A18E0] h-full overflow-hidden">
        {/* Layer putih */}
        <div className="absolute inset-0 flex">
          {/* putih kiri */}
          <div className="w-1/5 h-[80%] bg-white rounded-br-[40px]"></div>

          {/* putih tengah */}
          <div className="flex-1 flex flex-col">
            <div className="h-[65%] w-full bg-white flex items-end justify-center relative">
              <img
                src="/Group 61.png"
                alt="foto group"
                className="w-full max-w-sm object-contain relative z-10 -mb-40"
              />
            </div>
            <div className="flex-1"></div>
          </div>

          {/* putih kanan */}
          <div className="w-1/5 h-[80%] bg-white rounded-bl-[40px]"></div>
        </div>

        {/* Konten utama */}
        <div className="relative z-20 flex flex-col items-center justify-start text-center px-6 h-full pt-60">
          {/* teks */}
          <div className="flex flex-col gap-y-3 text-[#0A1FB5]">
            <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
              It’s Easy to Find
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
              Your Dream Job at
            </h2>
            <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#0A1FB5] to-[#2C6CF6] bg-clip-text text-transparent">
              STTICAREER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
