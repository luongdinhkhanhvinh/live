"use client";

import { useState, useRef, useEffect } from 'react';

interface ChatTabProps {
  isLoggedIn: boolean;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
}

export default function ChatTab({ isLoggedIn, onOpenAuthModal }: ChatTabProps) {
  const [message, setMessage] = useState('');
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLInputElement | null>(null);

  // Mock chat messages
  const localChatMessages = [
    { id: 1, user: 'Nguyen Van A', message: 'Trận đấu này thật sự rất hay!', time: '2 phút trước', avatar: 'N' },
    { id: 2, user: 'Tran Thi B', message: 'Đội nào sẽ thắng nhỉ?', time: '3 phút trước', avatar: 'T' },
    { id: 3, user: 'Le Van C', message: 'Cầu thủ số 10 đá rất tốt', time: '4 phút trước', avatar: 'L' },
    { id: 4, user: 'Pham Thi D', message: 'Tôi nghĩ sẽ hòa 1-1', time: '5 phút trước', avatar: 'P' },
    { id: 5, user: 'Hoang Van E', message: 'Đội khách đang áp đảo', time: '6 phút trước', avatar: 'H' },
    { id: 6, user: 'Vu Thi F', message: 'Bàn thắng sắp đến rồi!', time: '7 phút trước', avatar: 'V' },
    { id: 7, user: 'Dang Van G', message: 'Thủ môn đang rất xuất sắc', time: '8 phút trước', avatar: 'D' },
    { id: 8, user: 'Bui Thi H', message: 'Trận đấu này quyết định chức vô địch', time: '9 phút trước', avatar: 'B' },
    { id: 9, user: 'Ngo Van I', message: 'Tôi đã đặt cược cho đội chủ nhà', time: '10 phút trước', avatar: 'N' },
    { id: 10, user: 'Do Thi K', message: 'Cầu thủ này đang bị thẻ vàng', time: '11 phút trước', avatar: 'D' },
    { id: 11, user: 'Ly Van L', message: 'Đội hình 4-3-3 đang hoạt động tốt', time: '12 phút trước', avatar: 'L' },
    { id: 12, user: 'Mai Thi M', message: 'Tôi thích cách huấn luyện viên điều binh', time: '13 phút trước', avatar: 'M' },
    { id: 13, user: 'Truong Van N', message: 'Bàn thắng đẹp quá!', time: '14 phút trước', avatar: 'T' },
    { id: 14, user: 'Nguyen Thi O', message: 'Đội này đang thiếu may mắn', time: '15 phút trước', avatar: 'N' },
    { id: 15, user: 'Tran Van P', message: 'Tôi nghĩ sẽ có penalty', time: '16 phút trước', avatar: 'T' },
    { id: 16, user: 'Le Thi Q', message: 'Cầu thủ này đang bị chấn thương', time: '17 phút trước', avatar: 'L' },
    { id: 17, user: 'Pham Van R', message: 'Đội hình 3-5-2 đang phòng thủ tốt', time: '18 phút trước', avatar: 'P' },
    { id: 18, user: 'Hoang Thi S', message: 'Tôi thích cách đội này tấn công', time: '19 phút trước', avatar: 'H' },
    { id: 19, user: 'Vu Van T', message: 'Bàn thắng này sẽ quyết định trận đấu', time: '20 phút trước', avatar: 'V' },
    { id: 20, user: 'Dang Thi U', message: 'Đội này đang thiếu sự sáng tạo', time: '21 phút trước', avatar: 'D' },
  ];

  // Auto-scroll to bottom when component mounts
  useEffect(() => {
    // Thêm delay nhỏ để đảm bảo DOM đã được render
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isScrolledUp = scrollTop < scrollHeight - clientHeight - 100;
      setShowScrollToBottom(isScrolledUp);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // Sử dụng scrollTop để scroll trong container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

      // Fallback: sử dụng scrollIntoView nếu cần
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full relative" style={{ 
      // CSS để field chat có thể float trên bàn phím ảo
      paddingBottom: 'env(safe-area-inset-bottom, 0px)'
    }}>
      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto p-6 relative"
        ref={chatContainerRef}
        onScroll={handleScroll}
        style={{
          // Thêm padding bottom để tránh bị che bởi field input
          paddingBottom: isLoggedIn && isInputFocused ? '80px' : '20px'
        }}
      >
        {/* Messages */}
        <div className="space-y-3">
          {localChatMessages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: `hsl(${(msg.id * 137.5) % 360}, 70%, 50%)` }}
              >
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline space-x-2">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">{msg.user}:</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{msg.message}</span>
                </div>
              </div>
            </div>
          ))}

        </div>



        {/* Login to comment card */}
        {!isLoggedIn && (
          <div
            className="mt-4 p-4 bg-white dark:bg-custom-dark border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer relative z-20 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            onClick={() => onOpenAuthModal('login')}
          >
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Đăng nhập để bình luận</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Overlay mờ che toàn bộ content chat */}
      {/* {!isLoggedIn && (
        <div className="absolute inset-0 bg-white/90 dark:bg-custom-dark/90 backdrop-blur-sm pointer-events-none z-10" />
      )} */}

      {/* Message Input - Chỉ hiện khi đã đăng nhập */}
      {isLoggedIn && (
        <div className={`border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 p-3 z-30 ${isInputFocused ? 'fixed bottom-0 left-0 right-0 z-50' : 'relative'}`} style={{
          // CSS để field chat thông minh - fixed khi focus, relative khi không focus
          backgroundColor: 'var(--tw-bg-opacity, 1)',
          backdropFilter: isInputFocused ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: isInputFocused ? 'blur(8px)' : 'none',
          boxShadow: isInputFocused ? '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
          // Responsive với safe area chỉ khi focus
          paddingBottom: isInputFocused ? 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' : '0.75rem',
          paddingLeft: isInputFocused ? 'calc(0.75rem + env(safe-area-inset-left, 0px))' : '0.75rem',
          paddingRight: isInputFocused ? 'calc(0.75rem + env(safe-area-inset-right, 0px))' : '0.75rem'
        }}>
          <div className="relative">
            <input
              ref={chatInputRef}
              type="text"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 pr-12 pl-6 py-2 px-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 bg-white dark:bg-custom-dark text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              inputMode="text"
              enterKeyHint="send"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={handleSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-1.5 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <svg className="h-4 w-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Scroll to bottom button - Moved below input field */}
      {showScrollToBottom && (
        <div className="absolute bottom-[70px] right-4 z-20">
          <button
            onClick={scrollToBottom}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
            title="Scroll xuống tin nhắn mới nhất"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 