import Header from "@/components/pelamar/Header";
import LamaranSaya from "@/components/pelamar/lamaran/LamaranSaya";

export default function HalamanLamaranSaya() {
  return (
    <div>
      <Header
        title="Lamaran Saya"
        name="Muhammad Rizal"
        role="Pelamar"
      />

      <div className="mt-4">
        <LamaranSaya />
      </div>
    </div>
  );
}
