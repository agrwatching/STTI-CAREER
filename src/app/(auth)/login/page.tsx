"use client";

import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://api-recruitmentstti-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login gagal");

      // ✅ Simpan token & user ke localStorage
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      alert("Login sukses!");

      // ✅ Redirect sesuai role
      const role = data.data.user.role;
      if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (role === "hr") {
        window.location.href = "/hr/dashboard";
      } else if (role === "pelamar") {
        window.location.href = "/"; // pelamar ke menu utama
      } else {
        alert("Role tidak dikenali!");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex h-screen relative">
      {/* 🔙 Tombol kembali di pojok kiri atas */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 z-20"
      >
        <Image src="/back.png" alt="Back" width={32} height={32} />
      </button>

      {/* Bagian kiri */}
      <div className="w-2/5 flex flex-col items-center justify-center bg-white relative z-10">
        <Image
          src="/logo-stti.png"
          alt="Logo STTIS"
          width={180}
          height={180}
        />
        <h1 className="mt-6 text-3xl font-bold text-[#0A1FB5]">STTICAREER</h1>
      </div>

      {/* Bagian kanan */}
      <div className="w-4/5 relative flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[#0A1FB5]"
          style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
        ></div>

        {/* Form Login */}
        <form
          onSubmit={handleLogin}
          className="relative z-10 w-3/4 max-w-md text-white"
        >
          {error && <p className="mb-4 text-red-300">{error}</p>}

          <label className="block mb-2 font-semibold">Your Mail :</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 rounded-md text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Your Password :</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 mb-4 rounded-md text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forget password ?
            </a>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-white text-black font-bold py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/role")}
              className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
