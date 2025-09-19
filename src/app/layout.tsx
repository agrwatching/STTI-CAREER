// src/app/layout.tsx
import "@/app/globals.css";

export const metadata = {
  title: "STTI CAREERS",
  description: "Portal Karir STTI",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
