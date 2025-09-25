// Semua field sama dengan yang sudah kamu pakai di state
export type Pengalaman = {
  id?: string | number;
  posisi: string;
  perusahaan: string;
  tahunMasuk: number | string;
  tahunKeluar: number | string;
  deskripsi: string;
  isCurrent: boolean;
};
