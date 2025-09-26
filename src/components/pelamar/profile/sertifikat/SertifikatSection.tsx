"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import SertifikatForm from "./SertifikatForm";

type Certificate = {
  id: number;
  certificate_name: string;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  certificate_file: string; // ← pakai nama file saja
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// 👉 helper mapping data API ke Form
function mapCertToForm(cert: Certificate) {
  return {
    id: cert.id.toString(),
    nama: cert.certificate_name,
    penerbit: cert.issuer,
    gambar: `${BASE_URL}/uploads/files/${cert.certificate_file}`,
    tanggal_terbit: cert.issue_date,
    tanggal_berakhir: cert.expiry_date,
  };
}

export default function SertifikatSection() {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [sertifikatList, setSertifikatList] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || sessionStorage.getItem("token");
    }
    return null;
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      setError("");

      try {
        const token = getToken();
        if (!token) {
          setError("Token tidak ditemukan. Silakan login kembali.");
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${BASE_URL}/api/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data sertifikat");
        }

        const json = await res.json();
        if (json.data?.certificates) {
          setSertifikatList(json.data.certificates);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan saat fetch"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleAdd = () => {
    setEditIndex(null);
    setShowForm(true);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setShowForm(true);
  };

  const handleDelete = (idx: number) => {
    if (confirm("Yakin mau hapus sertifikat ini?")) {
      setSertifikatList((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditIndex(null);
  };

  return (
    <div className="mt-3 p-4 bg-white rounded shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-800">Sertifikat</h2>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Tambah
          </button>
        )}
      </div>

      {isLoading && <p className="text-sm text-gray-500">Memuat data...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {showForm ? (
        <SertifikatForm
          mode={editIndex === null ? "add" : "edit"}
          data={
            editIndex !== null
              ? mapCertToForm(sertifikatList[editIndex])
              : undefined
          }
          onCancel={handleCancel}
          onSave={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-1">
          {sertifikatList.length > 0 ? (
            sertifikatList.map((cert, idx) => (
              <div
                key={cert.id}
                className="border border-gray-200 rounded overflow-hidden flex flex-col bg-white shadow-sm"
              >
                <div className="relative w-full h-28">
                  <Image
                    src={`${BASE_URL}/uploads/files/${cert.certificate_file}`}
                    alt={cert.certificate_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs truncate">
                      {cert.certificate_name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Pencil
                      className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-600"
                      onClick={() => handleEdit(idx)}
                    />
                    <Trash2
                      className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-600"
                      onClick={() => handleDelete(idx)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            !isLoading &&
            !error && (
              <p className="text-xs text-gray-500">
                Belum ada sertifikat yang tersimpan.
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
