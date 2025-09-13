import PelamarTable from "@/components/hr/pelamar/PelamarTable";

export default function PelamarPage() {
  const pelamars = [
    {
      nama: "Moh Rizal",
      tanggal: "23-08-2023",
      cv: "/cv/moh-rizal.pdf",
      posisi: "Webdev",
    },
    {
      nama: "Sutoto",
      tanggal: "23-08-2023",
      cv: "/cv/sutoto.pdf",
      posisi: "Marketing",
    },
    {
      nama: "Sididid",
      tanggal: "23-08-2023",
      cv: "/cv/sididid.pdf",
      posisi: "Frontend",
    },
    {
      nama: "Moh Rizal",
      tanggal: "23-08-2023",
      cv: "/cv/moh-rizal.pdf",
      posisi: "Webdev",
    },
    {
      nama: "Sutoto",
      tanggal: "23-08-2023",
      cv: "/cv/sutoto.pdf",
      posisi: "Marketing",
    },
    {
      nama: "Sididid",
      tanggal: "23-08-2023",
      cv: "/cv/sididid.pdf",
      posisi: "Frontend",
    },
    {
      nama: "Sididid",
      tanggal: "23-08-2023",
      cv: "/cv/sididid.pdf",
      posisi: "Frontend",
    },
    {
      nama: "Sididid",
      tanggal: "23-08-2023",
      cv: "/cv/sididid.pdf",
      posisi: "Frontend",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PelamarTable pelamars={pelamars} />
    </div>
  );
}
