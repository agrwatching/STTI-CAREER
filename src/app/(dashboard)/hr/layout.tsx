// src/app/(dashboard)/hr/layout.tsx
import { Toaster } from "react-hot-toast";
import HRLayoutClient from "./HRLayoutClient";
import "@/app/globals.css";

export const metadata = {
  title: "STTI CAREERS - HR",
  description: "Dashboard HR STTI CAREERS",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HRLayoutClient>
          {children}
          <Toaster />
        </HRLayoutClient>
      </body>
    </html>
  );
}
