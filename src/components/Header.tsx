"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useTheme } from "./ThemeProvider";
import { useScreenLock } from "./ScreenLockContext";
import InstallPWA from "./InstallPWA";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { theme, toggleTheme } = useTheme();
  const { isScreenLocked } = useScreenLock();
  const isDarkMode = theme === 'dark';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when opening auth modal
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    // Reset authMode về login khi đóng modal
    setAuthMode('login');
  };

  // Ẩn header khi màn hình bị khóa
  if (isScreenLocked) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70 shadow-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/ngoaihangtv.png" 
              alt="NGOAIHANG TV Logo" 
              width={120} 
              height={32} 
              priority 
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">TRANG CHỦ</Link>
            <Link href="/lich-truc-tiep/bong-da" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LỊCH TRỰC TIẾP</Link>
            <Link href="/ty-so-cac-tran-va-giai-dau" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">TỶ SỐ</Link>
            <Link href="/bxh-va-lich-thi-dau/lich-thi-dau" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">BXH & LỊCH THI ĐẤU</Link>
            <Link href="/khuyen-mai" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">KHUYẾN MÃI</Link>
            
            {/* TIN TỨC & TUYỂN DỤNG Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                TIN TỨC & TUYỂN DỤNG
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/tin-tuc" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-t-lg">
                  TIN TỨC
                </Link>
                <Link href="/tuyen-dung" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-b-lg">
                  TUYỂN DỤNG
                </Link>
              </div>
            </div>
          </nav>
          
          <div className="flex items-center gap-3">
            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors"
              title={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
            >
              {isDarkMode ? (
                // Sun icon for dark mode
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon icon for light mode
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* PWA Install Button */}
            <InstallPWA />
            
            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => openAuthModal('login')}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                ĐĂNG NHẬP
              </button>
              <button 
                onClick={() => openAuthModal('register')}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                ĐĂNG KÝ
              </button>
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-3 space-y-3">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link 
                  href="/" 
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TRANG CHỦ
                </Link>
                <Link 
                  href="/lich-truc-tiep/bong-da" 
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  LỊCH TRỰC TIẾP
                </Link>
                <Link 
                  href="/ty-so-cac-tran-va-giai-dau" 
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TỶ SỐ
                </Link>
                <Link 
                  href="/bxh-va-lich-thi-dau/lich-thi-dau" 
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  BXH & LỊCH THI ĐẤU
                </Link>
                <Link 
                  href="/khuyen-mai" 
                  className="block px-3 py-2 text-sm text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  KHUYẾN MÃI
                </Link>
                <Link 
                  href="/tin-tuc" 
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TIN TỨC
                </Link>
                <Link 
                  href="/tuyen-dung" 
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TUYỂN DỤNG
                </Link>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
              
              {/* Auth Buttons for Mobile */}
              <div className="flex gap-2">
                <button 
                  onClick={() => openAuthModal('login')}
                  className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  Đăng nhập
                </button>
                <button 
                  onClick={() => openAuthModal('register')}
                  className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal}
        initialMode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
} 