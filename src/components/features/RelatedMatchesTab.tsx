"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function RelatedMatchesTab() {
  const relatedMatches = [
    {
      competition: "ROMANIAN LIGA II",
      home: "FC Bihor Oradea",
      away: "ACS Dumbravita",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Hanoi_FC_logo.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/2/2c/TP_HCM_FC_logo.png",
      time: "15:00",
      date: "15/08",
      status: "Hiệp 2 - 56'",
      score: "0-2",
      stats: ["HT 0-1", "P 5-1", "0-1"],
      blv: ["Giàng A Mèo", "Giàng A Tín", "Giàng A Húp"]
    },
    {
      competition: "INDONESIAN LIGA 1",
      home: "Semen Padang",
      away: "Dewa United FC",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
      time: "16:30",
      date: "15/08",
      status: "Nghỉ giữa hiệp",
      score: "0-0",
      stats: ["HT 0-0", "P 6-3", "0-0"],
      blv: ["Giàng A Tín", "Giàng A Mèo"]
    },
    {
      competition: "AUSTRALIA NATION...",
      home: "Peninsula Power",
      away: "Brisbane City",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      time: "17:00",
      date: "15/08",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0", "0-0"],
      blv: ["Giàng A Húp", "Giàng A Sún", "Giàng A Páo"]
    },
    {
      competition: "AUSTRALIA NATION...",
      home: "Brisbane Olympic",
      away: "Queensland Lions",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
      time: "18:00",
      date: "15/08",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0", "0-0"],
      blv: ["Giàng A Sún"]
    },
    {
      competition: "AUSTRALIA NATION...",
      home: "Eastern Suburbs Br.",
      away: "Gold Coast United",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
      time: "19:00",
      date: "15/08",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0", "0-0"],
      blv: ["Giàng A Páo", "Giàng A Mao"]
    },
    {
      competition: "NATIONAL PREMIER ...",
      home: "Hume City",
      away: "Melbourne Victory",
      homeLogo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/3/37/Sevilla_FC_logo.svg",
      time: "20:00",
      date: "15/08",
      status: "Sắp diễn ra",
      score: "vs",
      stats: ["HT 0-0", "P 0-0", "0-0"],
      blv: ["Giàng A Mao", "Giàng A Europe", "Giàng A Spain"]
    }
  ];

  // BLV Carousel Component
  const BLVCarousel = ({ blvList }: { blvList: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (blvList.length > 1) {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => {
            const nextIndex = (prev + 1) % blvList.length;
            return nextIndex;
          });
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
      }
    }, [blvList.length, blvList]);

    if (blvList.length === 0) return null;

    return (
      <div className="flex flex-col items-center gap-1 lg:gap-1.5 mb-2 lg:mb-3 relative z-10">
        {/* Avatar */}
                 <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 border border-white dark:border-custom-dark-secondary flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {blvList[currentIndex].split(' ').slice(-1)[0][0]}
            </span>
          </div>
        </div>

        {/* BLV Name */}
                 <span className="text-xs lg:text-sm text-gray-900 dark:text-custom-light font-medium text-center">
          {blvList[currentIndex]}
        </span>

        {/* Carousel Indicators */}
        {blvList.length > 1 && (
          <div className="flex gap-1 mt-1">
            {blvList.map((_, index) => (
              <div
                key={index}
                                 className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                     ? 'bg-blue-500'
                     : 'bg-gray-300 dark:bg-custom-subtle'
                   }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full space-y-2 lg:space-y-4">
      {/* Related Matches Header */}
      <div className="bg-white dark:bg-custom-dark rounded-lg p-2 lg:p-6 mx-2 lg:mx-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-custom-light mb-2 lg:mb-4">Các trận đấu liên quan</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
          {relatedMatches.map((match, i) => (
            <Link key={i} href="#" className="group relative overflow-hidden rounded-xl match-card-enhanced bg-white dark:bg-custom-dark hover:border-blue-500 hover:shadow-lg transition-all duration-300 min-h-[160px] lg:min-h-[180px]">
              <div className="relative p-2 lg:p-4">
                 {/* Competition Header - iPhone Style "Ear" Design with Real Notch */}
                 <div className="relative mb-2 lg:mb-4">
                   {/* Real Notch Design with SVG */}
                   <div className="relative h-8 flex items-center justify-center">
                     {/* SVG Notch Container */}
                     <svg 
                       width="131" 
                       height="29" 
                       viewBox="0 0 131 29" 
                       fill="none" 
                       className="absolute top-0 left-1/2 -translate-x-1/2"
                     >
                       {/* Background blur effect */}
                       <foreignObject x="-19.333" y="-20" width="170" height="69">
                         <div 
                           style={{
                             backdropFilter: 'blur(10px)',
                             clipPath: 'url(#bgblur_clip_path)',
                             height: '100%',
                             width: '100%'
                           }}
                         />
                       </foreignObject>
                       
                       {/* Main notch path */}
                       <g>
                         <path 
                           d="M126.056 0.5C123.603 1.73657 121.748 4.02604 121.13 6.83594L121.048 7.25195L118.564 21.5771C117.871 25.5782 114.399 28.4998 110.338 28.5H22.1123C18.5501 28.5 15.3942 26.2423 14.2295 22.9023L14.123 22.5752L13.1484 19.3662L10.1172 6.67676C9.46046 3.92808 7.62737 1.70909 5.22949 0.5H126.056Z" 
                           fill="url(#paint0_linear)" 
                         />
                         <path 
                           d="M126.056 0.5C123.603 1.73657 121.748 4.02604 121.13 6.83594L121.048 7.25195L118.564 21.5771C117.871 25.5782 114.399 28.4998 110.338 28.5H22.1123C18.5501 28.5 15.3942 26.2423 14.2295 22.9023L14.123 22.5752L13.1484 19.3662L10.1172 6.67676C9.46046 3.92808 7.62737 1.70909 5.22949 0.5H126.056Z" 
                           stroke="url(#paint1_linear)" 
                         />
                         <path 
                           d="M126.056 0.5C123.603 1.73657 121.748 4.02604 121.13 6.83594L121.048 7.25195L118.564 21.5771C117.871 25.5782 114.399 28.4998 110.338 28.5H22.1123C18.5501 28.5 15.3942 26.2423 14.2295 22.9023L14.123 22.5752L13.1484 19.3662L10.1172 6.67676C9.46046 3.92808 7.62737 1.70909 5.22949 0.5H126.056Z" 
                           stroke="url(#paint2_linear)" 
                           strokeOpacity="0.2" 
                         />
                       </g>
                       
                       {/* Definitions */}
                       <defs>
                         <clipPath id="bgblur_clip_path" transform="translate(19.333 20)">
                           <path d="M126.056 0.5C123.603 1.73657 121.748 4.02604 121.13 6.83594L121.048 7.25195L118.564 21.5771C117.871 25.5782 114.399 28.4998 110.338 28.5H22.1123C18.5501 28.5 15.3942 26.2423 14.2295 22.9023L14.123 22.5752L13.1484 19.3662L10.1172 6.67676C9.46046 3.92808 7.62737 1.70909 5.22949 0.5H126.056Z" />
                         </clipPath>
                         
                         {/* Gradients */}
                         <linearGradient id="paint0_linear" x1="65.667" y1="29" x2="65.667" y2="0" gradientUnits="userSpaceOnUse">
                           <stop stopColor="#00D962" />
                           <stop offset="1" stopColor="#007334" />
                         </linearGradient>
                         <linearGradient id="paint1_linear" x1="65.667" y1="29" x2="65.667" y2="0" gradientUnits="userSpaceOnUse">
                           <stop stopColor="#0A6027" />
                           <stop offset="1" stopColor="#666666" stopOpacity="0" />
                         </linearGradient>
                         <linearGradient id="paint2_linear" x1="15.167" y1="25" x2="117.167" y2="25.5" gradientUnits="userSpaceOnUse">
                           <stop stopColor="white" />
                           <stop offset="1" stopColor="white" />
                         </linearGradient>
                       </defs>
                     </svg>
                     
                     {/* Status text inside notch */}
                     <span className="absolute top-1/2 left-1/2 max-w-[80%] -translate-x-1/2 -translate-y-1/2 truncate text-xs whitespace-nowrap text-white lg:text-sm z-10">
                       {match.status}
                     </span>
                     
                     {/* Left side - Competition */}
                     <div className="absolute left-0 top-0 flex items-center gap-1 rounded-full border border-[#FF6601] px-1 py-0.5 bg-white">
                       <span className="size-5">
                         <img 
                           alt={match.competition}
                           loading="lazy"
                           width={20}
                           height={20}
                           className="bg-muted h-full w-full rounded-full object-contain"
                           src="https://upload.wikimedia.org/wikipedia/en/8/8c/Hanoi_FC_logo.png"
                         />
                       </span>
                       <p className="w-[80px] truncate text-xs font-normal uppercase xl:w-[120px] text-gray-900">
                         {match.competition}
                       </p>
                     </div>
                     
                     {/* Right side - Date & Time */}
                     <div className="absolute right-0 top-0">
                       <span className="rounded-full border border-[#FF6601] bg-gradient-to-r from-[#F03131] to-[#FF6601] bg-clip-text px-2 py-1 text-xs font-semibold text-transparent lg:text-sm">
                         {match.time} {match.date}
                       </span>
                     </div>
                   </div>
                 </div>

                {/* Teams and Score */}
                <div className="flex items-center justify-between mb-2 lg:mb-4 relative z-10">
                                     {/* Home Team */}
                   <div className="flex items-center gap-2 flex-1">
                     <span className="text-sm text-gray-900 dark:text-custom-light font-medium truncate text-left">
                       {match.home}
                     </span>
                     <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-custom-dark-secondary flex-shrink-0">
                      <img
                        src={match.homeLogo}
                        alt={match.home}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover p-1"
                      />
                    </div>
                  </div>

                  {/* Score Display */}
                  <div className="flex items-center gap-1 mx-1 lg:mx-3">
                    {match.score === 'vs' ? (
                      <div className="text-base lg:text-lg font-bold text-gray-400">0 : 0</div>
                    ) : (
                      <>
                        <div className="bg-blue-600 text-white text-xs lg:text-sm px-1.5 lg:px-2 py-1 rounded font-medium">
                          {match.score.split('-')[0]}
                        </div>
                        <span className="text-gray-400 dark:text-gray-500 text-base lg:text-lg font-bold">:</span>
                        <div className="bg-blue-600 text-white text-xs lg:text-sm px-1.5 lg:px-2 py-1 rounded font-medium">
                          {match.score.split('-')[1]}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-custom-dark-secondary flex-shrink-0">
                      <img
                        src={match.awayLogo}
                        alt={match.away}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover p-1"
                      />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-custom-light font-medium truncate text-right">
                      {match.away}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-custom-dark-secondary mb-2 lg:mb-3 relative z-10"></div>

                {/* BLV Section - Centered */}
                <BLVCarousel blvList={match.blv} />

                {/* Statistics and Icons */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    {match.stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className={`text-xs ${index === 0 ? 'text-green-500' : 'text-gray-500 dark:text-custom-subtle'
                          }`}>
                          {stat.split(' ')[0]}
                        </div>
                        <span className="text-xs text-gray-700 dark:text-custom-muted font-medium">
                          {stat.split(' ')[1]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 lg:gap-2">
                    {/* Vendor Logo */}
                    <div className="w-14 h-8 rounded flex items-center justify-center">
                      <img
                        src="/vendor/ok-logo.png"
                        alt="OK Logo"
                        width={100}
                        height={100}
                        className="w-[40px] h-[40px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 lg:mt-6 text-center">
          <Link href="/lich-truc-tiep/bong-da" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Xem tất cả trận đấu
          </Link>
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="bg-white dark:bg-custom-dark rounded-lg p-2 lg:p-6 mx-2 lg:mx-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-custom-light mb-2 lg:mb-4">Trận đấu sắp diễn ra</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
          {[
            {
              competition: "CHAMPIONS LEAGUE",
              home: "Manchester City",
              away: "Real Madrid",
              homeLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
              awayLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
              time: "20:00",
              date: "15/08",
              status: "Tối nay",
              score: "vs",
              stats: ["HT 0-0", "P 0-0", "0-0"],
              blv: ["Giàng A Europe", "Giàng A Spain", "Giàng A England"],
              matchCount: "3 trận đấu"
            },
            {
              competition: "EUROPA LEAGUE",
              home: "Sevilla",
              away: "Villarreal",
              homeLogo: "https://upload.wikimedia.org/wikipedia/en/3/37/Sevilla_FC_logo.svg",
              awayLogo: "https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg",
              time: "19:00",
              date: "16/08",
              status: "Ngày mai",
              score: "vs",
              stats: ["HT 0-0", "P 0-0", "0-0"],
              blv: ["Giàng A Spain", "Giàng A Andalusia"],
              matchCount: "4 trận đấu"
            },
            {
              competition: "CÚP QUỐC GIA",
              home: "Hà Nội FC",
              away: "TP.HCM FC",
              homeLogo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Hanoi_FC_logo.png",
              awayLogo: "https://upload.wikimedia.org/wikipedia/en/2/2c/TP_HCM_FC_logo.png",
              time: "15:00",
              date: "17/08",
              status: "Cuối tuần",
              score: "vs",
              stats: ["HT 0-0", "P 0-0", "0-0"],
              blv: ["Giàng A Vietnam", "Giàng A Hanoi", "Giàng A Saigon"],
              matchCount: "8 trận đấu"
            }
          ].map((match, i) => (
            <Link key={i} href="#" className="group relative overflow-hidden rounded-xl match-card-enhanced bg-white dark:bg-custom-dark hover:border-blue-500 hover:shadow-lg transition-all duration-300 min-h-[160px] lg:min-h-[180px]">
              <div className="relative p-2 lg:p-4">
                                 {/* Competition Header - iPhone Style "Ear" Design with Real Notch */}
                 <div className="relative mb-2 lg:mb-4">
                   {/* Real Notch Design with SVG */}
                   <div className="relative h-8 flex items-center justify-center">
                     {/* SVG Notch Container */}
                     <svg 
                       width="131" 
                       height="29" 
                       viewBox="0 0 131 29" 
                       fill="none" 
                       className="absolute top-0 left-1/2 -translate-x-1/2"
                     >
                       {/* Background blur effect */}
                       <foreignObject x="-19.333" y="-20" width="170" height="69">
                         <div 
                           style={{
                             backdropFilter: 'blur(10px)',
                             clipPath: 'url(#bgblur_clip_path_2)',
                             height: '100%',
                             width: '100%'
                           }}
                         />
                       </foreignObject>
                       
                       {/* Main notch path */}
                       <g>
                         <path 
                           d="M126.056 0.5C123.603 1.73657 121.748 4.02604 121.13 6.83594L121.048 7.25195L118.564 21.5771C117.871 25.5782 114.399 28.4998 110.338 28.5H22.1123C18.5501 28.5 15.3942 26.2423 14.2295 22.9023L14.123 22.5752L13.1484 19.3662L10.1172 6.67676C9.46046 3.92808 7.62737 1.70909 5.22949 0.5H126.056Z" 
                           fill="url(#paint0_linear_2)" 
                         />
                         <path 
                           d="M126.056 0.5C123.603 1.73657 121.748 4.02604 121.13 6.83594L121.048 7.25195L118.564 21.5771C117.871 25.5782 114.399 28.4998 110.338 28.5H22.1123C18.5501 28.5 15.3942 26.2423 14.2295 22.9023L14.123 22.5752L13.1484 19.3662L10.1172 6.67676C9.46046 3.92808 7.62737 1.70909 5.22949 0.5H126.056Z" 
                           stroke="url(#paint1_linear_2)" 
                         />
                         <path 
                           d="M126.056 0.5C123.603 1.73657 121.748 4.02604 121.13 6.83594L121.048 7.25195L118.564 21.5771C117.871 25.5782 114.399 28.4998 110.338 28.5H22.1123C18.5501 28.5 15.3942 26.2423 14.2295 22.9023L14.123 22.5752L13.1484 19.3662L10.1172 6.67676C9.46046 3.92808 7.62737 1.70909 5.22949 0.5H126.056Z" 
                           stroke="url(#paint2_linear_2)" 
                           strokeOpacity="0.2" 
                         />
                       </g>
                       
                       {/* Definitions */}
                       <defs>
                         <clipPath id="bgblur_clip_path_2" transform="translate(19.333 20)">
                           <path d="M126.056 0.5C123.603 1.73657 121.748 4.02604 121.13 6.83594L121.048 7.25195L118.564 21.5771C117.871 25.5782 114.399 28.4998 110.338 28.5H22.1123C18.5501 28.5 15.3942 26.2423 14.2295 22.9023L14.123 22.5752L13.1484 19.3662L10.1172 6.67676C9.46046 3.92808 7.62737 1.70909 5.22949 0.5H126.056Z" />
                         </clipPath>
                         
                         {/* Gradients */}
                         <linearGradient id="paint0_linear_2" x1="65.667" y1="29" x2="65.667" y2="0" gradientUnits="userSpaceOnUse">
                           <stop stopColor="#00D962" />
                           <stop offset="1" stopColor="#007334" />
                         </linearGradient>
                         <linearGradient id="paint1_linear_2" x1="65.667" y1="29" x2="65.667" y2="0" gradientUnits="userSpaceOnUse">
                           <stop stopColor="#0A6027" />
                           <stop offset="1" stopColor="#666666" stopOpacity="0" />
                         </linearGradient>
                         <linearGradient id="paint2_linear_2" x1="15.167" y1="25" x2="117.167" y2="25.5" gradientUnits="userSpaceOnUse">
                           <stop stopColor="white" />
                           <stop offset="1" stopColor="white" />
                         </linearGradient>
                       </defs>
                     </svg>
                     
                     {/* Status text inside notch */}
                     <span className="absolute top-1/2 left-1/2 max-w-[80%] -translate-x-1/2 -translate-y-1/2 truncate text-xs whitespace-nowrap text-white lg:text-sm z-10">
                       {match.status}
                     </span>
                     
                     {/* Left side - Competition */}
                     <div className="absolute left-0 top-0 flex items-center gap-1 rounded-full border border-[#FF6601] px-1 py-0.5 bg-white">
                       <span className="size-5">
                         <img 
                           alt={match.competition}
                           loading="lazy"
                           width={20}
                           height={20}
                           className="bg-muted h-full w-full rounded-full object-contain"
                           src="https://upload.wikimedia.org/wikipedia/en/8/8c/Hanoi_FC_logo.png"
                         />
                       </span>
                       <p className="w-[80px] truncate text-xs font-normal uppercase xl:w-[120px] text-gray-900">
                         {match.competition}
                       </p>
                     </div>
                     
                     {/* Right side - Date & Time */}
                     <div className="absolute right-0 top-0">
                       <span className="rounded-full border border-[#FF6601] bg-gradient-to-r from-[#F03131] to-[#FF6601] bg-clip-text px-2 py-1 text-xs font-semibold text-transparent lg:text-sm">
                         {match.time} {match.date}
                       </span>
                     </div>
                   </div>
                 </div>

                {/* Teams and Score */}
                <div className="flex items-center justify-between mb-2 lg:mb-4 relative z-10">
                  {/* Home Team */}
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm text-gray-900 dark:text-custom-light font-medium truncate text-left">
                      {match.home}
                    </span>
                                       <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-custom-dark-secondary flex-shrink-0">
                     <img
                       src={match.homeLogo}
                       alt={match.home}
                       width={32}
                       height={32}
                       className="w-full h-full object-cover p-1"
                     />
                   </div>
                  </div>

                  {/* Score Display */}
                  <div className="flex items-center gap-1 mx-1 lg:mx-3">
                    <div className="text-base lg:text-lg font-bold text-gray-400">0 : 0</div>
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-2 flex-1 justify-end">
                                       <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-custom-dark-secondary flex-shrink-0">
                     <img
                       src={match.awayLogo}
                       alt={match.away}
                       width={32}
                       height={32}
                       className="w-full h-full object-cover p-1"
                     />
                   </div>
                    <span className="text-sm text-gray-900 dark:text-custom-light font-medium truncate text-right">
                      {match.away}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-custom-dark-secondary mb-2 lg:mb-3 relative z-10"></div>

                {/* BLV Section - Centered */}
                <BLVCarousel blvList={match.blv} />

                {/* Statistics and Icons */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    {match.stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className={`text-xs ${index === 0 ? 'text-green-500' : 'text-gray-500 dark:text-custom-subtle'
                          }`}>
                          {stat.split(' ')[0]}
                        </div>
                        <span className="text-xs text-gray-700 dark:text-custom-muted font-medium">
                          {stat.split(' ')[1]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 lg:gap-2">
                    {/* Match Count */}
                    <div className="text-xs text-gray-600 dark:text-custom-subtle font-medium bg-gray-100 dark:bg-custom-dark-secondary px-2 py-1 rounded">
                      {match.matchCount}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 