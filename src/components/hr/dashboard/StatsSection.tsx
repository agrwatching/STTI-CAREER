import { Users, Hourglass, CheckCircle2 } from "lucide-react";
import StatsCard from "./StatsCard";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-1">
      <StatsCard
        icon={Users}
        title="Total Pelamar"
        value="1.500"
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
      />
      <StatsCard
        icon={Hourglass}
        title="Tahapan Seleksi"
        value="850"
        iconBg="bg-yellow-100"
        iconColor="text-yellow-500"
      />
      <StatsCard
        icon={CheckCircle2}
        title="Tahapan Lolos"
        value="400"
        iconBg="bg-green-100"
        iconColor="text-green-600"
      />
    </div>
  );
}
