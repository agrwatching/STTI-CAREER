import React from "react";

// Data mentah dari backend
export interface JobApiResponse {
  id: number;
  job_title: string;
  job_description: string;
  qualifications: string;
  salary_min: number | null;
  salary_max: number | null;
  location: string;
  type: "Remote" | "On-site" | "Hybrid";
  verification_status: "pending" | "approved" | "rejected";
  is_active?: number;
  company_id?: number | null;
  category_id?: number | null;
  created_at?: string;
  updated_at?: string;
  logo?: string;
}

// Data hasil mapping → siap dipakai di UI
export interface JobType extends JobApiResponse {
  title: string;         // alias dari job_title
  description: string;   // alias dari job_description
  requirements: string;  // alias dari qualifications
  salary_range: string;  // ex: "Rp 5.000.000 - Rp 7.000.000"
  statusLabel: string;   // ex: "Tunggu Verifikasi"
  statusColor: string;   // warna status
  icon: React.ReactNode; // icon status
}

// Data dari form
export interface JobFormValues {
  job_title: string;
  job_description: string;
  qualifications: string;
  location: string;
  type: "Remote" | "On-site" | "Hybrid";
  salary_min: number | null;
  salary_max: number | null;
  logo?: string;
}
