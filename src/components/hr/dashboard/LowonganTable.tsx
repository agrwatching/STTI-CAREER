export default function LowonganTable() {
  return (
    <div className="max-h-full bg-white shadow rounded-lg flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3">Posisi</th>
              <th className="px-6 py-3">Total Pelamar</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="px-6 py-3">Frontend Developer</td>
                <td className="px-6 py-3">200</td>
                <td className="px-6 py-3">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    Aktif
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
