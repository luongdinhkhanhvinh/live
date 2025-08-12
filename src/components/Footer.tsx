"use client";

import Link from "next/link";
import Image from "next/image";
import { useScreenLock } from "./ScreenLockContext";

export default function Footer() {
  const { isScreenLocked } = useScreenLock();

  // Ẩn footer khi màn hình bị khóa
  if (isScreenLocked) {
    return null;
  }

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-[1600px] px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/ngoaihangtv.png" 
                alt="NgoaiHangTV Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              NgoaihangTV là nền tảng livestream các sự kiện thể thao, với mục tiêu trở thành nền tảng số hàng đầu khu vực trong lĩnh vực livestream. Chúng tôi quảng bá các hoạt động thể thao như một phần không thể thiếu trong các sự kiện giải trí, mang đến món ăn tinh thần đặc sắc cho các tín đồ yêu thể thao, đặc biệt là bộ môn bóng đá. Với phương châm đặt khách hàng làm trọng tâm, trải nghiệm của quý khách luôn là ưu tiên hàng đầu của đội ngũ phát triển NgoaihangTV. Chúng tôi không ngừng nỗ lực để mang đến dịch vụ livestream chất lượng, đáp ứng mọi nhu cầu của người xem. Để thực hiện điều này, NgoaihangTV liên tục nâng cấp hệ thống, đa dạng hóa các nguồn video và cung cấp chất lượng phát sóng cao nhất. Với đội ngũ Streamer và Bình luận viên chuyên nghiệp, NgoaihangTV cam kết mang đến cho khán giả những sự kiện thể thao hấp dẫn, mãn nhãn khắp châu lục với chất lượng phục vụ và độ phân giải tuyệt vời.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.05-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.23 0 3.949-2.399 3.949-5.986 0-3.134-2.252-5.327-5.466-5.327-3.723 0-5.906 2.776-5.906 5.64 0 1.046.397 2.173.893 2.782.098.119.112.224.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Trang chủ</Link></li>
              <li><Link href="/truc-tiep" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Trực tiếp</Link></li>
              <li><Link href="/lich-truc-tiep" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Lịch trực tiếp</Link></li>
              <li><Link href="/bxh-va-lich-thi-dau" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Bảng xếp hạng</Link></li>
              <li><Link href="/tin-tuc" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Tin tức</Link></li>
              <li><Link href="/khuyen-mai" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Khuyến mãi</Link></li>
            </ul>
          </div>

          {/* Sports Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thể thao</h3>
            <ul className="space-y-2">
              <li><Link href="/the-thao/bong-da" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Bóng đá</Link></li>
              <li><Link href="/the-thao/bong-ro" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Bóng rổ</Link></li>
              <li><Link href="/the-thao/bong-chuyen" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Bóng chuyền</Link></li>
              <li><Link href="/the-thao/tennis" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Tennis</Link></li>
              <li><Link href="/the-thao/esports" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Esports</Link></li>
              <li><Link href="/the-thao/talk-show" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Talk show</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hỗ trợ & Pháp lý</h3>
            <ul className="space-y-2">
              <li><Link href="/lien-he" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Liên hệ</Link></li>
              <li><Link href="/hoi-dap" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Hỏi đáp</Link></li>
              <li><Link href="/huong-dan" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Hướng dẫn</Link></li>
              <li><Link href="/dieu-khoan-dich-vu" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Điều khoản dịch vụ</Link></li>
              <li><Link href="/chinh-sach-bao-mat" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="/mien-tru-trach-nhiem" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Miễn trừ trách nhiệm</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 mb-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/ban-quyen" className="hover:text-blue-500 transition-colors">Bản quyền</Link>
            <Link href="/chinh-sach-bao-mat" className="hover:text-blue-500 transition-colors">Chính sách bảo mật</Link>
            <Link href="/ve-chung-toi" className="hover:text-blue-500 transition-colors">Về chúng tôi</Link>
            <Link href="/tuyen-dung" className="hover:text-blue-500 transition-colors">Tuyển dụng</Link>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Copyright © 2025 NgoaiHang TV - All rights reserved.</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <strong>Lưu ý:</strong> NgoaiHangTV không sở hữu hoặc phát sóng bất kỳ nội dung thể thao nào. 
            Chúng tôi chỉ cung cấp liên kết đến các nguồn phát sóng hợp pháp. 
            Vui lòng tuân thủ luật bản quyền của quốc gia bạn.
          </p>
        </div>
      </div>
    </footer>
  );
} 