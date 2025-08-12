import Image from "next/image";
import Link from "next/link";

type Article = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  img: string;
};

const ARTICLES: Article[] = [
  {
    title: "Almeria thắng Al Nassr: Điểm nhấn chiến thuật",
    excerpt: "Phân tích cách Almeria khóa chặt tuyến giữa và khai thác khoảng trống sau lưng hàng thủ.",
    slug: "almeria-thang-al-nassr-diem-nhan-chien-thuat",
    category: "Bóng đá",
    date: "11/08/2025",
    img: "https://ext.same-assets.com/63664259/4273815952.jpeg",
  },
  {
    title: "Chuyển nhượng: Những thương vụ đáng chú ý tuần qua",
    excerpt: "Cập nhật các thương vụ nổi bật tại châu Âu và Nam Mỹ trong tuần.",
    slug: "chuyen-nhuong-dang-chu-y-tuan-qua",
    category: "Chuyển nhượng",
    date: "10/08/2025",
    img: "https://ext.same-assets.com/63664259/3696036531.jpeg",
  },
  {
    title: "Nhận định trước trận: Dortmund vs Juventus",
    excerpt: "Các thông số nổi bật trước giờ bóng lăn và dự đoán tỷ số.",
    slug: "nhan-dinh-dortmund-vs-juventus",
    category: "Nhận định",
    date: "10/08/2025",
    img: "https://ext.same-assets.com/63664259/698599693.jpeg",
  },
  {
    title: "Esports: Meta mới và xu hướng pick/ban",
    excerpt: "Tổng hợp meta mới và các thay đổi chiến thuật trong tuần.",
    slug: "esports-meta-moi-xu-huong-pick-ban",
    category: "Esports",
    date: "09/08/2025",
    img: "https://ext.same-assets.com/63664259/1822436025.jpeg",
  },
];

const CATS = ["Tất cả", "Bóng đá", "Chuyển nhượng", "Nhận định", "Esports"];

export default function NewsListPage() {
  return (
    <>
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tin tức</h1>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">Cập nhật tin nóng, phân tích và nhận định mới nhất.</p>
        </div>
      </section>

      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-3">
          <div className="flex flex-wrap items-center gap-2">
            {CATS.map((c, i) => (
              <button key={c} className={`rounded-full px-4 py-1.5 text-sm transition-colors ${i === 0 ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <article key={a.slug} className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition hover:shadow-md">
              <Link href={`/tin-tuc/${a.slug}`} className="relative block aspect-[16/10] bg-white dark:bg-gray-700">
                <Image src={a.img} alt={a.title} fill className="object-cover" />
              </Link>
              <div className="p-4">
                <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">{a.category} • {a.date}</div>
                <Link href={`/tin-tuc/${a.slug}`} className="line-clamp-2 text-base font-semibold text-gray-900 dark:text-white hover:underline">{a.title}</Link>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{a.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
        {/* Pagination mock */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors">Trước</button>
          <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">1</button>
          <button className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors">2</button>
          <button className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors">Sau</button>
        </div>
      </section>
    </>
  );
}
