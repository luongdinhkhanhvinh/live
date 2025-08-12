"use client";

import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "@/components/common/VideoPlayer";

export default function HomePage() {



  return (
    <>
      {/* Tabs */}
      <section className="py-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: "Bóng đá" },
            { label: "Bóng rổ" },
            { label: "Bóng chuyền" },
            { label: "Talk show" },
            { label: "Esports" },
          ].map((t) => (
            <button key={t.label} className="rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors">
              {t.label}
            </button>
          ))}
          <button className="ml-auto rounded-full bg-green-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-600 transition-colors">Tất cả</button>
        </div>
      </section>

      {/* Live Room Video Section */}
      <section className="pb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Phòng Live NgoaiHangTV</h2>
        
        {/* Live Badge */}
        <div className="relative mb-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
            LIVE
          </div>
          
          {/* Viewer Count */}
          <div className="absolute right-0 top-0">
            <div className="rounded-full bg-black/50 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
              <span>2.5k đang xem</span>
            </div>
          </div>
        </div>
        
        {/* Video Player with Join Overlay */}
        <div className="relative">
          <VideoPlayer
            videoUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            autoPlay={true}
            muted={true}
            volume={0.7}
            theme="#0f1214"
            className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
            isJoin={true}
            onJoinClick={() => {
              window.location.href = '/truc-tiep/crystal-palace-vs-liverpool/giang-a-k/12345';
            }}
          />
          
          {/* Match Info Overlay at bottom */}
          {/* <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pointer-events-none">
            <div className="text-center text-white">
              <div className="text-lg font-bold">Crystal Palace vs Liverpool</div>
              <div className="text-sm text-gray-200">Đang diễn ra - Hiệp 2</div>
            </div>
          </div> */}
        </div>
      </section>



      {/* Matches grid */}
      <section className="pb-12">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Trận hot hôm nay</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              competition: "International Club Fr...",
              home: "Barcelona",
              away: "Como",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "02:00",
              date: "11/08/2025",
              status: "HT",
              score: "0-0",
              stats: ["0-0", "0-0"],
              blv: "BLV OHAHA"
            },
            {
              competition: "Premier League",
              home: "Crystal Palace",
              away: "Liverpool",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "14:00",
              date: "10/08/2025",
              status: "Live",
              score: "1-1",
              stats: ["2-1", "1-0"],
              blv: "Giảng A K"
            },
            {
              competition: "La Liga",
              home: "Real Madrid",
              away: "Atletico Madrid",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "21:00",
              date: "10/08/2025",
              status: "Sắp diễn ra",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV Expert"
            },
            {
              competition: "Bundesliga",
              home: "Bayern Munich",
              away: "Borussia Dortmund",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "20:30",
              date: "10/08/2025",
              status: "Sắp diễn ra",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV Pro"
            },
            {
              competition: "Serie A",
              home: "Juventus",
              away: "AC Milan",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "22:00",
              date: "10/08/2025",
              status: "Sắp diễn ra",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV Italy"
            },
            {
              competition: "Ligue 1",
              home: "PSG",
              away: "Marseille",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "23:00",
              date: "10/08/2025",
              status: "Sắp diễn ra",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV France"
            },
            {
              competition: "Champions League",
              home: "Manchester City",
              away: "Arsenal",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "03:00",
              date: "11/08/2025",
              status: "Sắp diễn ra",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV Europe"
            },
            {
              competition: "Europa League",
              home: "Sevilla",
              away: "Villarreal",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "01:30",
              date: "11/08/2025",
              status: "Sắp diễn ra",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV Spain"
            }
          ].map((match, i) => (
            <Link key={i} href="#" className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-blue-500 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-sm">
              {/* Competition */}
              <div className="text-center mb-3">
                <span className="inline-block rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs text-gray-600 dark:text-gray-300">
                  {match.competition}
                </span>
              </div>
              
              {/* Teams and Time */}
              <div className="flex items-center justify-between mb-4">
                {/* Home Team */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                    <Image src={match.homeLogo} alt={match.home} width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{match.home}</span>
                </div>
                
                {/* Time and Date */}
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{match.time}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{match.date}</div>
                </div>
                
                {/* Away Team */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{match.away}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                    <Image src={match.awayLogo} alt={match.away} width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200 mb-3"></div>
              
              {/* Status and Stats */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    match.status === 'Live' ? 'text-red-600' : 
                    match.status === 'HT' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {match.status}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">{match.score}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {match.stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-sm ${
                        index === 0 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200 mb-3"></div>
              
              {/* BLV */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">BLV:</span>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{match.blv}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}
