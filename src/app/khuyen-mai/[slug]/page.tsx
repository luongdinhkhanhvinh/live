import Link from "next/link";
import Image from "next/image";

const PROMOS: Record<string, { title: string; badge: string; img: string; content: string[] }> = {
  "bao-hiem-100-nap-lan-dau-1888k": {
    title: "Bảo hiểm 100% nạp lần đầu lên tới 1.888K",
    badge: "HOT",
    img: "https://ext.same-assets.com/63664259/1602548579.png",
    content: [
      "Áp dụng cho thành viên đăng ký mới và thực hiện nạp tiền lần đầu.",
      "Mức hoàn bảo hiểm theo tỷ lệ và trần quy định trong chương trình.",
      "Tiền thưởng/hoàn sẽ được cộng vào ví trong vòng 24h sau khi hợp lệ.",
    ],
  },
  "hoan-tra-the-thao-moi-ngay": {
    title: "Hoàn trả thể thao mỗi ngày",
    badge: "NEW",
    img: "https://ext.same-assets.com/63664259/3556008174.png",
    content: [
      "Hoàn trả theo tỷ lệ cố định dựa trên tổng cược hợp lệ mỗi ngày.",
      "Tự động cộng vào ví vào ngày hôm sau.",
      "Không giới hạn mức hoàn tối đa.",
    ],
  },
  "thuong-nap-lai-cuoi-tuan": {
    title: "Thưởng nạp lại cuối tuần",
    badge: "WEEKEND",
    img: "https://ext.same-assets.com/63664259/3956261281.png",
    content: [
      "Áp dụng vào Thứ 6 - Chủ nhật hằng tuần.",
      "Tỉ lệ thưởng 20% tối đa 500K cho lần nạp lại.",
      "Mỗi tài khoản áp dụng một lần/tuần.",
    ],
  },
  "qua-tang-thanh-vien-vip": {
    title: "Quà tặng thành viên VIP",
    badge: "VIP",
    img: "https://ext.same-assets.com/63664259/3972046347.png",
    content: [
      "Quà tặng theo cấp độ VIP, nâng hạng nhận quà lớn hơn.",
      "Áp dụng cho thành viên đạt yêu cầu doanh thu/thời gian.",
      "Quyền lợi có thể thay đổi theo chính sách từng thời kỳ.",
    ],
  },
  "vong-quay-may-man-hang-ngay": {
    title: "Vòng quay may mắn hằng ngày",
    badge: "LUCKY",
    img: "https://ext.same-assets.com/63664259/1987532308.png",
    content: [
      "Đăng nhập mỗi ngày để nhận lượt quay.",
      "Cơ hội trúng thưởng quà tặng/tiền thưởng.",
      "Phần thưởng có hiệu lực trong thời hạn quy định.",
    ],
  },
  "hoan-thua-esports-cuoi-tuan": {
    title: "Hoàn thua tuần cho Esports",
    badge: "ESPORTS",
    img: "https://ext.same-assets.com/63664259/3332712155.png",
    content: [
      "Tổng kết hoàn thua vào cuối tuần theo tỷ lệ ưu đãi.",
      "Áp dụng cho các kèo Esports hợp lệ.",
      "Cộng hoàn vào ví trong vòng 24h.",
    ],
  },
};

export default function PromoDetail({ params }: { params: { slug: string } }) {
  const data = PROMOS[params.slug];
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-zinc-900 dark:text-white">
      <section className="border-b border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-gray-400">
            <Link href="/khuyen-mai" className="hover:underline">Khuyến mãi</Link>
            <span>/</span>
            <span>{data ? data.title : "Khuyến mãi"}</span>
          </div>
          <h1 className="text-2xl font-bold">{data ? data.title : "Khuyến mãi"}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-zinc-200 dark:border-gray-700 bg-zinc-50 dark:bg-gray-700">
              {data && <Image src={data.img} alt="promo" fill className="object-contain p-8" />}
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm text-zinc-700 dark:text-gray-300">
              {data ? (
                <ul className="list-disc space-y-2 pl-5">
                  {data.content.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              ) : (
                <p>Không tìm thấy nội dung khuyến mãi.</p>
              )}
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-20 space-y-4">
              <div className="rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
                <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Thông tin</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="rounded bg-black px-2 py-1 text-[11px] font-semibold text-white">{data?.badge ?? "PROMO"}</span>
                  <span className="text-zinc-700 dark:text-gray-300">Ưu đãi đang diễn ra</span>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
                <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Tham gia ngay</div>
                <button className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">Nhận ưu đãi</button>
              </div>
            </div>
          </aside>
        </div>
      </section>

    </main>
  );
}
