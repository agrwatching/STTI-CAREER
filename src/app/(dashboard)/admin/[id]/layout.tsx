import "@/app/globals.css";
import SidebarAdmin from "@/app/(dashboard)/admin/adminSidebar";

export const metadata = {
  title: "STICAREER Admin",
  description: "Admin Dashboard STICAREER",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      <SidebarAdmin />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}
