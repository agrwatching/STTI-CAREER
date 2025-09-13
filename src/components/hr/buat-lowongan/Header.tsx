"use client";

interface HeaderProps {
  onAddClick: () => void;
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 sticky top-0 bg-gray-50 z-10 pb-2">
      <h1 className="text-3xl font-bold">Buat Lowongan</h1>
      <button
        onClick={onAddClick}
        className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900"
      >
        + Lowongan
      </button>
    </div>
  );
}
