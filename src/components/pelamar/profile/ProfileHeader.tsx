"use client";

type ProfileHeaderProps = {
  name: string;
  joined: string;
  avatarUrl?: string;
  onEdit?: () => void;
};

export default function ProfileHeader({
  name,
  joined,
  avatarUrl,
  onEdit,
}: ProfileHeaderProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex justify-between items-center mb-5">
      {/* Avatar + Info */}
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-base">
            {initial}
          </div>
        )}
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-gray-500 text-sm">Bergabung sejak {joined}</p>
        </div>
      </div>

      {/* Tombol Edit */}
      <button
        onClick={onEdit}
        className="flex items-center gap-2 bg-blue-600 text-white px-3.5 py-1.5 text-sm rounded-md hover:bg-blue-700"
      >
        ✏️ Edit Profil
      </button>
    </div>
  );
}
