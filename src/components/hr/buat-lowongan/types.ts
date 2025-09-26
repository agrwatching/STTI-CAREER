import React from "react";

// ENUMS
export type WorkType = "Remote" | "On-site" | "Hybrid";
export type WorkTime =
  | "full_time"
  | "part_time"
  | "freelance"
  | "internship"
  | "contract"
  | "volunteer"
  | "seasonal";

// Data asli dari backend
export interface JobApiResponse {
  id: number;
  job_title: string;
  job_description: string;
  qualifications: string;
  salary_min: number | null;
  salary_max: number | null;
  location: string;
  type: WorkType;
  verification_status: "pending" | "verified" | "rejected";
  is_active?: number;
  company_id?: number | null;
  category_id?: number | null;
  created_at?: string;
  updated_at?: string;
  logo?: string;
  work_type: "on_site" | "remote" | "hybrid" | "field";
  work_time: WorkTime;
}

// Data hasil mapping → untuk UI
export interface JobType extends JobApiResponse {
  title: string;
  description: string;
  requirements: string;  // alias dari qualifications
  salary_range: string;  // dari salary_min & salary_max
  statusLabel: string;
  statusColor: string;
  icon: React.ReactNode;
}

// Data untuk form (create/update)
export interface JobFormValues {
  job_title: string;
  job_description: string;
  qualifications: string;
  location: string;
  type: WorkType;  // UI friendly
  work_type: "on_site" | "remote" | "hybrid" | "field"; // backend
  work_time: WorkTime;
  salary_min: number | null;
  salary_max: number | null;
  logo?: string;
}
