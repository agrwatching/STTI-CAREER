"use client";

import { useState, useEffect } from "react";
import { Pengalaman } from "./type";

type Props = {
  mode: "add" | "edit";
  data?: Pengalaman;
  onCancel: () => void;
  onSave: (values: Pengalaman) => void;        
};

export default function PengalamanForm({
  mode,
  data,
  onCancel,
  onSave,
}: Props) {
  const [posisi, setPosisi] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [tahunMasuk, setTahunMasuk] = useState("");
  const [tahunKeluar, setTahunKeluar] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  // Jika mode edit, isi state dengan data awal
  useEffect(() => {
    if (data) {
      setPosisi(data.posisi);
      setPerusahaan(data.perusahaan);
      setTahunMasuk(String(data.tahunMasuk));
      setTahunKeluar(String(data.tahunKeluar));
      setDeskripsi(data.deskripsi);
      setIsCurrent(data.isCurrent);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Pengalaman = {
      id: data?.id,
      posisi,
      perusahaan,
      tahunMasuk,
      tahunKeluar: isCurrent ? "Sekarang" : tahunKeluar,
      deskripsi,
      isCurrent,
    };

    onSave(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded p-3 bg-gray-50 space-y-2 text-xs"
    >
      <div>
        <label className="block font-medium mb-1">Posisi</label>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded"
          value={posisi}
          onChange={(e) => setPosisi(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Perusahaan</label>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded"
          value={perusahaan}
          onChange={(e) => setPerusahaan(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-medium mb-1">Tahun Masuk</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={tahunMasuk}
            onChange={(e) => setTahunMasuk(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Tahun Keluar</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={tahunKeluar}
            onChange={(e) => setTahunKeluar(e.target.value)}
            disabled={isCurrent}
            required={!isCurrent}
          />
        </div>
      </div>

      <div>
        <label className="inline-flex items-center gap-1">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
          />
          Masih bekerja di sini
        </label>
      </div>

      <div>
        <label className="block font-medium mb-1">Deskripsi</label>
        <textarea
          className="w-full border px-2 py-1 rounded min-h-[60px]"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {mode === "add" ? "Tambah" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
