"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CompanyProfileForm() {
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_companies: "",
    nama_companies: "",
    email_companies: "",
    nomor_telepon: "",
    website: "",
    alamat: "",
    logo: "",
  });

  const token = localStorage.getItem("token") || "";

  // ======================
  // Fetch data perusahaan (termasuk logo)
  // ======================
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/company/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) {
          console.error("Gagal fetch data perusahaan:", res.statusText);
          return;
        }

        const company = await res.json();

        if (company) {
          setFormData({
            id_companies: company.id_companies || "",
            nama_companies: company.nama_companies || "",
            email_companies: company.email_companies || "",
            nomor_telepon: company.nomor_telepon || "",
            website: company.website || "",
            alamat: company.alamat || "",
            logo: company.logo || "",
          });

          if (company.logo) {
            const logoUrl = company.logo.startsWith("http")
              ? company.logo
              : `${process.env.NEXT_PUBLIC_API_URL}/uploads/company_logos/${company.logo}`;
            setPreviewLogo(logoUrl);
          }
        }
      } catch (err) {
        console.error("Gagal fetch data perusahaan:", err);
      }
    };

    if (token) fetchCompany();
  }, [token]);

  // ======================
  // Handle input change
  // ======================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ======================
  // Handle upload logo
  // ======================
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
      setPreviewLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  // ======================
  // Submit form
  // ======================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama_companies || !formData.email_companies) {
      toast.error("Nama dan email perusahaan wajib diisi!");
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // 1️⃣ Simpan data perusahaan
      const res = await fetch(`${API_URL}/api/company/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nama_companies: formData.nama_companies,
          email_companies: formData.email_companies,
          nomor_telepon: formData.nomor_telepon || "",
          website: formData.website || "",
          alamat: formData.alamat || "",
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Error response:", errText);
        throw new Error("Gagal simpan perusahaan");
      }

      // 2️⃣ Upload logo jika ada file baru
      if (logo) {
        const logoForm = new FormData();
        logoForm.append("logo", logo);

        const logoRes = await fetch(`${API_URL}/api/company/me/logo`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: logoForm,
        });

        const text = await logoRes.text();
        console.log("📦 Logo upload response:", text);

        if (logoRes.ok) {
          const logoData = JSON.parse(text);
          setPreviewLogo(logoData.url);
          setFormData((prev) => ({ ...prev, logo: logoData.filename }));
          toast.success("Logo berhasil diupload!");
        } else {
          toast.error("Gagal upload logo perusahaan.");
        }
      }

      toast.success("Data perusahaan berhasil disimpan!");
    } catch (err) {
      console.error("Gagal simpan perusahaan:", err);
      toast.error("Terjadi kesalahan saat menyimpan data perusahaan.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg shadow-sm p-6"
    >
      <h2 className="text-lg font-semibold mb-6">Profil Perusahaan</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Nama Perusahaan
          </label>
          <input
            type="text"
            name="nama_companies"
            value={formData.nama_companies}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Perusahaan
          </label>
          <input
            type="email"
            name="email_companies"
            value={formData.email_companies}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="nomor_telepon"
            value={formData.nomor_telepon}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Alamat Perusahaan
        </label>
        <textarea
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full text-sm"
          rows={3}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Logo Perusahaan
        </label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border flex items-center justify-center bg-gray-100 overflow-hidden">
            {previewLogo ? (
              <img
                src={previewLogo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">Logo</span>
            )}
          </div>
          <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">
            Ganti Logo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded border hover:bg-gray-100 text-sm"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}
