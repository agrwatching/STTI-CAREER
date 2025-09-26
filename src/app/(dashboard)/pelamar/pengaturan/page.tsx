import Header from "@/components/pelamar/Header";
import ChangePassword from "@/components/pelamar/pengaturan/ChangePassword";

export default function SettingsPage() {
  return (
    <>
      {/* Header di luar box */}
      <Header
        title="Pengaturan"
        name="Muhammad Rizal"
        role="Pelamar"
      />

      {/* Konten dibungkus kotak */}
      <div className="min-h-[calc(100vh-100px)] rounded-xl bg-gray-50 mt-4">
        <div className="p-8">
          <ChangePassword />
        </div>
      </div>
    </>
  );
}
