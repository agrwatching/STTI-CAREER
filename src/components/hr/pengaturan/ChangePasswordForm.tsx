"use client";

export default function ChangePasswordForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password diubah");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg shadow-sm p-3 text-sm"
    >
      <h2 className="text-sm font-semibold mb-3">Ubah Kata Sandi</h2>

      <div className="grid grid-cols-2 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium mb-1">
            Kata Sandi Saat Ini
          </label>
          <input
            type="password"
            className="border rounded px-2 py-1.5 w-full text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">
            Konfirmasi Kata Sandi Baru
          </label>
          <input
            type="password"
            className="border rounded px-2 py-1.5 w-full text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">
            Kata Sandi Baru
          </label>
          <input
            type="password"
            className="border rounded px-2 py-1.5 w-full text-xs"
          />
        </div>
        <div className="flex justify-end items-end">
          <button
            type="submit"
            className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs w-32"
          >
            Ubah Kata Sandi
          </button>
        </div>
      </div>
    </form>
  );
}