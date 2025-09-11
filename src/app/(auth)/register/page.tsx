"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPelamar() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    if (!/^[0-9]+$/.test(phone)) {
      setError("Nomor telepon hanya boleh angka!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://api-recruitmentstti-production.up.railway.app/api/auth/register/pelamar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName,
            email,
            password,
            address,
            date_of_birth: dob,
            phone,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      setSuccess("Registrasi berhasil! Mengarahkan ke halaman login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen">
      {/* Background */}
      <Image src="/job.jpg" alt="Background" fill className="object-cover" />

      {/* Card */}
      <div className="relative z-10 bg-white/90 rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 flex flex-col md:flex-row p-8 md:p-12 gap-8 my-4">
        {/* Form */}
        <div className="flex-1">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-semibold">Your Full Name :</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan Nama Lengkap"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-semibold">Your Address :</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masukkan Alamat"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block mb-1 font-semibold">My date of birth :</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-semibold">Phone Number :</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Masukkan Nomor Telepon"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold">Your Mail :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-semibold">Your Password :</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-semibold">Confirm Password :</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi Password"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Error / Success */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded-md hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Daftar"}
            </button>
          </form>

          {/* Link ke Login */}
          <p className="mt-4 text-sm text-center">
            Sudah punya akun?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Login sekarang!
            </span>
          </p>
        </div>

        {/* Logo + Title */}
        <div className="flex flex-col items-center justify-center flex-1">
          <Image
            src="/logo-stti.png"
            alt="Logo STTIS"
            width={200}
            height={200}
          />
          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-[#0A1FB5]">
            STTICAREER
          </h1>
        </div>
      </div>
    </section>
  );
}
