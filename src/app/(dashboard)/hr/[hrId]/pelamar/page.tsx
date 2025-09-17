import PelamarTable from "@/components/hr/pelamar/PelamarTable";

export default function PelamarPage() {
  const pelamars = [
    {
      id: 1,
      nama: "Moh Rizal",
      tanggal: "23-08-2023",
      cv: "/cv/moh-rizal.pdf",
      posisi: "Webdev",
    },
    {
      id: 2,
      nama: "Sutoto",
      tanggal: "23-08-2023",
      cv: "/cv/sutoto.pdf",
      posisi: "Marketing",
    },
    {
      id: 3,
      nama: "Sididid",
      tanggal: "23-08-2023",
      cv: "/cv/sididid.pdf",
      posisi: "Frontend",
    },
    {
      id: 4,
      nama: "Moh Rizal",
      tanggal: "23-08-2023",
      cv: "/cv/moh-rizal.pdf",
      posisi: "Webdev",
    },
    {
      id: 5,
      nama: "Sutoto",
      tanggal: "23-08-2023",
      cv: "/cv/sutoto.pdf",
      posisi: "Marketing",
    },
    {
      id: 6,
      nama: "Sididid",
      tanggal: "23-08-2023",
      cv: "/cv/sididid.pdf",
      posisi: "Frontend",
    },
    {
      id: 7,
      nama: "Sididid",
      tanggal: "23-08-2023",
      cv: "/cv/sididid.pdf",
      posisi: "Frontend",
    },
    {
      id: 8,
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
