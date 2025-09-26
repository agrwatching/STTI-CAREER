//src/app/%28dashboard%29/hr/layout.tsx
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
  return <HRLayoutClient>{children}</HRLayoutClient>;
}
