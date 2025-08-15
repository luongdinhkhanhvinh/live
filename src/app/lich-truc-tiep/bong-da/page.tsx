import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatDateLabel(date: Date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

function getDaysRange(center = new Date()) {
  // 7-day strip: today ±3
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

function LiveChip({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors">
      <Image src="https://ext.same-assets.com/63664259/1602548579.png" alt="live" width={16} height={16} />
      <span>{label}</span>
    </Link>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  // read ?ngay=DD-MM-YYYY
  const params = await searchParams;
  const ngayParam = typeof params["ngay"] === "string" ? (params["ngay"] as string) : undefined;

  let selectedDate: Date;
  if (!ngayParam) {
    selectedDate = new Date();
  } else {
    const [d, m, y] = ngayParam.split("-").map((v) => parseInt(v, 10));
    if (!d || !m || !y) return notFound();
    selectedDate = new Date(y, m - 1, d);
  }

  const days = getDaysRange(selectedDate);

  // Mock schedule data similar to source structure
  const schedule = [
    {
      league: "Football Association Community Shield",
      time: "14:00 - " + formatDateLabel(selectedDate),
      home: "Crystal Palace",
      away: "Liverpool",
      streams: [
        { label: "L B (Giảng Phùng Tiến)", href: "/truc-tiep/crystal-palace-vs-liverpool/lu-bo-giang-phung-tien/23xmvkh63y17qg8" },
        { label: "Giảng A C", href: "/truc-tiep/crystal-palace-vs-liverpool/dk40nutc/23xmvkh63y17qg8" },
        { label: "Giảng A Cay", href: "/truc-tiep/crystal-palace-vs-liverpool/giang-a-cay/23xmvkh63y17qg8" },
        { label: "Giảng A Rùa", href: "/truc-tiep/crystal-palace-vs-liverpool/giang-a-rua/23xmvkh63y17qg8" },
        { label: "Giảng A Sếu", href: "/truc-tiep/crystal-palace-vs-liverpool/giang-a-seu/23xmvkh63y17qg8" },
        { label: "Giảng A K", href: "/truc-tiep/crystal-palace-vs-liverpool/vc202ddi/23xmvkh63y17qg8" },
      ],
    },
    {
      league: "Netherlands Eredivisie",
      time: "14:45 - " + formatDateLabel(selectedDate),
      home: "FC Utrecht",
      away: "Heracles Almelo",
      streams: [{ label: "Giảng A Ly", href: "/truc-tiep/fc-utrecht-vs-heracles-almelo/qws556oo/965mkyhk4z8jr1g" }],
    },
    {
      league: "Norwegian Eliteserien",
      time: "15:00 - " + formatDateLabel(selectedDate),
      home: "Bryne",
      away: "KFUM Oslo",
      streams: [{ label: "THẰNG A PHI", href: "/truc-tiep/bryne-vs-kfum-oslo/586ayjir/vjxm8ghl1p7xr6o" }],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lịch trực tiếp bóng đá</h1>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">Xem lịch thi đấu và các trận đấu trực tiếp hôm nay.</p>
        </div>
      </section>

      {/* Date selector */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark">
        <div className="py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {days.map((d) => {
              const isSelected = d.date.toDateString() === selectedDate.toDateString();
              const href = `?ngay=${formatDateLabel(d.date)}`;
              return (
                <Link
                  key={d.date.toISOString()}
                  href={href}
                  className={`flex min-w-fit flex-col items-center rounded-lg border px-3 py-2 text-center transition-colors ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <span className="text-sm font-medium">{d.label}</span>
                  <span className="text-xs">{d.sub}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-6">
        <div className="space-y-4">
          {schedule.map((match, i) => (
            <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">{match.league}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{match.time}</div>
              </div>
              <div className="mb-3 flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white">
                <span>{match.home}</span>
                <span className="text-gray-400 dark:text-gray-500">vs</span>
                <span>{match.away}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {match.streams.map((stream, j) => (
                  <LiveChip key={j} href={stream.href} label={stream.label} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
