import PelamarLayoutClient from "./PelamarLayoutClient";
import "@/app/globals.css";

export const metadata = {
  title: "STTI CAREERS - Pelamar",
  description: "Dashboard Pelamar STTI CAREERS",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PelamarLayoutClient>{children}</PelamarLayoutClient>;
}
