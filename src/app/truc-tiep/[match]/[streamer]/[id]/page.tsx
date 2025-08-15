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
                <div className="bg-white dark:bg-custom-dark rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3">
                  <div className="text-left text-sm text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-3">
                    Chinese Football Super League - Yunnan Yukun VS Wuhan Three Towns FC - 19:00 - 15/08/2025
                  </div>
                </div>

                {/* Main Match Card - Contains Status + Video */}
                <div className="bg-white dark:bg-custom-dark rounded-lg shadow-sm overflow-hidden">
                  {/* Match Status - Above Video */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-6">
                      {/* Home Team */}
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900 dark:text-white">Yunnan Yukun</span>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-gray-600">
                          <Image
                            src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
                            alt="Yunnan Yukun"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover p-1"
                          />
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">0-0</div>

                      {/* Away Team */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-gray-200 dark:border-gray-600">
                          <Image
                            src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
                            alt="Wuhan Three Towns FC"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover p-1"
                          />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">Wuhan Three Towns FC</span>
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
                      className="w-full"
                    />
                  </div>

                  {/* Commentator Section - Inside Video Card */}
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    {/* Current Commentator - Top Section */}
                    <div className="bg-transparent p-4 text-blue-900 dark:text-blue-100">
                      <div className="flex items-center gap-4">
                        {/* Avatar + Tên BLV + Thông tin trận đấu */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="w-12 h-12 overflow-hidden bg-blue-500 border-2 border-blue-600" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                            <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">GV</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="font-medium text-lg">BLV Giàng A Voi</div>
                            <div className="text-base font-bold opacity-90">Yunnan Yukun 0 - 0 Wuhan Three Towns</div>
                          </div>
                        </div>

                        {/* Tên đội nhà 0 - 0 Tên đội khách - Đã di chuyển lên trên */}
                        <div className="flex-1">
                          {/* Để trống để các phần khác căn chỉnh */}
                        </div>

                        {/* Số lượt xem */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-xs opacity-80">2.5k đang xem</div>
                        </div>

                        {/* Logo nhà tài trợ */}
                        <div className="flex-shrink-0">
                          <div className="h-8 overflow-hidden">
                            <Image
                              src="/vendor/ok-logo.png"
                              alt="Nhà tài trợ"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Số lượt theo dõi và nút theo dõi */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-xs opacity-80 mb-1">5.2k theo dõi</div>
                                                  <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs font-medium text-white transition-colors">
                          Theo dõi
                        </button>
                        </div>
                      </div>
                    </div>

                    {/* Other Commentators - Bottom Section */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">BLV KHÁC</span>
                        <div className="flex gap-2">
                          {[
                            { initials: 'GS', name: 'Giàng A Sếu', gradient: 'from-green-400 to-blue-500' },
                            { initials: 'GL', name: 'Giàng A Ly', gradient: 'from-purple-400 to-pink-500' },
                            { initials: 'GH', name: 'Giàng A Hổ', gradient: 'from-orange-400 to-red-500' }
                          ].map((blv, index) => (
                            <div key={index} className="flex items-center gap-2 px-2">
                              <div className="w-6 h-6 overflow-hidden" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                                <div className={`w-full h-full bg-gradient-to-br ${blv.gradient} flex items-center justify-center`}>
                                  <span className="text-white text-xs font-bold">{blv.initials}</span>
                                </div>
                              </div>
                              <span className="text-xs font-medium text-gray-900 dark:text-white">{blv.name}</span>
                            </div>
                          ))}
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
            <RelatedMatchesTab />
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