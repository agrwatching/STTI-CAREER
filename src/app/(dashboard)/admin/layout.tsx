import "@/app/globals.css";
import AdminLayoutClient from "./AdminLayoutClient";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "STTI CAREERS - Admin",
  description: "Dashboard Admin STTI CAREERS",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
        <AdminLayoutClient>
          {children}
          <Toaster />
        </AdminLayoutClient>
  );
}
