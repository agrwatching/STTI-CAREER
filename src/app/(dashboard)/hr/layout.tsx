import "@/app/globals.css";
import SidebarHR from "@/components/hr/SidebarHR";

export const metadata = {
  title: "STTI CAREERS",
  description: "Website resmi STTI CAREERS",
  icons: {
    icon: "/logo-stti.png",
  },
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <SidebarHR />
        <main className="flex-1 bg-gray-50 min-h-screen ">{children}</main>
      </body>
    </html>
  );
}
