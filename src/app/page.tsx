"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "@/components/common/VideoPlayer";
import MatchCard, { MatchData } from "@/components/common/MatchCard";

export default function HomePage() {
  // Use MatchData interface from MatchCard component
  type Match = MatchData;

  // Static data - moved outside component to avoid re-creation
  const tabs = [
    { label: "Bóng đá", icon: "/icon/bong-da.svg", iconActive: "/icon/bong-da-active.svg" },
    { label: "Bóng rổ", icon: "/icon/bong-ro.svg", iconActive: "/icon/bong-ro-active.svg" },
    { label: "Bóng chuyền", icon: "/icon/bong-chuyen.svg", iconActive: "/icon/bong-chuyen-active.svg" },
    { label: "Talk show", icon: "/icon/talk-show.svg", iconActive: "/icon/talk-show-active.svg" },
    { label: "Esports", icon: "/icon/esport.svg", iconActive: "/icon/esport-ative.svg" },
  ];

  // State for active tabs
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilterTab, setActiveFilterTab] = useState(0);

  // Filter tabs with icons
  const filterTabs = [
    { label: "Tất cả", icon: "", iconActive: "" },
    { label: "Trực tiếp", icon: "/icon/live.svg", iconActive: "/icon/live-active.svg" },
    { label: "Trận hot", icon: "/icon/hot.svg", iconActive: "/icon/hot-active.svg" },
    { label: "Hôm nay", icon: "/icon/calendar.svg", iconActive: "/icon/calendar-active.svg" },
    { label: "Ngày mai", icon: "/icon/calendar.svg", iconActive: "/icon/calendar-active.svg" },
  ];

  // Bottom menu items
  const bottomMenuItems = [
    { label: "Live", href: "/", icon: "/icon/live.svg", iconSize: "w-5 h-5" },
    { label: "Diễn Đàn", href: "/dien-dan", icon: "/icon/dien-bien.svg", iconSize: "w-6 h-6" },
    { label: "Chat", href: "/chat", icon: "/icon/chat.svg", iconSize: "w-6 h-6" },
    { label: "Khuyến Mãi", href: "/khuyen-mai", icon: "/icon/dien-bien.svg", iconSize: "w-6 h-6" },
  ];

  const matches: Match[] = [
    {
      competition: "International Club Fr...",
      home: "Barcelona",
      away: "Como",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Como_1907_logo.png",
      time: "02:00",
      date: "11/08/2025",
      status: "HT",
      score: "0-0",
      stats: ["HT 0-0", "P 0-0"],
      blv: ["BLV OHAHA", "BLV Expert", "BLV Pro"]
    },
    {
      competition: "Premier League",
      home: "Crystal Palace",
      away: "Liverpool",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      time: "14:00",
      date: "10/08/2025",
      status: "Live",
      score: "1-1",
      stats: ["HT 1-1", "P 2-1"],
      blv: ["Giàng A K", "BLV England", "BLV Premier"]
    },
    {
      competition: "La Liga",
      home: "Real Madrid",
      away: "Atletico Madrid",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
      time: "21:00",
      date: "10/08/2025",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0"],
      blv: ["BLV Expert", "BLV Spain", "BLV Madrid"]
    },
    {
      competition: "Bundesliga",
      home: "Bayern Munich",
      away: "Borussia Dortmund",
      homeLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
      time: "20:30",
      date: "10/08/2025",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0"],
      blv: ["BLV Pro", "BLV Germany", "BLV Bundesliga"]
    },
    {
      competition: "Serie A",
      home: "Juventus",
      away: "AC Milan",
      homeLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_Logo_2017_icon.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d2/AC_Milan_logo.svg",
      time: "22:00",
      date: "10/08/2025",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0"],
      blv: ["BLV Italy", "BLV Serie A", "BLV Milan"]
    },
    {
      competition: "Ligue 1",
      home: "PSG",
      away: "Marseille",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/4/43/Olympique_Marseille_logo.svg",
      time: "23:00",
      date: "10/08/2025",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0"],
      blv: ["BLV France", "BLV Ligue 1", "BLV Paris"]
    },
    {
      competition: "Champions League",
      home: "Manchester City",
      away: "Arsenal",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      time: "03:00",
      date: "11/08/2025",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0"],
      blv: ["BLV Europe", "BLV Champions", "BLV England"]
    },
    {
      competition: "Europa League",
      home: "Sevilla",
      away: "Villarreal",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/3/37/Sevilla_FC_logo.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg",
      time: "01:30",
      date: "11/08/2025",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0"],
      blv: ["BLV Spain", "BLV Europa", "BLV Andalusia"]
    }
  ];

  return (
    <>
      {/* Top Banner - Chạy tràn toàn màn hình */}
      <section className="py-2 banner-mobile-breakout">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 sm:p-3 text-white text-center overflow-hidden relative">
          {/* Animated text container */}
          <div className="animate-marquee whitespace-nowrap">
            <span className="inline-block mr-8">
              <span className="text-sm font-bold">🔥 HOT</span>
              <span className="text-xs ml-2">Chỉ có tại Ngoaihang TV</span>
              <span className="text-xs ml-2">
                Liên hệ ngay CSKH tại Ngoaihang TV để nhận những phần quà và khuyến mãi hấp dẫn đặc quyền chỉ có tại KUDV,
                <span className="font-bold"> BẢO HIỂM 100% ĐƠN CƯỢC ĐẦU TIÊN LÊN TỚI 1.888K</span>
              </span>
            </span>
            {/* Duplicate for seamless loop */}
            <span className="inline-block mr-8">
              <span className="text-sm font-bold">🔥 HOT</span>
              <span className="text-xs ml-2">Chỉ có tại Ngoaihang TV</span>
              <span className="text-xs ml-2">
                Liên hệ ngay CSKH tại Ngoaihang TV để nhận những phần quà và khuyến mãi hấp dẫn đặc quyền chỉ có tại KUDV,
                <span className="font-bold"> BẢO HIỂM 100% ĐƠN CƯỢC ĐẦU TIÊN LÊN TỚI 1.888K</span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1600px] mx-auto">

        {/* Live Room Video Section with Side Banners */}
        <section className="pb-4 sm:pb-8">
          {/* Video Player with Side Banners */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-4">
            {/* Video Player - Center (4 columns) */}
            <div className="lg:col-span-4">
              <div className="relative w-full">
                <VideoPlayer
                  videoUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                  autoPlay={true}
                  muted={true}
                  volume={0.7}
                  theme="#0f1214"
                  className="match-card-enhanced"
                  isJoin={true}
                  breakOutContainer={true}
                  onJoinClick={() => {
                    window.location.href = '/truc-tiep/crystal-palace-vs-liverpool/giang-a-k/12345';
                  }}
                />
              </div>
            </div>

            {/* Right Banner */}
            <div className="hidden lg:block">
              <div className="sticky top-4">
                <div className="bg-gradient-to-b from-green-500 to-blue-600 rounded-lg p-3 h-80 flex flex-col items-center justify-center text-white text-center">
                  <div className="text-xl mb-2">🎂</div>
                  <h3 className="text-base font-bold mb-2">SINH NHẬT ĐẶC BIỆT</h3>
                  <p className="text-xs mb-3">OK9 THỂ THAO XANH CHÍN</p>
                  <div className="text-xs space-y-1">
                    <p>ĐÓN CHÀO SINH NHẬT</p>
                    <p>TRỞ VỀ NHÀ NHẬN</p>
                    <p className="text-yellow-300 font-bold">18,888K</p>
                  </div>
                  <div className="mt-3">
                    <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center">
                      <span className="text-lg">👩</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

              {/* Sports Tabs */}
      <section className="py-2 sm:py-4">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={`flex-shrink-0 rounded-full border px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm transition-colors flex items-center gap-2 ${activeTab === index
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                  : "border-gray-200 dark:border-custom-dark-secondary bg-white dark:bg-custom-dark text-gray-700 dark:text-custom-muted hover:bg-gray-50 dark:hover:bg-custom-dark-secondary"
                }`}
            >
              <Image
                src={activeTab === index ? tab.iconActive : tab.icon}
                alt={tab.label}
                width={20}
                height={20}
                className="w-5 h-5"
                priority
              />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-2 sm:py-4 border-t border-gray-100 dark:border-custom-dark-secondary">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-2">
          {filterTabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveFilterTab(index)}
              className={`flex-shrink-0 rounded-full border px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm transition-colors flex items-center gap-2 ${activeFilterTab === index
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-200 dark:border-custom-dark-secondary bg-white dark:bg-custom-dark text-gray-700 dark:text-custom-muted hover:bg-gray-50 dark:hover:bg-custom-dark-secondary"
                }`}
            >
              {
                tab.icon && <Image
                  src={activeFilterTab === index ? tab.iconActive : tab.icon}
                  alt={tab.label}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                  priority
                />
              }

              {tab.label}
            </button>
          ))}
        </div>
      </section>

        {/* Matches grid */}
        <section className="pb-6 sm:pb-12">
          <h2 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Trận hot hôm nay</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            {matches.map((match, i) => (
              <MatchCard
                key={i}
                match={{...match, href: "#"}}
                variant="detailed"
              />
            ))}
          </div>
        </section>
      </div>

            {/* Bottom Menu - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-custom-dark border-t border-gray-200 dark:border-custom-dark-secondary z-50">
        <div className="flex items-center justify-around py-1">
          {bottomMenuItems.map((item, index) => (
            <Link 
              key={item.label}
              href={item.href} 
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className={`${item.iconSize} flex items-center justify-center`}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={item.iconSize === "w-5 h-5" ? 20 : 24}
                  height={item.iconSize === "w-5 h-5" ? 20 : 24}
                  className={item.iconSize}
                  priority
                />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-custom-muted">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
