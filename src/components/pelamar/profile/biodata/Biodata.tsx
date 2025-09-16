"use client";

export default function Biodata() {
  return (
    <form className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Nama Lengkap</label>
        <input
          type="text"
          defaultValue="Muhammad Rizal"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          defaultValue="rizal180204@gmail.com"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Nomor Telepon</label>
        <input
          type="text"
          defaultValue="085179718031"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Alamat</label>
        <input
          type="text"
          defaultValue="Kp sumur selang Ds Cimahi Kec Klari"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Kota</label>
        <input
          type="text"
          defaultValue="Karawang"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Negara</label>
        <input
          type="text"
          defaultValue="Indonesia"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Upload Foto</label>
        <input
          type="file"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
        />
      </div>
    </form>
  );
}
