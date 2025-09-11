// src/app/(public)/layout.tsx
import "@/app/globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "STTI CAREERS",
  description: "Website resmi STTI CAREERS",
  icons: {
    icon: "",
  },
};

export default function PublicLayout({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}