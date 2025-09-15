"use client";

export default function Pendidikan() {
  return (
    <form className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Pilih Jenjang</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1"
          defaultValue="SMA"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Nama Institusi</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1"
          defaultValue="STTI SONY SUGEMA"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Jurusan</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1"
          defaultValue="Teknik Informatika"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Nilai/IPK</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1"
          defaultValue="4.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Tahun Masuk</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1"
          defaultValue="2022"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tahun Keluar</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1"
          defaultValue="2025"
        />
      </div>
    </form>
  );
}
