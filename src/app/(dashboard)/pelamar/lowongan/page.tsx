import Header from "@/components/pelamar/Header";
import LowonganTersimpan from "@/components/pelamar/lowongan/LowonganTersimpan";

export default function HalamanLowonganTersimpan() {
  return (
    <div className="">
      <Header
         title="Lamaran Saya"
        name="Muhammad Rizal"
        role="Pelamar"
      />

      {/* Tambahin jarak */}
      <div className="mt-4">
        <LowonganTersimpan />
      </div>
    </div>
  );
}
