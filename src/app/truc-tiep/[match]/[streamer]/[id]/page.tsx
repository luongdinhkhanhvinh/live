"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, use } from "react";
import AuthModal from "@/components/AuthModal";
import ChatTab from "@/components/features/ChatTab";
import StatsTab from "@/components/features/StatsTab";
import CommentatorTab from "@/components/features/CommentatorTab";
import LineupTab from "@/components/features/LineupTab";
import HeadToHeadTab from "@/components/features/HeadToHeadTab";
import RelatedMatchesTab from "@/components/features/RelatedMatchesTab";
import VideoPlayer from "@/components/common/VideoPlayer";
import FloatingContact from "@/components/common/FloatingContact";
import MatchCard, { MatchData } from "@/components/common/MatchCard";
import { useScreenLock } from "@/components/ScreenLockContext";

type Params = { match?: string; streamer?: string; id?: string };

interface UserData {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export default function LiveDetail({ params }: { params: Promise<Params> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showBanner, setShowBanner] = useState(false);
  const { isScreenLocked, setIsScreenLocked } = useScreenLock();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Sample match data - you can replace this with real data from API
  const matchData: MatchData = {
    id: "12345",
    competition: "Chinese Football Super League",
    home: "Yunnan Yukun",
    away: "Wuhan Three Towns FC",
    homeLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    awayLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    time: "19:00",
    date: "15/08/2025",
    status: "Live",
    score: "0-0",
    stats: ["2.5k đang xem", "5.2k theo dõi"],
    blv: "Giàng A Voi",
    matchCount: "Trận 1",
    href: `/truc-tiep/${resolvedParams.match}/${resolvedParams.streamer}/${resolvedParams.id}`
  };

  const handleScroll = () => {
    // Handle scroll for all tabs
    if (chatContainerRef.current) {
      // You can add scroll logic here if needed
    }
  };

  // Force full width layout
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100%';

    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.width = '';
      document.body.style.maxWidth = '';
    };
  }, []);

  // Handle screen lock scroll
  useEffect(() => {
    if (isScreenLocked) {
      // Chỉ khóa overflow, không khóa position để tránh ảnh hưởng layout
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Mở khóa scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      // Cleanup khi component unmount
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isScreenLocked]);

  // Show banner repeatedly every 4-6 seconds, visible for 2 seconds
  useEffect(() => {
    const showBannerRepeatedly = () => {
      // Show banner
      setShowBanner(true);

      // Hide banner after 2 seconds
      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    };

    // Initial banner after 4-6 seconds
    const initialTimer = setTimeout(() => {
      showBannerRepeatedly();

      // Set up interval to show banner every 4-6 seconds
      const interval = setInterval(() => {
        showBannerRepeatedly();
      }, Math.random() * 2000 + 4000); // Random between 4-6 seconds

      return () => clearInterval(interval);
    }, Math.random() * 2000 + 4000); // Random between 4-6 seconds

    return () => clearTimeout(initialTimer);
  }, []);

  const handleLoginSuccess = (userData: UserData) => {
    setIsLoggedIn(true);
    console.log("User logged in:", userData);
  };

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthMode('login');
  };

  const toggleScreenLock = () => {
    setIsScreenLocked(!isScreenLocked);
  };

  const getIconColorClass = (isActive: boolean) => {
    if (isActive) {
      return "filter brightness-0 invert-[0.3] sepia-[1] saturate-[5] hue-rotate-[200deg]"; // Blue when active
    }
    return "filter brightness-0 invert-[0.6] dark:invert-[0.4]"; // Gray when inactive
  };

  const tabs = [
    { index: 0, label: "Chat", icon: "/icon/chat.svg", iconActive: "/icon/chat-active.svg" },
    { index: 1, label: "Thông Số", icon: "/icon/thong-so.svg", iconActive: "/icon/thong-so-active.svg" },
    { index: 2, label: "Bình luận viên", icon: "/icon/dien-bien.svg", iconActive: "/icon/dien-bien-active.svg" },
    { index: 3, label: "Đội Hình", icon: "/icon/doi-hinh.svg", iconActive: "/icon/doi-hinh-active.svg" },
    { index: 4, label: "Tỷ Lệ", icon: "/icon/ti-le-keo.svg", iconActive: "/icon/ty-le-active.svg" },
    { index: 5, label: "Đối Đầu", icon: "/icon/doi-dau.svg", iconActive: "/icon/doi-dau-active.svg" },
    { index: 6, label: "Thông Tin", icon: "/icon/bxh.svg", iconActive: "/icon/thong-tin-active.svg" },
    { index: 7, label: "Trận đấu liên quan", icon: "/icon/tran-khac.svg", iconActive: "/icon/tran-khac-active.svg" },
  ];

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-custom-dark w-full" style={{ margin: 0, padding: 0 }}>
        {/* Screen Lock Overlay */}
        {isScreenLocked && (
          <div className="fixed top-0 left-0 right-0 z-[9998] bg-transparent text-white text-center py-2 px-4 text-sm font-medium">

            <Image
              src="/icon/lock.svg"
              alt="Locked"
              width={16}
              height={16}
              className="w-10 h-7 filter brightness-0 invert"
            />
          </div>
        )}

        <div className="w-full">
          {/* Main Content */}
          <div className={`${isScreenLocked ? 'pt-0' : 'py-6'} px-0`}>
            <div className="lg:grid lg:grid-cols-10 gap-6 w-full">
              {/* Video Player - 7 columns */}
              <div className="lg:col-span-7 w-full">
                {/* Match Info Header - Top Bar - Outside Card */}
                <div className="bg-white dark:bg-custom-dark rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3 mb-2">
                  <div className="w-full flex flex-wrap text-sm lg:text-lg items-center p-1 font-bold break-words gap-1">
                    <div className="h-7 w-2 rounded-[10px] bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] flex-shrink-0"></div>
                    <div className="text-center">
                      <span className="">Spanish La Liga</span>
                      <span> - </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <div className="home_info flex items-center gap-2">Girona FC</div>
                      <div>VS</div>
                      <div className="away_info flex items-center gap-2">Rayo Vallecano</div>
                    </div>
                    <span> - </span>
                    <span>00:00</span>
                    <span> - </span>
                    <span>16/08/2025</span>
                  </div>
                </div>

                {/* Main Match Card - Contains Status + Video */}
                <div className="bg-white dark:bg-custom-dark rounded-lg shadow-sm overflow-hidden">
                  {/* Match Status - Above Video */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <div className="flex items-center justify-center gap-3 border rounded py-1 text-sm lg:text-lg font-bold">
                        <div className="home_info flex items-center gap-2">
                          Girona FC
                          <img alt="Girona FC" loading="lazy" width="35" height="35" decoding="async" data-nimg="1" srcSet="/_next/image?url=https%3A%2F%2Fapi-ck.686868.me%2Fuploads%2Ffootball%2Fteam%2F006ce259b33ef72dd5570cfa8dc39f38.png&amp;w=48&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fapi-ck.686868.me%2Fuploads%2Ffootball%2Fteam%2F006ce259b33ef72dd5570cfa8dc39f38.png&amp;w=96&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fapi-ck.686868.me%2Fuploads%2Ffootball%2Fteam%2F006ce259b33ef72dd5570cfa8dc39f38.png&amp;w=96&amp;q=75" />
                        </div>
                        <div className="score_info flex items-center gap-1">
                          <span className="text-primary text-xl font-semibold">0</span>
                          <span className="font-semibold">-</span>
                          <span className="text-primary text-xl font-semibold">0</span>
                        </div>
                        <div className="away_info flex items-center gap-2">
                          <img alt="Rayo Vallecano" loading="lazy" width="35" height="35" decoding="async" data-nimg="1" srcSet="/_next/image?url=https%3A%2F%2Fapi-ck.686868.me%2Fuploads%2Ffootball%2Fteam%2F5005d8feab109ce64e40beb98073cc1f.png&amp;w=48&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fapi-ck.686868.me%2Fuploads%2Ffootball%2Fteam%2F5005d8feab109ce64e40beb98073cc1f.png&amp;w=96&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fapi-ck.686868.me%2Fuploads%2Ffootball%2Fteam%2F5005d8feab109ce64e40beb98073cc1f.png&amp;w=96&amp;q=75" />
                          Rayo Vallecano
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Player - Inside Card */}
                  <div className="p-0">
                    <VideoPlayer
                      videoUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                      autoPlay={true}
                      muted={false}
                      volume={0.7}
                      theme="#0f1214"
                      className="match-card-enhanced"
                      breakOutContainer={true}
                    />
                  </div>

                  {/* Commentator Section - Inside Video Card */}
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    {/* Match Info Section with Modern Design */}
                    <div className="w-full rounded pt-1" id="app-match-info">
                      {/* Action Buttons Row - Mobile Only */}
                      <div className="flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
                        {/* Live Stream Button */}
                        <button className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow-sm hover:bg-primary/90 h-8 gap-0 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] px-3 py-[6px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-radio size-5">
                            <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
                            <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
                            <circle cx="12" cy="12" r="2"></circle>
                            <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
                            <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dot size-5">
                            <circle cx="12.1" cy="12.1" r="1"></circle>
                          </svg>
                          <div className="inline-flex items-center border px-2.5 py-0.5 transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow-sm rounded-full bg-white text-xs font-normal text-black hover:bg-white">
                            <p className="max-w-24 truncate text-blue-600 font-semibold">Giàng A Voi</p>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dot size-5">
                            <circle cx="12.1" cy="12.1" r="1"></circle>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye mr-1 size-4">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span className="text-xs font-normal">30.01K</span>
                        </button>

                        {/* Sponsor Logos */}
                        <div className="flex gap-1 border rounded-lg">
                          <a target="_blank" className="inline-flex h-8 items-center justify-center min-w-20" href="https://oklavip68.com/">
                            <Image alt="OKVIP Logo" loading="lazy" width={56} height={36} decoding="async" className="object-cover h-7 w-full max-w-none" src="/vendor/ok-logo.png" />
                          </a>
                          <div data-orientation="horizontal" role="none" className="shrink-0 m-auto h-[70%] w-1 bg-gradient-to-r from-[#3B82F600] via-[#1E40AF] to-[#1E40AF00]"></div>
                          <a target="_blank" className="inline-flex h-8 items-center justify-center min-w-20" href="https://www.ok9aa.com/aff/11129">
                            <Image alt="OK9 Logo" loading="lazy" width={56} height={36} decoding="async" className="object-cover h-7 w-full max-w-none" src="/vendor/ok-logo.png" />
                          </a>
                        </div>

                        {/* Other Commentators Button */}
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-8 px-3 py-[6px]" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" className="size-6" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M12.5 2C6.986 2 2.5 6.486 2.5 12V16.143C2.5 17.167 3.397 18 4.5 18H5.5C5.76522 18 6.01957 17.8946 6.20711 17.7071C6.39464 17.5196 6.5 17.2652 6.5 17V11.857C6.5 11.5918 6.39464 11.3374 6.20711 11.1499C6.01957 10.9624 5.76522 10.857 5.5 10.857H4.592C5.148 6.987 8.478 4 12.5 4C16.522 4 19.852 6.987 20.408 10.857H19.5C19.2348 10.857 18.9804 10.9624 18.7929 11.1499C18.6054 11.3374 18.5 11.5918 18.5 11.857V18C18.5 19.103 17.603 20 16.5 20H14.5V19H10.5V22H16.5C18.706 22 20.5 20.206 20.5 18C21.603 18 22.5 17.167 22.5 16.143V12C22.5 6.486 18.014 2 12.5 2Z" fill="url(#paint0_linear_310_39713)"></path>
                            <defs><linearGradient id="paint0_linear_310_39713" x1="22.5" y1="12" x2="2.5" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#3B82F6"></stop><stop offset="1" stopColor="#3B82F6"></stop></linearGradient></defs>
                          </svg>
                          <span className="text-muted-foreground text-base font-normal">Bình luận viên khác</span>
                          <div className="border px-2.5 py-0.5 transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 flex size-5 items-center justify-center rounded-full bg-white text-xs font-normal text-black hover:bg-white">2</div>
                        </button>

                        {/* Share Button */}
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-8 px-3 py-[6px]" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" className="size-6" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M15.17 3.07515C15.2963 3.01346 15.4373 2.98849 15.5771 3.00308C15.7168 3.01766 15.8497 3.07122 15.9605 3.15765L22.7105 8.40765C22.7975 8.47523 22.8686 8.56117 22.9186 8.65933C22.9687 8.75749 22.9965 8.86547 23 8.97559C23.0036 9.08572 22.9829 9.19528 22.9393 9.29648C22.8958 9.39769 22.8304 9.48805 22.748 9.56115L15.998 15.5611C15.8899 15.6571 15.7564 15.7198 15.6135 15.7417C15.4705 15.7636 15.3244 15.7437 15.1925 15.6844C15.0606 15.6251 14.9487 15.529 14.8702 15.4076C14.7917 15.2862 14.75 15.1447 14.75 15.0001V12.0841C14.396 12.1441 13.934 12.2491 13.394 12.4291C12.0845 12.8671 10.313 13.7476 8.531 15.5311C8.42197 15.6406 8.28179 15.7137 8.12964 15.7405C7.97748 15.7673 7.82078 15.7464 7.68093 15.6807C7.54108 15.6151 7.42492 15.5078 7.34833 15.3737C7.27173 15.2395 7.23844 15.085 7.253 14.9311C7.4675 12.5746 8.1545 10.8556 9.089 9.61665C9.89149 8.54765 10.9814 7.72882 12.2315 7.25565C13.0382 6.95067 13.8884 6.77648 14.75 6.73965V3.75015C14.7497 3.60958 14.7889 3.47177 14.8632 3.35242C14.9375 3.23307 15.0438 3.137 15.17 3.07515ZM3.5 8.25015C3.5 7.25559 3.89509 6.30176 4.59835 5.5985C5.30161 4.89524 6.25544 4.50015 7.25 4.50015H10.25C10.4489 4.50015 10.6397 4.57916 10.7803 4.71982C10.921 4.86047 11 5.05123 11 5.25015C11 5.44906 10.921 5.63982 10.7803 5.78048C10.6397 5.92113 10.4489 6.00015 10.25 6.00015H7.25C6.65326 6.00015 6.08097 6.2372 5.65901 6.65916C5.23705 7.08111 5 7.65341 5 8.25015V17.2501C5 17.8469 5.23705 18.4192 5.65901 18.8411C6.08097 19.2631 6.65326 19.5001 7.25 19.5001H16.25C16.8467 19.5001 17.419 19.2631 17.841 18.8411C18.2629 18.4192 18.5 17.8469 18.5 17.2501V15.7501C18.5 15.5512 18.579 15.3605 18.7197 15.2198C18.8603 15.0792 19.0511 15.0001 19.25 15.0001C19.4489 15.0001 19.6397 15.0792 19.7803 15.2198C19.921 15.3605 20 15.5512 20 15.7501V17.2501C20 18.2447 19.6049 19.1985 18.9017 19.9018C18.1984 20.6051 17.2446 21.0001 16.25 21.0001H7.25C6.25544 21.0001 5.30161 20.6051 4.59835 19.9018C3.89509 19.1985 3.5 18.2447 3.5 17.2501V8.25015Z" fill="url(#paint0_linear_310_39718)"></path>
                            <defs><linearGradient id="paint0_linear_310_39718" x1="23.0004" y1="11.9996" x2="3.5" y2="11.9996" gradientUnits="userSpaceOnUse"><stop stopColor="#3B82F6"></stop><stop offset="1" stopColor="#1E40AF"></stop></linearGradient></defs>
                          </svg>
                          <span className="text-muted-foreground text-base font-normal">Chia sẻ phiên trực tiếp</span>
                        </button>
                      </div>

                      {/* Main Match Info Card */}
                      <div className="mt-1 w-full shadow-[0px_0px_4px_4px_#1E40AF40] rounded border-2 p-2 border-blue-600 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 bg-cover bg-no-repeat opacity-30 rounded"></div>
                        <div className="relative z-10">
                          <div className="flex text-base w-full overflow-hidden">
                            <div className="flex flex-col lg:flex-row items-center w-full min-w-0">
                              {/* Left Section - BLV Info */}
                              <div className="flex items-start w-full lg:w-[60%] min-w-0 max-w-full">
                                <div className="flex flex-col gap-2 lg:gap-4 w-full min-w-0">
                                  <div className="flex items-center min-w-0 w-full">
                                    {/* BLV Avatar */}
                                    <div className="">
                                      <div className="size-10 sm:size-12 lg:size-14 flex-shrink-0 relative z-30" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                          <span className="text-white text-sm font-bold">GV</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Match Info with Gradient Design */}
                                    <div className="flex gap-1 sm:gap-2 lg:gap-3 min-w-0 flex-1 overflow-hidden mx-2">
                                      <div className="bg-gradient-to-l from-[#3B82F6] to-[#1E40AF] flex items-center rounded-bl-4xl rounded-tr-3xl p-0.5 px-1 lg:px-2 text-white -ml-2 sm:-ml-3 lg:-ml-4 min-w-0 flex-1 overflow-hidden">
                                        <div className="bg-white text-black font-bold p-1 px-1 sm:px-2 mx-1 ml-1 sm:ml-2 lg:ml-3 rounded-bl-xl rounded-tr-3xl min-w-0 w-16 sm:w-20 lg:w-auto flex-shrink-0">
                                          <div className="bg-gradient-to-l from-[#3B82F6] to-[#1E40AF] bg-clip-text text-transparent font-bold truncate text-xs lg:text-base" title="BLV Giàng A Voi">
                                            BLV Giàng A Voi
                                          </div>
                                        </div>
                                        <div className="relative flex-1 min-w-0 overflow-hidden">
                                          <div className="flex items-center px-1 sm:px-2 gap-1 lg:gap-1 min-w-0 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide">
                                            <span className="text-xs lg:text-base font-semibold whitespace-nowrap lg:truncate" title="Yunnan Yukun">Yunnan Yukun</span>
                                            <span className="text-sm lg:text-xl font-semibold flex-shrink-0">0</span>
                                            <span className="font-semibold flex-shrink-0 text-xs lg:text-base">-</span>
                                            <span className="text-sm lg:text-xl font-semibold flex-shrink-0">0</span>
                                            <span className="text-xs lg:text-base font-semibold whitespace-nowrap lg:truncate" title="Wuhan Three Towns">Wuhan Three Towns</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* BLV KHÁC Section */}
                                  <div className="flex items-center border border-blue-600 px-1 overflow-hidden flex-shrink-0 max-w-full rounded-bl-3xl rounded-tr-3xl">
                                    <div className="bg-gradient-to-l from-[#3B82F6] to-[#1E40AF] rounded-bl-3xl rounded-tr-3xl p-1 px-2 sm:px-2 text-white whitespace-nowrap text-xs lg:text-sm flex-shrink-0">
                                      BLV KHÁC
                                    </div>
                                    <div className="flex items-center min-w-0 flex-1 overflow-hidden">
                                      <div className="w-full !mx-1 min-w-0 !max-w-full">
                                        <div className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth-x">
                                          {[
                                            { name: 'Giàng A Sếu', avatar: '/ngoaihangtv.png' },
                                            { name: 'Giàng A Pháo', avatar: '/ngoaihangtv.png' },
                                            { name: 'Giàng A Ly', avatar: '/ngoaihangtv.png' },
                                            { name: 'Giàng A Hổ', avatar: '/ngoaihangtv.png' }
                                          ].map((blv, index) => (
                                            <a key={index} className="flex items-center gap-1 px-1 sm:px-2 min-w-0 hover:bg-gray-50 rounded transition-colors whitespace-nowrap flex-shrink-0" href="#">
                                              <div className="">
                                                <div className="size-5 sm:size-6 flex-shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                                                  <Image
                                                    src={blv.avatar}
                                                    alt={blv.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-full h-full object-cover"
                                                  />
                                                </div>
                                              </div>
                                              <span className="text-xs font-medium truncate">{blv.name}</span>
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Right Section - Sponsor Logos & Follow Button */}
                              <div className="items-center hidden lg:flex w-full lg:w-[45%] h-full justify-end lg:justify-center lg:gap-5 mt-2 lg:mt-0 lg:pl-4">
                                <div className="flex items-center gap-3 border-2 rounded-lg h-full px-4">
                                  <a target="_blank" className="lg:inline-flex hidden items-center justify-center h-12 lg:h-14 xl:h-16 min-w-20 xl:min-w-28" href="https://oklavip68.com/">
                                    <Image alt="OKVIP Logo" loading="lazy" width={100} height={60} decoding="async" className="object-contain h-8 lg:h-10 xl:h-12 w-auto max-w-none" src="/vendor/ok-logo.png" />
                                  </a>
                                  <div data-orientation="horizontal" role="none" className="shrink-0 my-4 h-[80%] w-1 bg-gradient-to-r from-[#3B82F600] via-[#1E40AF] to-[#1E40AF00]"></div>
                                  <a target="_blank" className="lg:inline-flex hidden items-center justify-center h-12 lg:h-14 xl:h-16 min-w-20 xl:min-w-28" href="https://www.ok9aa.com/aff/11129">
                                    <Image alt="OK9 Logo" loading="lazy" width={100} height={60} decoding="async" className="object-contain h-8 lg:h-10 xl:h-12 w-auto max-w-none" src="/vendor/ok-logo.png" />
                                  </a>
                                </div>
                                <div className="hidden lg:flex flex-col items-start flex-shrink-0 ml-2">
                                  <div className="flex items-center text-xs xl:text-sm font-light whitespace-nowrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                      <path d="M8.55467 14.8668C10.6387 14.4495 13.3333 12.9501 13.3333 9.07347C13.3333 5.54613 10.7513 3.1968 8.89467 2.11747C8.482 1.87747 8 2.1928 8 2.66947V3.88813C8 4.84947 7.596 6.60413 6.47333 7.33413C5.9 7.7068 5.28 7.1488 5.21067 6.4688L5.15333 5.91013C5.08667 5.2608 4.42533 4.8668 3.90667 5.2628C2.974 5.9728 2 7.21947 2 9.0728C2 13.8135 5.526 14.9995 7.28867 14.9995C7.39178 14.9995 7.49933 14.9961 7.61133 14.9895C6.74067 14.9155 5.33333 14.3755 5.33333 12.6288C5.33333 11.2621 6.33 10.3388 7.08733 9.8888C7.29133 9.7688 7.52933 9.92547 7.52933 10.1621V10.5555C7.52933 10.8555 7.646 11.3255 7.92267 11.6468C8.236 12.0108 8.69533 11.6295 8.732 11.1508C8.744 11.0001 8.896 10.9041 9.02667 10.9801C9.454 11.2301 10 11.7635 10 12.6288C10 13.9941 9.24733 14.6221 8.55467 14.8668Z" fill="url(#paint0_linear_2295_24237)"></path>
                                      <defs><linearGradient id="paint0_linear_2295_24237" x1="13.3333" y1="8.51731" x2="2" y2="8.51731" gradientUnits="userSpaceOnUse"><stop stopColor="#3B82F6"></stop><stop offset="1" stopColor="#1E40AF"></stop></linearGradient></defs>
                                    </svg>
                                    <span title="5226 người theo dõi">5226 theo dõi</span>
                                  </div>
                                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow-sm hover:bg-primary/90 py-2 h-7 rounded-full px-2 lg:h-8 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <path d="M8 12h8"></path>
                                      <path d="M12 8v8"></path>
                                    </svg>
                                    <span className="text-xs">Theo dõi</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>




              </div>

              {/* Chat Sidebar - 3 columns */}
              <aside className="lg:col-span-3">
                <div className="bg-white dark:bg-custom-dark lg:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-[500px] lg:h-[800px] flex flex-col lg:mx-0 -mx-4">
                  {/* Tab Navigation */}
                  <div className="p-3 overflow-x-auto">
                    <div className="flex min-w-max gap-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.index}
                          onClick={() => setActiveTab(tab.index)}
                          className={`flex-shrink-0 px-2 sm:px-3 py-0 text-center text-xs font-medium transition-all duration-200 whitespace-nowrap rounded-full flex items-center gap-0 ${activeTab === tab.index
                            ? "text-blue-600 border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                            : "text-gray-500 dark:text-gray-400 border-0 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                            } ${tab.index === 7 ? 'lg:hidden' : ''}`}
                        >
                          {activeTab === tab.index && (
                            <span className="font-large text-sm sm:text-md">{tab.label}</span>
                          )}
                          <div className="w-8 h-6 sm:w-10 sm:h-7 flex items-center justify-center">
                            <Image
                              src={activeTab === tab.index ? tab.iconActive : tab.icon}
                              alt={tab.label}
                              width={30}
                              height={30}
                              className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-200"
                            />
                          </div>

                        </button>
                      ))}

                      {/* Screen Lock Button - Mobile Only */}
                      <button
                        onClick={toggleScreenLock}
                        className={`lg:hidden flex-shrink-0 px-2 sm:px-3 py-1 sm:py-2 text-center text-xs font-medium transition-all duration-200 whitespace-nowrap rounded-full flex items-center gap-2 ${isScreenLocked
                          ? "text-green-600 border-2 border-green-600 bg-green-50 dark:bg-green-900/20 shadow-sm"
                          : "text-gray-500 dark:text-gray-400 border-0 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                          }`}
                      >
                        {isScreenLocked && (
                          <span className="font-medium text-xs">Đã khóa</span>
                        )}
                        <div className="w-8 h-6 sm:w-10 sm:h-7 flex items-center justify-center">
                          <Image
                            src={isScreenLocked ? "/icon/un-lock.svg" : "/icon/lock.svg"}
                            alt={isScreenLocked ? "Unlock" : "Lock"}
                            width={20}
                            height={20}
                            className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-200 ${isScreenLocked
                              ? "filter brightness-0 invert-[0.4] sepia-[1] saturate-[5] hue-rotate-[120deg]"
                              : "filter brightness-0 invert-[0.6] dark:invert-[0.4]"
                              }`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div
                    className="flex-1 overflow-y-auto relative"
                    ref={chatContainerRef}
                    onScroll={handleScroll}
                    style={{
                      // CSS để scroll tốt hơn khi bàn phím ảo hiện lên
                      scrollBehavior: 'smooth',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    {activeTab === 0 && (
                      <div className="h-full relative">
                        {/* Banner Thông số lên kèo - chỉ hiển thị trong tab chat */}
                        {showBanner && (
                          <div className="absolute top-0 left-0 right-0 mx-3 mt-3 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg animate-fade-in z-20">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                              <span className="text-white text-sm font-medium">🔥 Thông số lên kèo</span>
                            </div>
                            <div className="mt-2 text-white/90 text-xs">
                              Tỷ lệ cược đang được cập nhật real-time. Theo dõi để có thông tin mới nhất!
                            </div>
                          </div>
                        )}
                        <ChatTab
                          isLoggedIn={isLoggedIn}
                          onOpenAuthModal={openAuthModal}
                        />
                      </div>
                    )}

                    {activeTab === 1 && (
                      <div className="h-full">
                        <StatsTab />
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div className="h-full">
                        <CommentatorTab />
                      </div>
                    )}

                    {activeTab === 3 && (
                      <div className="h-full">
                        <LineupTab />
                      </div>
                    )}

                    {activeTab === 4 && (
                      /* Tỷ Lệ Tab */
                      <div className="h-full p-6 space-y-4">
                        <div className="text-center text-lg font-semibold text-gray-900 dark:text-white mb-6">Tỷ lệ cược</div>
                        <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
                          Tỷ lệ cược sẽ được cập nhật khi trận đấu bắt đầu
                        </div>
                      </div>
                    )}

                    {activeTab === 5 && (
                      <div className="h-full">
                        <HeadToHeadTab />
                      </div>
                    )}

                    {activeTab === 6 && (
                      /* Thông Tin Tab */
                      <div className="h-full p-6 space-y-4">
                        <div className="text-center text-lg font-semibold text-gray-900 dark:text-white mb-6">Thông tin trận đấu</div>
                        <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
                          Thông tin chi tiết sẽ được cập nhật khi trận đấu bắt đầu
                        </div>
                      </div>
                    )}

                    {activeTab === 7 && (
                      <div className="h-full">
                        <RelatedMatchesTab />
                      </div>
                    )}
                  </div>

                </div>
              </aside>
            </div>
          </div>
          {/* RelatedMatchesTab - Ẩn trên mobile vì đã có trong tab */}
          <div className="hidden lg:block">
            <RelatedMatchesTab />
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          initialMode={authMode}
          onModeChange={setAuthMode}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Floating Contact */}
        <FloatingContact />
      </div>
    </>
  );
} 