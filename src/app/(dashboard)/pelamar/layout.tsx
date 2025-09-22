import Sidebar from "@/components/pelamar/Sidebar";
import "@/app/globals.css";

export const metadata = {
  title: "Dashboard Pelamar",
  description: "Portal Karir STTI",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        {/* Sidebar / Navbar */}
        <Sidebar />

        {/* Konten */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
