  // src/components/pelamar/profile/pengalaman/PengalamanSection.tsx
  "use client";

  import { useState, useEffect } from "react";
  import PengalamanForm from "./PengalamanForm";

  type Pengalaman = {
    id?: string | number;
    posisi: string;
    perusahaan: string;
    deskripsi: string;
    tahunMasuk: string;
    tahunKeluar: string;
    isCurrentJob?: boolean;
  };

  // Type sesuai API
  interface ApiWorkExperience {
    id: number;
    position: string;
    company_name: string;
    start_date: string;
    end_date?: string | null;
    job_description: string;
    is_current: number;
  }

  export default function PengalamanSection() {
    const [pengalaman, setPengalaman] = useState<Pengalaman[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState<Pengalaman | null>(null);

    const getToken = () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
      }
      return null;
    };

    const fetchPengalaman = async () => {
      setIsLoading(true);
      setError("");

      try {
        const token = getToken();
        if (!token) {
          setError("Token tidak ditemukan. Silakan login kembali.");
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal memuat data pengalaman kerja");
        }

        const result = await response.json();
        const transformed: Pengalaman[] =
          result.data?.work_experiences?.map((exp: ApiWorkExperience) => ({
            id: exp.id,
            posisi: exp.position,
            perusahaan: exp.company_name,
            tahunMasuk: exp.start_date
              ? new Date(exp.start_date).getFullYear().toString()
              : "",
            tahunKeluar: exp.is_current
              ? ""
              : exp.end_date
              ? new Date(exp.end_date).getFullYear().toString()
              : "",
            deskripsi: exp.job_description,
            isCurrentJob: Boolean(exp.is_current),
          })) || [];

        setPengalaman(transformed);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchPengalaman();
    }, []);

    const handleAdd = () => {
      setEditData(null);
      setIsFormOpen(true);
    };

    const handleEdit = (item: Pengalaman) => {
      setEditData(item);
      setIsFormOpen(true);
    };

    const handleCancel = () => {
      setIsFormOpen(false);
      setEditData(null);
    };

    const handleSave = (values: Pengalaman) => {
      // Update state setelah save
      if (editData) {
        setPengalaman((prev) =>
          prev.map((p) => (p.id === values.id ? values : p))
        );
      } else {
        setPengalaman((prev) => [...prev, values]);
      }
      setIsFormOpen(false);
      setEditData(null);
    };

    const handleDelete = (id: string | number) => {
      setPengalaman((prev) => prev.filter((p) => p.id !== id));
    };

    return (
      <div className="p-4 bg-white rounded shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-800">
            Pengalaman Kerja
          </h2>
          <button
            onClick={handleAdd}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Tambah
          </button>
        </div>

        {isLoading && <p className="text-sm text-gray-500">Memuat data...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!isLoading && pengalaman.length === 0 && (
          <p className="text-sm text-gray-500">
            Belum ada pengalaman kerja. Klik &apos;Tambah Pengalaman&apos; untuk
            menambahkan.
          </p>
        )}

        <div className="space-y-3">
          {pengalaman.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded p-3 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.posisi}
                  </h3>
                  <p className="text-xs text-gray-600">{item.perusahaan}</p>
                  <p className="text-xs text-gray-500">
                    {item.tahunMasuk} -{" "}
                    {item.isCurrentJob ? "Sekarang" : item.tahunKeluar}
                  </p>
                  <p className="text-xs text-gray-700 mt-1">{item.deskripsi}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isFormOpen && (
          <PengalamanForm
            mode={editData ? "edit" : "add"}
            data={editData || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        )}
      </div>
    );
  }
