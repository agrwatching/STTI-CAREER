// src/app/(dashboard)/pelamar/layout.tsx
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
  return (
    <html lang="en">
      <body>
        <PelamarLayoutClient>{children}</PelamarLayoutClient>
      </body>
    </html>
  );
}
