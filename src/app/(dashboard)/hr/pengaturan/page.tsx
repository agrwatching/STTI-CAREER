import CompanyProfileForm from "@/components/hr/pengaturan/CompanyProfileForm";
import ChangePasswordForm from "@/components/hr/pengaturan/ChangePasswordForm";

export default function PengaturanPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pengaturan</h1>

      <CompanyProfileForm />
      <ChangePasswordForm />
    </div>
  );
}
