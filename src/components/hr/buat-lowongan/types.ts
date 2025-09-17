// src/components/hr/buat-lowongan/types.ts
import { ReactNode } from "react";

export interface JobType {
  status: string;
  statusColor: string;
  icon: ReactNode;
  title: string;
  desc: string;
  salary: string;
  location: string;
  logo: string;
  type: string; // "Remote" | "On-site" | "Hybrid"
}
