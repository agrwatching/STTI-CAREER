// src/app/(auth)/login/layout.tsx
import "@/app/globals.css";
import Script from "next/script";

export const metadata = {
  title: "Rules - STTI CAREERS",
  description: "Website resmi STTI CAREERS",
  icons: {
    icon: "/logo-stti.png",
  },
};
export default function PublicLayout({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen">{children}</main>
    </>
  );
}