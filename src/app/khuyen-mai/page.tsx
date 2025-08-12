import Image from "next/image";
import Link from "next/link";

export default function PromotionsPage() {
  const promos = [
    {
      title: "Bảo hiểm 100% nạp lần đầu lên tới 1.888K",
      desc: "Ưu đãi dành riêng cho thành viên mới. Nạp lần đầu nhận hoàn bảo hiểm theo tỷ lệ quy định.",
      badge: "HOT",
      img: "https://ext.same-assets.com/63664259/1602548579.png",
      slug: "bao-hiem-100-nap-lan-dau-1888k",
    },
    {
      title: "Hoàn trả thể thao mỗi ngày",
      desc: "Cược thể thao nhận hoàn trả lên đến 1.5% không giới hạn, cộng tự động vào ví.",
      badge: "NEW",
      img: "https://ext.same-assets.com/63664259/3556008174.png",
      slug: "hoan-tra-the-thao-moi-ngay",
    },
    {
      title: "Thưởng nạp lại cuối tuần",
      desc: "Cuối tuần nạp lại nhận thêm thưởng 20% tối đa 500K.",
      badge: "WEEKEND",
      img: "https://ext.same-assets.com/63664259/3956261281.png",
      slug: "thuong-nap-lai-cuoi-tuan",
    },
    {
      title: "Quà tặng thành viên VIP",
      desc: "Đặc quyền quà tặng theo cấp bậc VIP, nâng hạng nhận quà lớn.",
      badge: "VIP",
      img: "https://ext.same-assets.com/63664259/3972046347.png",
      slug: "qua-tang-thanh-vien-vip",
    },
    {
      title: "Vòng quay may mắn hằng ngày",
      desc: "Đăng nhập nhận lượt quay, cơ hội trúng thưởng lớn mỗi ngày.",
      badge: "LUCKY",
      img: "https://ext.same-assets.com/63664259/1987532308.png",
      slug: "vong-quay-may-man-hang-ngay",
    },
    {
      title: "Hoàn thua tuần cho Esports",
      desc: "Chơi Esports nhận hoàn thua cuối tuần theo tỷ lệ ưu đãi.",
      badge: "ESPORTS",
      img: "https://ext.same-assets.com/63664259/3332712155.png",
      slug: "hoan-thua-esports-cuoi-tuan",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Khuyến mãi nổi bật</h1>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">Tổng hợp các chương trình ưu đãi hấp dẫn dành cho thành viên. Điều khoản áp dụng theo từng khuyến mãi.</p>
        </div>
      </section>

      {/* Promo cards */}
      <section className="py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promos.map((p) => (
            <div key={p.title} className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm transition hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-red-500 px-2 py-1 text-[11px] font-semibold text-white">{p.badge}</span>
              </div>
              <Link href={`/khuyen-mai/${p.slug}`} className="relative mb-3 block aspect-[16/9] overflow-hidden rounded-xl bg-white dark:bg-gray-700">
                <Image src={p.img} alt="promo" fill className="object-contain p-6 transition group-hover:scale-[1.02]" />
              </Link>
              <Link href={`/khuyen-mai/${p.slug}`} className="text-base font-semibold text-gray-900 dark:text-white hover:underline">
                {p.title}
              </Link>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
              <div className="mt-3 flex gap-2">
                <Link href={`/khuyen-mai/${p.slug}`} className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition-colors">Chi tiết</Link>
                <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">Nhận ưu đãi</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
