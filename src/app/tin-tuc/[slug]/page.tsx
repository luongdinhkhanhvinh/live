import Image from "next/image";
import Link from "next/link";

const MAP: Record<string, { title: string; date: string; img: string; content: string[] }> = {
  "almeria-thang-al-nassr-diem-nhan-chien-thuat": {
    title: "Almeria thắng Al Nassr: Điểm nhấn chiến thuật",
    date: "11/08/2025",
    img: "https://ext.same-assets.com/63664259/4273815952.jpeg",
    content: [
      "Almeria đã chủ động pressing tầm cao và chia cắt các tuyến của Al Nassr.",
      "Sơ đồ chuyển hóa linh hoạt giữa 4-2-3-1 và 4-4-2 giúp kiểm soát trung tuyến.",
      "Bàn thắng đến từ một pha phản công nhanh ở hành lang cánh phải.",
    ],
  },
  "chuyen-nhuong-dang-chu-y-tuan-qua": {
    title: "Chuyển nhượng: Những thương vụ đáng chú ý tuần qua",
    date: "10/08/2025",
    img: "https://ext.same-assets.com/63664259/3696036531.jpeg",
    content: [
      "Nhiều CLB tăng tốc hoàn tất tân binh trước khi mùa giải khởi tranh.",
      "Các thương vụ lớn tập trung tại Premier League và Serie A.",
      "Giá trị chuyển nhượng trung bình tăng do cạnh tranh khốc liệt.",
    ],
  },
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const data = MAP[params.slug];
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-zinc-900 dark:text-white">
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/tin-tuc" className="text-sm font-semibold hover:underline">Tin tức</Link>
        </div>
      </header>

      <section className="border-b border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-3xl font-bold leading-snug">{data ? data.title : "Tin tức"}</h1>
          <div className="mt-2 text-sm text-zinc-600 dark:text-gray-400">{data?.date}</div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-6">
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-zinc-200 dark:border-gray-700 bg-zinc-50 dark:bg-gray-700">
          {data && <Image src={data.img} alt={data.title} fill className="object-cover" />}
        </div>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {data ? (
            <>
              {data.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <h3>Nhận định</h3>
              <p>Almeria cho thấy sự tiến bộ trong tổ chức pressing và chuyển trạng thái. Nếu duy trì phong độ, họ sẽ còn gây bất ngờ.</p>
            </>
          ) : (
            <p>Không tìm thấy bài viết.</p>
          )}
        </div>
      </article>

      <section className="mx-auto max-w-4xl px-4 pb-10">
        <div className="text-sm font-semibold text-zinc-900 dark:text-white">Bài viết liên quan</div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(MAP)
            .filter(([slug]) => slug !== params.slug)
            .map(([slug, a]) => (
              <Link key={slug} href={`/tin-tuc/${slug}`} className="overflow-hidden rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-zinc-50 dark:hover:bg-gray-700">
                <div className="relative aspect-[16/9] bg-zinc-50 dark:bg-gray-700">
                  <Image src={a.img} alt={a.title} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">{a.title}</div>
                  <div className="text-xs text-zinc-600 dark:text-gray-400">{a.date}</div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-zinc-600 dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/ban-quyen" className="hover:text-zinc-900 dark:hover:text-white">Bản quyền</Link>
            <Link href="/chinh-sach-bao-mat" className="hover:text-zinc-900 dark:hover:text-white">Chính sách bảo mật</Link>
            <Link href="/ve-chung-toi" className="hover:text-zinc-900 dark:hover:text-white">Về chúng tôi</Link>
            <Link href="/lien-he" className="hover:text-zinc-900 dark:hover:text-white">Liên hệ</Link>
          </div>
          <p className="mt-4">Copyright © 2025 NgoaiHang TV - All rights reserved.</p>
        </div>
      </footer>
   
    </main>
  );
}
