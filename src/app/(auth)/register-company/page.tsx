"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    company_name: "",
    company_address: "",
    position: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/hr`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal register");

      setShowSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    router.push("/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Gambar di atas (mobile) / kanan (desktop) */}
      <div className="order-1 md:order-2 relative basis-2/5 md:basis-2/5 h-40 md:h-full">
        <img
          src="/company.jpg"
          alt="STTIS"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/logo-stti.png"
            alt="Logo Senat"
            className="w-24 h-24 md:w-60 md:h-60 object-contain"
          />
        </div>

        {/* Tombol Back (selalu muncul di desktop & mobile) */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4"
        >
          <img src="/back.png" alt="Back" className="w-8 h-8" />
        </button>
      </div>

      {/* Form di bawah (mobile) / kiri (desktop) */}
      <div className="order-2 md:order-1 flex items-center justify-center bg-white flex-1">
        <div className="w-full max-w-md h-full overflow-y-auto px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none focus:border-yellow-500 text-sm p-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none focus:border-yellow-500 text-sm p-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none focus:border-yellow-500 text-sm p-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none focus:border-yellow-500 text-sm p-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Address
              </label>
              <input
                type="text"
                name="company_address"
                value={formData.company_address}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none focus:border-yellow-500 text-sm p-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none focus:border-yellow-500 text-sm p-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 focus:outline-none focus:border-yellow-500 text-sm p-1"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition-colors"
            >
              {loading ? "Loading..." : "Daftar"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>

      {/* Modal Success */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center w-80">
            <h2 className="text-lg font-bold text-green-600 mb-4">
              Registrasi berhasil 🎉
            </h2>
            <button
              onClick={handleSuccessOk}
              className="px-4 py-2 bg-yellow-400 rounded font-semibold hover:bg-yellow-500"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
