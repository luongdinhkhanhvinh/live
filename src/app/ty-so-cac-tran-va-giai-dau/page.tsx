"use client";

import { useState, useEffect, use } from "react";
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

export default function ScoresPage({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = use(searchParams);
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Sports tabs with icons
  const tabs = [
    { label: "Bóng đá", icon: "/icon/bong-da.svg", iconActive: "/icon/bong-da-active.svg" },
    { label: "Bóng rổ", icon: "/icon/bong-ro.svg", iconActive: "/icon/bong-ro-active.svg" },
    { label: "Bóng chuyền", icon: "/icon/bong-chuyen.svg", iconActive: "/icon/bong-chuyen-active.svg" },
    { label: "Talk show", icon: "/icon/talk-show.svg", iconActive: "/icon/talk-show-active.svg" },
    { label: "Esports", icon: "/icon/esport.svg", iconActive: "/icon/esport-ative.svg" },
  ];

  // Use useEffect to avoid hydration mismatch
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [days, setDays] = useState<{ date: Date; label: string; sub: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    
    const ngayParam = typeof resolvedSearchParams["ngay"] === "string" ? resolvedSearchParams["ngay"] : undefined;
    let newSelectedDate: Date;
    if (!ngayParam) {
      newSelectedDate = new Date();
    } else {
      const [d, m, y] = ngayParam.split("-").map((v) => parseInt(v, 10));
      newSelectedDate = new Date(y, m - 1, d);
    }
    
    setSelectedDate(newSelectedDate);
    setDays(getDaysRange(newSelectedDate));
  }, [resolvedSearchParams]);

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

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <main className="min-h-screen bg-white dark:bg-custom-dark text-zinc-900 dark:text-custom-light">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-custom-dark text-zinc-900 dark:text-custom-light">
      {/* Sports tabs */}
      <section className="border-b border-zinc-200 dark:border-custom-dark-secondary bg-white dark:bg-custom-dark">
        <div className="py-3">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
                  activeTab === index
                    ? "bg-white dark:bg-custom-dark border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-700 dark:text-custom-muted hover:text-gray-900 dark:hover:text-custom-light"
                }`}
              >
                <Image
                  src={activeTab === index ? tab.iconActive : tab.icon}
                  alt={tab.label}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Date scroller */}
      <section className="border-b border-zinc-200 dark:border-custom-dark-secondary bg-white dark:bg-custom-dark">
        <div className="py-3">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {days.map(({ date, label, sub }) => {
              const dstr = formatDateLabel(date);
              const active = dstr === formatDateLabel(selectedDate);
              return (
                <Link key={dstr} href={`?ngay=${dstr}`} className={`flex min-w-[84px] flex-col items-center justify-center rounded-lg border px-3 py-2 ${active ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-zinc-200 dark:border-custom-dark-secondary bg-white dark:bg-custom-dark hover:bg-zinc-50 dark:hover:bg-custom-dark-secondary"}`}>
                  <span className="text-base font-semibold leading-none text-zinc-900 dark:text-custom-light">{label}</span>
                  <span className="text-[11px] text-zinc-500 dark:text-custom-subtle">{sub}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="py-6">
        {groups.map((g) => (
          <div key={g.league} className="mb-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-custom-dark-secondary bg-white dark:bg-custom-dark">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-custom-dark-secondary px-4 py-3">
              <div className="flex items-center gap-2">
                <Image src="https://ext.same-assets.com/63664259/3956261281.png" alt="league" width={20} height={20} />
                <span className="text-sm font-semibold text-zinc-800 dark:text-custom-light">{g.league}</span>
              </div>
              <span className="text-sm text-zinc-600 dark:text-custom-subtle">{formatDateLabel(selectedDate)}</span>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-custom-dark-secondary">
              {g.matches.map((m, idx) => (
                <Link key={idx} href={m.href} className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-custom-dark-secondary">
                  <span className="w-16 text-sm text-zinc-600 dark:text-custom-subtle">{m.time}</span>
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate text-zinc-800 dark:text-custom-light">{m.home}</span>
                      <span className="text-zinc-400 dark:text-custom-subtle">vs</span>
                      <span className="truncate text-zinc-800 dark:text-custom-light">{m.away}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-zinc-100 dark:bg-custom-dark-secondary px-2 py-0.5 text-xs font-semibold text-zinc-700 dark:text-custom-muted">{m.status}</span>
                      <span className="w-16 text-center text-sm font-semibold text-zinc-900 dark:text-custom-light">{m.score}</span>
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
