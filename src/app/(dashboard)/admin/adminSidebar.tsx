"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";

const SidebarAdmin = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: FileText,
      label: "Job Posts",
      href: "/admin/job",
    },
    {
      icon: Users,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: BarChart3,
      label: "Statistics",
      href: "/admin/statistics",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/admin/notifications",
    },
  ];

  return (
    <div className="w-64 h-screen bg-slate-800 text-white flex flex-col">
      {/* Header/Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          {/* Logo - using a circular badge design */}
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
            </div>
          </div>
          <span className="text-lg font-semibold tracking-wide">
            STTICAREER
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-slate-700 ${
                    isActive
                      ? "bg-slate-700 border-r-3 border-orange-500 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <IconComponent
                    size={20}
                    className={isActive ? "text-white" : "text-slate-400"}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
