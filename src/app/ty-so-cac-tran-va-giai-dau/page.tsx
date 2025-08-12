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

export default async function ScoresPage({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
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
      league: "Football Association Community Shield",
      matches: [
        { time: "14:00", home: "Crystal Palace", away: "Liverpool", score: "2 : 2", status: "FT", live: true, href: "/truc-tiep/crystal-palace-vs-liverpool/giang-a-k/xx" },
      ],
    },
    {
      league: "Netherlands Eredivisie",
      matches: [
        { time: "14:45", home: "FC Utrecht", away: "Heracles Almelo", score: "2 : 0", status: "FT", live: false, href: "/truc-tiep/fc-utrecht-vs-heracles-almelo/giang-a-ly/xx" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-zinc-900 dark:text-white">
      {/* Sports tabs */}
      <section className="border-b border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-3">
          <div className="flex flex-wrap items-center gap-2">
            {["Bóng đá", "Bóng rổ", "Bóng chuyền", "Talk show", "Esports"].map((s, i) => (
              <button key={s} className={`rounded-full px-4 py-1.5 text-sm ${i === 0 ? "bg-black dark:bg-white text-white dark:text-black" : "bg-zinc-100 dark:bg-gray-700 text-zinc-700 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-gray-600"}`}>{s}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Date scroller */}
      <section className="border-b border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-3">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {days.map(({ date, label, sub }) => {
              const dstr = formatDateLabel(date);
              const active = dstr === formatDateLabel(selectedDate);
              return (
                <Link key={dstr} href={`?ngay=${dstr}`} className={`flex min-w-[84px] flex-col items-center justify-center rounded-lg border px-3 py-2 ${active ? "border-black dark:border-white bg-zinc-50 dark:bg-gray-700" : "border-zinc-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-zinc-50 dark:hover:bg-gray-700"}`}>
                  <span className="text-base font-semibold leading-none text-zinc-900 dark:text-white">{label}</span>
                  <span className="text-[11px] text-zinc-500 dark:text-gray-400">{sub}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="py-6">
        {groups.map((g) => (
          <div key={g.league} className="mb-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-gray-600 px-4 py-3">
              <div className="flex items-center gap-2">
                <Image src="https://ext.same-assets.com/63664259/3956261281.png" alt="league" width={20} height={20} />
                <span className="text-sm font-semibold text-zinc-800 dark:text-white">{g.league}</span>
              </div>
              <span className="text-sm text-zinc-600 dark:text-gray-400">{formatDateLabel(selectedDate)}</span>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-gray-600">
              {g.matches.map((m, idx) => (
                <Link key={idx} href={m.href} className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-gray-700">
                  <span className="w-16 text-sm text-zinc-600 dark:text-gray-400">{m.time}</span>
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate text-zinc-800 dark:text-white">{m.home}</span>
                      <span className="text-zinc-400 dark:text-gray-500">vs</span>
                      <span className="truncate text-zinc-800 dark:text-white">{m.away}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-zinc-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-semibold text-zinc-700 dark:text-gray-300">{m.status}</span>
                      <span className="w-16 text-center text-sm font-semibold text-zinc-900 dark:text-white">{m.score}</span>
                      {m.live && (<span className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-900/20 px-2 py-0.5 text-[11px] font-semibold text-red-600 dark:text-red-400"><span className="h-1.5 w-1.5 rounded-full bg-red-600"/>LIVE</span>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}
