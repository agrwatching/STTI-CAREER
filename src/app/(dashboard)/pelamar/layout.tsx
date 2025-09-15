import Sidebar from "@/components/pelamar/profile/Sidebar";
import "@/app/globals.css";

export const metadata = {
  title: "Dashboard Pelamar",
  description: "Portal Karir STTI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="flex bg-gray-100  h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
