"use client";

type HeaderProps = {
  title: string;
  name: string;
  role: string;
  avatarUrl?: string;
};

export default function Header({ title, name, role, avatarUrl }: HeaderProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="flex justify-between items-center  ">
      {/* Kiri */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Kanan */}
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
            {initial}
          </div>
        )}

        <div className="text-left">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </header>
  );
}
