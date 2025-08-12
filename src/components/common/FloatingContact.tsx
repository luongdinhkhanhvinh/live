"use client";

import { useState, useRef, useEffect, useCallback } from 'react';

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Khởi tạo vị trí mặc định (góc phải dưới)
  useEffect(() => {
    const updatePosition = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      setPosition({
        x: viewportWidth - 100, // 100px từ phải
        y: viewportHeight - 100  // 100px từ dưới
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTelegram = () => {
    // Mở Telegram
    window.open('https://t.me/your_telegram', '_blank');
  };

  const handleZalo = () => {
    // Mở Zalo
    window.open('https://zalo.me/your_zalo', '_blank');
  };

  // Xử lý bắt đầu drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  // Xử lý drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Giới hạn không cho kéo ra ngoài màn hình
      const maxX = window.innerWidth - 32; // 32px = w-8
      const maxY = window.innerHeight - 32;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  }, [isDragging, dragOffset]);

  // Xử lý kết thúc drag
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Thêm event listeners cho drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef}
      className="fixed z-40 select-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(0, 0)'
      }}
    >
      {/* Main Button */}
      <div 
        className="w-8 h-8 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <button
          onClick={toggleExpanded}
          className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label="Liên hệ"
        >
                  <svg 
          className="w-4 h-4 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </button>
      </div>

      {/* Telegram Icon */}
      <button
        onClick={handleTelegram}
        className={`absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
          isExpanded 
            ? 'translate-y-[-3rem] translate-x-[-3rem] opacity-100 scale-100' 
            : 'translate-y-0 translate-x-0 opacity-0 scale-75 pointer-events-none'
        } ${isDragging ? 'pointer-events-none' : ''}`}
        aria-label="Telegram"
      >
        <svg 
          className="w-4 h-4 mx-auto" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </button>

      {/* Zalo Icon */}
      <button
        onClick={handleZalo}
        className={`absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
          isExpanded 
            ? 'translate-y-[-1.5rem] translate-x-[-4.5rem] opacity-100 scale-100' 
            : 'translate-y-0 translate-x-0 opacity-0 scale-75 pointer-events-none'
        } ${isDragging ? 'pointer-events-none' : ''}`}
        aria-label="Zalo"
      >
        <svg 
          className="w-6 h-6 mx-auto" 
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      </button>

    </div>
  );
} 