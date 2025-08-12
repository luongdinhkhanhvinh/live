"use client";

import Link from "next/link";
import { useState } from "react";

const JOBS: Record<string, { title: string; dept: string; type: string; location: string; desc: string[]; req: string[]; benefits: string[] }> = {
  "binh-luan-vien": {
    title: "Bình luận viên (BLV)",
    dept: "Nội dung",
    type: "Part-time/Remote",
    location: "Toàn quốc",
    desc: [
      "Tham gia bình luận trực tiếp các trận đấu theo lịch.",
      "Chuẩn bị kịch bản, thông tin đội hình và dữ kiện trước trận.",
      "Phối hợp team kỹ thuật để đảm bảo chất lượng livestream.",
    ],
    req: [
      "Có hiểu biết tốt về bóng đá, khả năng diễn đạt rõ ràng.",
      "Thiết bị mic/không gian thu tốt.",
      "Ưu tiên có kinh nghiệm BLV/Podcast/MC.",
    ],
    benefits: [
      "Thu nhập theo trận + thưởng hiệu suất.",
      "Linh hoạt thời gian, làm việc từ xa.",
      "Cơ hội lên sóng các trận hot.",
    ],
  },
  "cong-tac-vien-noi-dung": {
    title: "Cộng tác viên nội dung",
    dept: "Nội dung",
    type: "Part-time/Remote",
    location: "Toàn quốc",
    desc: ["Viết bài tin tức, nhận định trước/trong/sau trận.", "Biên tập nội dung cho mạng xã hội."],
    req: ["Khả năng viết tốt, am hiểu bóng đá.", "Biết dùng công cụ cơ bản (Docs, CMS)."],
    benefits: ["Thù lao theo bài.", "Linh hoạt thời gian."],
  },
  "video-editor": {
    title: "Video Editor",
    dept: "Sản xuất",
    type: "Full-time",
    location: "TP.HCM",
    desc: ["Dựng highlight, intro/outro, overlay.", "Làm việc với team sản xuất nội dung video."],
    req: ["Thành thạo Premiere/After Effects.", "Có showreel/portfolio."],
    benefits: ["Lương cạnh tranh.", "Bảo hiểm, nghỉ phép, thiết bị."],
  },
  "social-media-executive": {
    title: "Social Media Executive",
    dept: "Marketing",
    type: "Full-time",
    location: "Hà Nội",
    desc: ["Quản trị fanpage, group, lịch nội dung.", "Phối hợp KOL/BLV mở rộng tệp khán giả."],
    req: ["Kinh nghiệm quản trị social.", "Nắm bắt tốt trend thể thao."],
    benefits: ["Lương + thưởng KPI.", "Môi trường năng động."],
  },
  "frontend-developer": {
    title: "Frontend Developer",
    dept: "Kỹ thuật",
    type: "Remote",
    location: "Toàn quốc",
    desc: ["Phát triển UI/UX cho nền tảng web.", "Tối ưu hiệu năng và trải nghiệm."],
    req: ["Kinh nghiệm Next.js/React.", "Tailwind, TypeScript, hiểu biết PWA."],
    benefits: ["Remote 100%.", "Lương cạnh tranh."],
  },
};

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const data = JOBS[params.slug];
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-zinc-900 dark:text-white">
      <section className="border-b border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-3xl font-bold leading-snug">{data?.title ?? "Vị trí tuyển dụng"}</h1>
          <div className="mt-2 text-sm text-zinc-600 dark:text-gray-400">{data?.dept} • {data?.type} • {data?.location}</div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Mô tả công việc</div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-gray-300">
                {(data?.desc ?? ["Mô tả đang cập nhật."]).map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Yêu cầu</div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-gray-300">
                {(data?.req ?? ["Yêu cầu đang cập nhật."]).map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Quyền lợi</div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-gray-300">
                {(data?.benefits ?? ["Quyền lợi đang cập nhật."]).map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div id="apply" className="rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Ứng tuyển</div>
              {sent ? (
                <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-700 dark:text-green-400">Đã gửi thông tin (mock). Cảm ơn bạn!</div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 gap-3">
                    <input className="rounded-md border border-zinc-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-gray-400 outline-none focus:border-zinc-400 dark:focus:border-gray-500" placeholder="Họ và tên" required />
                    <input type="email" className="rounded-md border border-zinc-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-gray-400 outline-none focus:border-zinc-400 dark:focus:border-gray-500" placeholder="Email" required />
                    <input type="file" className="rounded-md border border-zinc-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-zinc-900 dark:text-white" />
                  </div>
                  <button className="w-full rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black hover:opacity-90" type="submit">Gửi hồ sơ</button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
