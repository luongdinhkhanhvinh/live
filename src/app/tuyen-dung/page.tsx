import Link from "next/link";

type Job = {
  title: string;
  slug: string;
  dept: string;
  type: string;
  location: string;
  date: string;
};

const JOBS: Job[] = [
  { title: "Bình luận viên (BLV)", slug: "binh-luan-vien", dept: "Nội dung", type: "Part-time/Remote", location: "Toàn quốc", date: "11/08/2025" },
  { title: "Cộng tác viên nội dung", slug: "cong-tac-vien-noi-dung", dept: "Nội dung", type: "Part-time/Remote", location: "Toàn quốc", date: "10/08/2025" },
  { title: "Video Editor", slug: "video-editor", dept: "Sản xuất", type: "Full-time", location: "TP.HCM", date: "10/08/2025" },
  { title: "Social Media Executive", slug: "social-media-executive", dept: "Marketing", type: "Full-time", location: "Hà Nội", date: "09/08/2025" },
  { title: "Frontend Developer", slug: "frontend-developer", dept: "Kỹ thuật", type: "Remote", location: "Toàn quốc", date: "08/08/2025" },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-zinc-900 dark:text-white">
      <section className="border-b border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-10">
          <h1 className="text-3xl font-bold">Gia nhập NgoaiHangTV</h1>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-gray-300">Cùng xây dựng nền tảng thể thao trực tuyến hấp dẫn nhất. Ứng tuyển vị trí phù hợp bên dưới.</p>
        </div>
      </section>

      {/* Filters (mock) */}
      <section className="border-b border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-4">
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-black dark:bg-white px-4 py-1.5 text-sm font-semibold text-white dark:text-black">Tất cả</button>
            <button className="rounded-full bg-zinc-100 dark:bg-gray-700 px-4 py-1.5 text-sm text-zinc-700 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-gray-600">Nội dung</button>
            <button className="rounded-full bg-zinc-100 dark:bg-gray-700 px-4 py-1.5 text-sm text-zinc-700 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-gray-600">Sản xuất</button>
            <button className="rounded-full bg-zinc-100 dark:bg-gray-700 px-4 py-1.5 text-sm text-zinc-700 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-gray-600">Marketing</button>
            <button className="rounded-full bg-zinc-100 dark:bg-gray-700 px-4 py-1.5 text-sm text-zinc-700 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-gray-600">Kỹ thuật</button>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {JOBS.map((j) => (
            <div key={j.slug} className="rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-zinc-900 dark:text-white">{j.title}</div>
                  <div className="text-sm text-zinc-600 dark:text-gray-400">{j.dept} • {j.type} • {j.location}</div>
                </div>
                <div className="text-xs text-zinc-500 dark:text-gray-500">{j.date}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/tuyen-dung/${j.slug}`} className="rounded-lg border border-zinc-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-zinc-800 dark:text-gray-200 hover:bg-zinc-50 dark:hover:bg-gray-600">Xem chi tiết</Link>
                <Link href={`/tuyen-dung/${j.slug}#apply`} className="rounded-lg bg-black dark:bg-white px-3 py-1.5 text-sm font-semibold text-white dark:text-black hover:opacity-90">Ứng tuyển</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
