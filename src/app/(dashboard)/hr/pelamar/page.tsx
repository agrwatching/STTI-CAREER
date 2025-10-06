"use client";

import { useEffect, useState } from "react";
import PelamarTable from "@/components/hr/pelamar/PelamarTable";

type JobApplicant = {
  id: number;
  nama: string;
  tanggal: string;
  cv: string;
  posisi: string;
};

type RawApplicant = {
  id: number;
  nama: string;
  tanggal: string;
  cv: string;
  posisi: string;
};

export default function PelamarPage() {
  const [pelamars, setPelamars] = useState<JobApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPelamars = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Terjadi kesalahan saat memuat data");
        }

        const resData = await res.json();
        const rawData: RawApplicant[] = resData.data;

        const transformedData: JobApplicant[] = rawData.map((item) => ({
          id: item.id,
          nama: item.nama,
          tanggal: new Date(item.tanggal).toLocaleDateString("id-ID"),
          cv: `${process.env.NEXT_PUBLIC_API_URL}/uploads/files/${item.cv}`,
          posisi: item.posisi,
        }));

        setPelamars(transformedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi error yang tidak diketahui");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPelamars();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PelamarTable pelamars={pelamars} />
    </div>
  );
}
