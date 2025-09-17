"use client";

import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

interface Pelamar {
  id: number;
  nama: string;
  tanggal: string;
  cv: string;
  posisi: string;
}

interface PelamarTableProps {
  pelamars: Pelamar[];
}

export default function PelamarTable({ pelamars }: PelamarTableProps) {
  const router = useRouter();
  const [hrId, setHrId] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setHrId(parsed.id); // asumsinya `user.id` = hrId
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Pelamar</h1>
      <div className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto max-h-[28rem]">
          <table className="w-full text-left">
            <thead className="bg-gray-300 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Tanggal Melamar</th>
                <th className="px-6 py-3">CV</th>
                <th className="px-6 py-3 text-center">Aksi</th>
                <th className="px-6 py-3">Posisi</th>
              </tr>
            </thead>
            <tbody>
              {pelamars.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-6 py-3">{p.nama}</td>
                  <td className="px-6 py-3">{p.tanggal}</td>
                  <td className="px-6 py-3">
                    <a href={p.cv} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Unduh CV
                    </a>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => {
                          if (hrId) {
                            router.push(`/hr/${hrId}/pelamar/${p.id}`);
                          } else {
                            alert("HR ID belum ditemukan!");
                          }
                        }}
                      >
                        Lihat
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">{p.posisi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
