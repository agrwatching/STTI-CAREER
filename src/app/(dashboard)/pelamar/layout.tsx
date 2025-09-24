import "@/app/globals.css";
import PelamarLayoutClient from "./PelamarLayoutClient";

export const metadata = {
  title: "Dashboard Pelamar",
  description: "Portal Karir STTI",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PelamarLayoutClient>{children}</PelamarLayoutClient>;
}
