"use client";

import Image from "next/image";
import Link from "next/link";

export interface MatchData {
  id?: string;
  competition: string;
  home: string;
  away: string;
  homeLogo: string;
  awayLogo: string;
  time: string;
  date: string;
  status: string;
  score: string;
  stats: string[];
  blv: string | string[];
  matchCount?: string;
  href?: string;
}

interface MatchCardProps {
  match: MatchData;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  onClick?: () => void;
}

export default function MatchCard({ 
  match, 
  variant = 'default', 
  className = "",
  onClick 
}: MatchCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-red-500 text-white';
      case 'HT':
        return 'bg-green-500 text-white';
      case 'Sắp diễn ra':
      case 'Cuối tuần':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const renderCompetitionHeader = () => {
    if (variant === 'compact') {
      return (
        <div className="flex items-center justify-between mb-2 lg:mb-3 relative z-10">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-xs text-gray-900 dark:text-white font-medium truncate max-w-[70px] sm:max-w-[90px] lg:max-w-[120px]">
              {match.competition}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
              {match.status}
            </span>
            <div className="text-xs text-gray-600 dark:text-custom-subtle">
              {match.time} {match.date}
            </div>
          </div>
        </div>
      );
    }

    // Detailed variant with iPhone-style notch
    return (
      <div className="relative mb-2 lg:mb-4">
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
    );
  };

  const renderTeamsAndScore = () => {
    if (variant === 'compact') {
      return (
        <div className="flex items-center justify-between mb-2 lg:mb-3 relative z-10">
          {/* Home Team */}
          <div className="flex items-center gap-1 sm:gap-2 flex-1">
            <span className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate text-left">
              {match.home}
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-custom-dark-secondary flex-shrink-0">
              <Image
                src={match.homeLogo}
                alt={match.home}
                width={32}
                height={32}
                className="w-full h-full object-cover p-1"
              />
            </div>
          </div>

          {/* Score Display */}
          <div className="flex items-center gap-1 mx-1 lg:mx-2">
            {match.score === 'vs' ? (
              <>
                <div className="bg-blue-600 text-white text-xs lg:text-sm px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 rounded font-medium">
                  0
                </div>
                <span className="text-gray-400 dark:text-custom-subtle text-sm sm:text-base lg:text-lg font-bold">:</span>
                <div className="bg-blue-600 text-white text-xs lg:text-sm px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 rounded font-medium">
                  0
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-600 text-white text-xs lg:text-sm px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 rounded font-medium">
                  {match.score.split('-')[0]}
                </div>
                <span className="text-gray-400 dark:text-custom-subtle text-sm sm:text-base lg:text-lg font-bold">:</span>
                <div className="bg-blue-600 text-white text-xs lg:text-sm px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 rounded font-medium">
                  {match.score.split('-')[1]}
                </div>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-end">
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-custom-dark-secondary flex-shrink-0">
              <Image
                src={match.awayLogo}
                alt={match.away}
                width={32}
                height={32}
                className="w-full h-full object-cover p-1"
              />
            </div>
            <span className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate text-right">
              {match.away}
            </span>
          </div>
        </div>
      );
    }

    // Detailed variant
    return (
      <div className="flex items-center justify-center gap-6 mb-2 lg:mb-3">
        {/* Home Team */}
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-900 dark:text-white">{match.home}</span>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-gray-600">
            <Image
              src={match.homeLogo}
              alt={match.home}
              width={40}
              height={40}
              className="w-full h-full object-cover p-1"
            />
          </div>
        </div>

        {/* Score */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{match.score}</div>

        {/* Away Team */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-gray-600">
            <Image
              src={match.awayLogo}
              alt={match.away}
              width={40}
              height={40}
              className="w-full h-full object-cover p-1"
            />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{match.away}</span>
        </div>
      </div>
    );
  };

  const renderBLVSection = () => {
      return (
        <div className="flex flex-col items-center gap-1 lg:gap-1.5 mb-2 lg:mb-3 relative z-10">
          {/* Avatar */}
          <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 border border-white dark:border-custom-dark-secondary flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {(() => {
                  const blvText = Array.isArray(match.blv) ? match.blv[0] : match.blv;
                  return blvText.split(' ').slice(-1)[0][0];
                })()}
              </span>
            </div>
          </div>

          {/* BLV Name */}
          <span className="text-xs lg:text-sm text-gray-900 dark:text-white font-medium text-center">
            {Array.isArray(match.blv) ? match.blv[0] : match.blv}
          </span>

          {/* Carousel Indicators for multiple BLVs */}
          {Array.isArray(match.blv) && match.blv.length > 1 && (
            <div className="flex gap-1 mt-1">
              {match.blv.map((_, index) => (
                <div
                  key={index}
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-300 dark:bg-custom-subtle"
                />
              ))}
            </div>
          )}
        </div>
      );
  };

  const renderStats = () => {
    if (variant === 'compact') {
      return (
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {match.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className={`text-xs ${index === 0 ? 'text-green-500' : 'text-gray-500 dark:text-custom-subtle'}`}>
                  {stat}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Vendor Logo */}
            <div className="w-10 h-8 sm:w-4 sm:h-4 rounded flex items-center justify-center">
              <Image
                src="/vendor/ok-logo.png"
                alt="OK Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      );
    }

    // Detailed variant
    return (
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 lg:gap-2">
          {match.stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className={`text-xs ${index === 0 ? 'text-green-500' : 'text-gray-500 dark:text-custom-subtle'}`}>
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
          {match.matchCount && (
            <div className="text-xs text-gray-600 dark:text-custom-subtle font-medium bg-gray-100 dark:bg-custom-dark-secondary px-2 py-1 rounded">
              {match.matchCount}
            </div>
          )}
        </div>
      </div>
    );
  };

  const cardContent = (
    <div className={`relative ${variant === 'compact' ? 'p-2 sm:p-2 lg:p-3' : 'p-2 lg:p-4'}`}>
      {/* Competition Header */}
      {renderCompetitionHeader()}

      {/* Teams and Score */}
      {renderTeamsAndScore()}

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-custom-dark-secondary mb-2 lg:mb-3 relative z-10"></div>

      {/* BLV Section */}
      {renderBLVSection()}

      {/* Statistics */}
      {renderStats()}
    </div>
  );

  if (match.href) {
    return (
      <Link 
        href={match.href} 
        className={`group relative overflow-hidden rounded-xl match-card-enhanced bg-white dark:bg-custom-dark hover:border-blue-500 hover:shadow-lg transition-all duration-300 ${variant === 'compact' ? 'min-h-[140px] sm:min-h-[160px] lg:min-h-[180px]' : 'min-h-[160px] lg:min-h-[180px]'} ${className}`}
        onClick={handleClick}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl match-card-enhanced bg-white dark:bg-custom-dark hover:border-blue-500 hover:shadow-lg transition-all duration-300 ${variant === 'compact' ? 'min-h-[140px] sm:min-h-[160px] lg:min-h-[180px]' : 'min-h-[160px] lg:min-h-[180px]'} ${className}`}
      onClick={handleClick}
    >
      {cardContent}
    </div>
  );
}
