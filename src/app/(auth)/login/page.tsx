"use client";

import Image from "next/image";

export default function Login() {
  return (
    <section className="flex h-screen">
      {/* Kiri */}
      <div className="w-2/5 flex flex-col items-center justify-center bg-white relative z-10">
        <Image
          src="/logo-sttis.png" // ganti dengan path logo kamu
          alt="Logo STTIS"
          width={180}
          height={180}
        />
        <h1 className="mt-6 text-3xl font-bold text-[#0A1FB5]">STTICAREER</h1>
      </div>

      {/* Kanan dengan diagonal */}
      <div className="w-4/5 relative flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[#0A1FB5]"
          style={{
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        ></div>

        {/* Form */}
        <div className="relative z-10 w-3/4 max-w-md text-white">
          {/* Email */}
          <label className="block mb-2 font-semibold">Your Mail :</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 rounded-md text-black"
          />

          {/* Password */}
          <label className="block mb-2 font-semibold">Your Password :</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 mb-4 rounded-md text-black"
          />

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forget password ?
            </a>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-white text-black font-bold py-2 rounded-md">
              Login
            </button>
            <button className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded-md">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
