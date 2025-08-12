"use client";

import Image from "next/image";
import Link from "next/link";

export default function RelatedMatchesTab() {
  const relatedMatches = [
    {
      competition: "Premier League",
      home: "Manchester United",
      away: "Arsenal",
      homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      time: "20:00",
      date: "10/08/2025",
      status: "Trực tiếp",
      score: "1-1",
      stats: ["2-1", "1-0"],
      blv: "BLV Expert"
    },
    {
      competition: "Premier League",
      home: "Liverpool",
      away: "Chelsea",
      homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      time: "15:30",
      date: "11/08/2025",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["-", "-"],
      blv: "BLV Pro"
    },
    {
      competition: "Premier League",
      home: "Manchester City",
      away: "Tottenham",
      homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      time: "18:00",
      date: "12/08/2025",
      status: "Đã lên lịch",
      score: "vs",
      stats: ["-", "-"],
      blv: "BLV England"
    },
    {
      competition: "La Liga",
      home: "Barcelona",
      away: "Real Madrid",
      homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      time: "22:00",
      date: "13/08/2025",
      status: "El Clásico",
      score: "vs",
      stats: ["-", "-"],
      blv: "BLV Spain"
    },
    {
      competition: "Bundesliga",
      home: "Bayern Munich",
      away: "Borussia Dortmund",
      homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
      time: "21:30",
      date: "14/08/2025",
      status: "Der Klassiker",
      score: "vs",
      stats: ["-", "-"],
      blv: "BLV Germany"
    }
  ];

  return (
    <div className="h-full space-y-6">
      {/* Related Matches Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-200 dark:border-gray-700 mx-4 lg:mx-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Các trận đấu liên quan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
          {relatedMatches.map((match, i) => (
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
                    <Image src={match.homeLogo} alt={match.away} width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-600 mb-3"></div>
              
              {/* Status and Stats */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    match.status === 'Trực tiếp' ? 'text-red-600' : 
                    match.status === 'Sắp diễn ra' ? 'text-blue-600' : 
                    match.status === 'Đã lên lịch' ? 'text-gray-600' :
                    match.status === 'El Clásico' ? 'text-red-600' :
                    match.status === 'Der Klassiker' ? 'text-purple-600' : 'text-yellow-600'
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
              <div className="border-t border-gray-200 dark:border-gray-600 mb-3"></div>
              
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

        {/* View All Button */}
        <div className="mt-6 text-center">
          <Link href="/lich-truc-tiep/bong-da" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            Xem tất cả trận đấu
          </Link>
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-200 dark:border-gray-700 mx-4 lg:mx-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trận đấu sắp diễn ra</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
          {[
            {
              competition: "Champions League",
              home: "Manchester City",
              away: "Real Madrid",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "20:00",
              date: "10/08/2025",
              status: "Tối nay",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV Europe",
              matchCount: "3 trận đấu"
            },
            {
              competition: "Europa League",
              home: "Sevilla",
              away: "Villarreal",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "19:00",
              date: "11/08/2025",
              status: "Ngày mai",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV Spain",
              matchCount: "4 trận đấu"
            },
            {
              competition: "Cúp Quốc gia",
              home: "Hà Nội FC",
              away: "TP.HCM FC",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "15:00",
              date: "12/08/2025",
              status: "Cuối tuần",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV Vietnam",
              matchCount: "8 trận đấu"
            },
            {
              competition: "Premier League",
              home: "Arsenal",
              away: "Chelsea",
              homeLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              awayLogo: "https://ext.same-assets.com/63664259/1847273561.png",
              time: "21:00",
              date: "13/08/2025",
              status: "Tuần tới",
              score: "vs",
              stats: ["-", "-"],
              blv: "BLV England",
              matchCount: "5 trận đấu"
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
              <div className="border-t border-gray-200 dark:border-gray-600 mb-3"></div>
              
              {/* Status and Match Count */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    match.status === 'Tối nay' ? 'text-blue-600' : 
                    match.status === 'Ngày mai' ? 'text-green-600' : 
                    match.status === 'Cuối tuần' ? 'text-purple-600' :
                    match.status === 'Tuần tới' ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {match.status}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">{match.score}</span>
                </div>
                
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {match.matchCount}
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-600 mb-3"></div>
              
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
      </div>
    </div>
  );
} 