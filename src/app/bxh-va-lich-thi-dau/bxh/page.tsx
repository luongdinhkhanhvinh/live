import Link from "next/link";

export default function StandingsPage() {
  const groups = [
    {
      league: "Premier League",
      rows: [
        { pos: 1, team: "Manchester City", p: 38, w: 28, d: 6, l: 4, pts: 90 },
        { pos: 2, team: "Arsenal", p: 38, w: 27, d: 8, l: 3, pts: 89 },
        { pos: 3, team: "Liverpool", p: 38, w: 24, d: 10, l: 4, pts: 82 },
      ],
    },
    {
      league: "La Liga",
      rows: [
        { pos: 1, team: "Real Madrid", p: 38, w: 30, d: 6, l: 2, pts: 96 },
        { pos: 2, team: "Barcelona", p: 38, w: 27, d: 7, l: 4, pts: 88 },
        { pos: 3, team: "Atletico Madrid", p: 38, w: 24, d: 8, l: 6, pts: 80 },
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bảng xếp hạng</h1>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">Xem bảng xếp hạng các giải đấu hàng đầu thế giới.</p>
        </div>
      </section>

      <section className="py-6">
        {groups.map((g) => (
          <div key={g.league} className="mb-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{g.league}</div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Đội</th>
                    <th className="px-3 py-2">Tr</th>
                    <th className="px-3 py-2">Th</th>
                    <th className="px-3 py-2">H</th>
                    <th className="px-3 py-2">B</th>
                    <th className="px-3 py-2 text-right">Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r) => (
                    <tr key={r.pos} className="border-b border-gray-100 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 transition-colors">
                      <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{r.pos}</td>
                      <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">{r.team}</td>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{r.p}</td>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{r.w}</td>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{r.d}</td>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{r.l}</td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-900 dark:text-white">{r.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
