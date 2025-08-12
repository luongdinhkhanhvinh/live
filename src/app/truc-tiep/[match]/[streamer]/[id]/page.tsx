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
import { useScreenLock } from "@/components/ScreenLockContext";

type Params = { match?: string; streamer?: string; id?: string };



export default function LiveDetail({ params }: { params: Promise<Params> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isScreenLocked, setIsScreenLocked } = useScreenLock();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

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

  const handleLoginSuccess = (userData: any) => {
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



  const tabs = [
    { index: 0, label: "Chat", icon: "💬" },
    { index: 1, label: "Thông Số", icon: "📊" },
    { index: 2, label: "Bình luận viên", icon: "🎤" },
    { index: 3, label: "Đội Hình", icon: "⚽" },
    { index: 4, label: "Tỷ Lệ", icon: "💰" },
    { index: 5, label: "Đối Đầu", icon: "⚔️" },
    { index: 6, label: "Thông Tin", icon: "ℹ️" },
    { index: 7, label: "Trận đấu liên quan", icon: "🏆" },
  ];

  return (
    <>
              <div className="min-h-screen bg-white dark:bg-gray-900 w-full" style={{ margin: 0, padding: 0 }}>
        {/* Screen Lock Overlay */}
        {isScreenLocked && (
          <div className="fixed top-0 left-0 right-0 z-[9998] bg-blue-600 dark:bg-blue-700 text-white text-center py-2 px-4 text-sm font-medium">
            🔒 Màn hình đã được khóa - Chỉ hiển thị video và chat
          </div>
        )}
        
        <div className="w-full">
          {/* Main Content */}
          <div className={`${isScreenLocked ? 'pt-0' : 'py-6'} px-0`}>
            <div className="lg:grid lg:grid-cols-10 gap-6 w-full">
              {/* Video Player - 7 columns */}
              <div className="lg:col-span-7 w-full">
                {/* Match Header */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-600">Trực tiếp</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Premier League 2024/25 • Vòng 15</span>
                  </div>
                </div>

                {/* Video Player - Full Width */}
                <div className="relative -mx-4 lg:mx-0">
                  <VideoPlayer 
                    videoUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                    autoPlay={true}
                    muted={false}
                    volume={0.7}
                    theme="#0f1214"
                    className="lg:rounded-xl lg:border lg:border-zinc-200"
                  />
                </div>



                {/* Team Names - Desktop Only */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6 lg:block hidden">
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Manchester United</span>
                    <span className="text-gray-400 dark:text-gray-500">vs</span>
                    <span>Liverpool</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span>BLV: {decodeURIComponent(resolvedParams.streamer ?? "")}</span>
                  </div>
                </div>

                {/* Related Matches - Desktop Only */}
                <div className="mt-6 lg:block hidden">
                  <RelatedMatchesTab />
                </div>
              </div>

                              {/* Chat Sidebar - 3 columns */}
                <aside className="lg:col-span-3">
                  <div className="bg-white dark:bg-gray-800 lg:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-[500px] lg:h-[800px] flex flex-col lg:mx-0 -mx-4">
                  {/* Tab Navigation */}
                  <div className="p-3 overflow-x-auto">
                    <div className="flex min-w-max gap-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.index}
                          onClick={() => setActiveTab(tab.index)}
                          className={`flex-shrink-0 px-3 py-2 text-center text-xs font-medium transition-all duration-200 whitespace-nowrap rounded-full ${
                            activeTab === tab.index
                              ? "text-blue-600 border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                              : "text-gray-500 dark:text-gray-400 border-0 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                          }`}
                        >
                          {activeTab === tab.index && (
                            <span className="mr-2 font-medium">{tab.label}</span>
                          )}
                          <span className="text-base">{tab.icon}</span>
                        </button>
                      ))}
                      
                      {/* Screen Lock Button - Mobile Only */}
                      <button
                        onClick={toggleScreenLock}
                        className={`lg:hidden flex-shrink-0 px-3 py-2 text-center text-xs font-medium transition-all duration-200 whitespace-nowrap rounded-full ${
                          isScreenLocked
                            ? "text-green-600 border-2 border-green-600 bg-green-50 dark:bg-green-900/20 shadow-sm"
                            : "text-gray-500 dark:text-gray-400 border-0 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className="text-base">{isScreenLocked ? "🔒" : "🔓"}</span>
                        {isScreenLocked && (
                          <span className="ml-2 font-medium text-xs">Đã khóa</span>
                        )}
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
                      <div className="h-full">
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

                  {/* Team Info & BLV - Below Tabs (Mobile Only) */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 lg:hidden">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <span>Manchester United</span>
                        <span className="text-gray-400 dark:text-gray-500">vs</span>
                        <span>Liverpool</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span>BLV: {decodeURIComponent(resolvedParams.streamer ?? "")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
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