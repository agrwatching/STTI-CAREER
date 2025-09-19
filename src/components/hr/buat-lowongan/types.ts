// src/components/hr/buat-lowongan/types.ts
export interface JobType {
  id?: number; // optional, biasanya dari DB
  title: string;
  description: string;
  requirements: string;
  salary_range: string;
  location: string;
  type: string;
  logo: string;
  status?: string;       // dari backend (pending, accepted, rejected, dll)
  statusColor?: string;  // tambahan untuk UI
  icon?: React.ReactNode; // tambahan untuk UI
}