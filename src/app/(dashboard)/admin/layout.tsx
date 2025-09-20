import "@/app/globals.css";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
  title: "STTI CAREERS - Admin",
  description: "Dashboard Admin STTI CAREERS",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
