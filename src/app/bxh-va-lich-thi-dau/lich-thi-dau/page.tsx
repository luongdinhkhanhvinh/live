import Image from "next/image";
import Link from "next/link";

function formatDateLabel(date: Date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

function getDaysRange(center = new Date()) {
  const days: { date: Date; label: string; sub: string }[] = [];
  const weekdays = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  for (let i = -1; i <= 5; i++) {
    const dt = new Date(center);
    dt.setDate(center.getDate() + i);
    const label = String(dt.getDate());
    let sub = "";
    const today = new Date();
    const isToday = dt.toDateString() === today.toDateString();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow = dt.toDateString() === tomorrow.toDateString();
    if (isToday) sub = "Hôm nay";
    else if (isTomorrow) sub = "Ngày mai";
    else sub = weekdays[dt.getDay()];
    days.push({ date: dt, label, sub });
  }
  return days;
}

export default async function FixturesPage({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const ngayParam = typeof params["ngay"] === "string" ? (params["ngay"] as string) : undefined;
  let selectedDate: Date;
  if (!ngayParam) selectedDate = new Date();
  else {
    const [d, m, y] = ngayParam.split("-").map((v) => parseInt(v, 10));
    selectedDate = new Date(y, m - 1, d);
  }
  const days = getDaysRange(selectedDate);

  const groups = [
    {
      league: "English Football League Championship",
      matches: [
        { time: "15:30", home: "Leicester City", away: "Sheffield Wednesday", href: "/truc-tiep/leicester-city-vs-sheffield-wednesday/giang-a-mui/xx", live: false },
      ],
    },
    {
      league: "Turkish Super League",
      matches: [
        { time: "16:00", home: "Caykur Rizespor", away: "Goztepe", href: "/truc-tiep/caykur-rizespor-vs-goztepe/giang-a-chon/xx", live: true },
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lịch thi đấu</h1>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">Xem lịch thi đấu các giải đấu và trận đấu sắp diễn ra.</p>
        </div>
      </section>

      {/* Tabs sub */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-3">
          <div className="flex items-center gap-2">
            <Link href="/bxh-va-lich-thi-dau/lich-thi-dau" className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white">Lịch thi đấu</Link>
            <Link href="/bxh-va-lich-thi-dau/bxh" className="rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">BXH</Link>
          </div>
        </div>
      </section>

      {/* Date scroller */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-3">
          <div className="flex gap-2 overflow-x-auto">
            {days.map(({ date, label, sub }) => {
              const dstr = formatDateLabel(date);
              const active = dstr === formatDateLabel(selectedDate);
              return (
                <Link key={dstr} href={`?ngay=${dstr}`} className={`flex min-w-[84px] flex-col items-center justify-center rounded-lg border px-3 py-2 transition-colors ${active ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"}`}>
                  <span className="text-base font-semibold leading-none text-gray-900 dark:text-white">{label}</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">{sub}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Matches */}
      <section className="py-6">
        {groups.map((g) => (
          <div key={g.league} className="mb-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{g.league}</div>
            <div className="divide-y divide-gray-100 dark:divide-gray-600">
              {g.matches.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{m.time}</div>
                    <div className="text-gray-900 dark:text-white">
                      <span className="font-medium">{m.home}</span>
                      <span className="mx-2 text-gray-400 dark:text-gray-500">vs</span>
                      <span className="font-medium">{m.away}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.live && (
                      <span className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">Trực tiếp</span>
                    )}
                    <Link href={m.href} className="rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 transition-colors">Xem</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
