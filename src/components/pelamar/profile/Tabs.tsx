// Tabs.tsx
"use client";

type TabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = [
  { name: "Biodata", key: "biodata" },
  { name: "Pendidikan", key: "pendidikan" },
  { name: "Pengalaman", key: "pengalaman" },
  { name: "Sertifikat", key: "sertifikat" },
  { name: "Keterampilan", key: "keterampilan" },
];

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex gap-6 border-b mb-4 overflow-x-auto whitespace-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`pb-2 ${
            activeTab === tab.key
              ? "border-b-2 border-blue-600 font-medium text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
