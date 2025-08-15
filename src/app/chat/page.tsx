"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  isRead: boolean;
  type?: 'text' | 'image' | 'file';
  attachment?: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isTyping?: boolean;
}

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "/ngoaihangtv.png",
      lastMessage: "Trận đấu này thật sự rất hay!",
      lastMessageTime: "2 phút trước",
      unreadCount: 3,
      isOnline: true
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "/ngoaihangtv.png",
      lastMessage: "Đội nào sẽ thắng nhỉ?",
      lastMessageTime: "5 phút trước",
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "/ngoaihangtv.png",
      lastMessage: "Cầu thủ số 10 đá rất tốt",
      lastMessageTime: "1 giờ trước",
      unreadCount: 1,
      isOnline: true,
      isTyping: true
    },
    {
      id: 4,
      name: "Phạm Thị D",
      avatar: "/ngoaihangtv.png",
      lastMessage: "Tôi nghĩ sẽ hòa 1-1",
      lastMessageTime: "2 giờ trước",
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      avatar: "/ngoaihangtv.png",
      lastMessage: "Đội khách đang áp đảo",
      lastMessageTime: "3 giờ trước",
      unreadCount: 0,
      isOnline: true
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Chào bạn! Bạn có xem trận đấu tối qua không?",
      sender: 'other',
      timestamp: '10:30',
      isRead: true,
      type: 'text'
    },
    {
      id: 2,
      text: "Có chứ! Trận đấu thật sự rất hay!",
      sender: 'me',
      timestamp: '10:32',
      isRead: true,
      type: 'text'
    },
    {
      id: 3,
      text: "Bạn nghĩ đội nào sẽ thắng?",
      sender: 'other',
      timestamp: '10:33',
      isRead: true,
      type: 'text'
    },
    {
      id: 4,
      text: "Tôi nghĩ đội chủ nhà sẽ thắng 2-1",
      sender: 'me',
      timestamp: '10:35',
      isRead: true,
      type: 'text'
    },
    {
      id: 5,
      text: "Tôi cũng nghĩ vậy! Cầu thủ số 10 đang chơi rất tốt",
      sender: 'other',
      timestamp: '10:36',
      isRead: false,
      type: 'text'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close sidebar when conversation is selected on mobile
  useEffect(() => {
    if (selectedConversation && window.innerWidth < 640) {
      setShowSidebar(false);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {
      const newMessage: Message = {
        id: Date.now(),
        text: message.trim(),
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('vi-VN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isRead: false,
        type: 'text'
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Update conversation last message
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, lastMessage: message.trim(), lastMessageTime: 'Vừa xong' }
          : conv
      ));

      // Simulate typing indicator
      setTimeout(() => {
        const typingMessage: Message = {
          id: Date.now() + 1,
          text: "Đang nhập tin nhắn...",
          sender: 'other',
          timestamp: new Date().toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          isRead: false,
          type: 'text'
        };
        setMessages(prev => [...prev, typingMessage]);

        // Remove typing message after 2 seconds
        setTimeout(() => {
          setMessages(prev => prev.filter(msg => msg.id !== typingMessage.id));
        }, 2000);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedConversation) {
      const newMessage: Message = {
        id: Date.now(),
        text: `Đã gửi file: ${file.name}`,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('vi-VN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isRead: false,
        type: 'file',
        attachment: file.name
      };

      setMessages(prev => [...prev, newMessage]);
      setShowFilePicker(false);

      // Update conversation last message
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, lastMessage: `File: ${file.name}`, lastMessageTime: 'Vừa xong' }
          : conv
      ));
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (time: string) => {
    if (time === 'Vừa xong') return time;
    return time;
  };

  const emojis = ['😀', '😂', '❤️', '👍', '🎉', '⚽', '🏆', '🔥', '💯', '😎'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-custom-dark">
      <div className="flex h-screen relative">
        {/* Mobile Overlay */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar - Conversations List */}
        <div className={`fixed sm:relative inset-y-0 left-0 z-50 sm:z-auto transform transition-transform duration-300 ease-in-out ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 w-80 bg-white dark:bg-custom-dark border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Chat</h1>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {/* Mobile close button */}
                <button 
                  className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  onClick={() => setShowSidebar(false)}
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Search */}
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Tìm kiếm tin nhắn..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar with online status */}
                  <div className="relative">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>

                  {/* Conversation info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
                        {conversation.isTyping ? (
                          <span className="text-blue-600 dark:text-blue-400 italic">
                            Đang nhập tin nhắn...
                          </span>
                        ) : (
                          conversation.lastMessage
                        )}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-custom-dark">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Mobile menu button */}
                    <button 
                      className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      onClick={() => setShowSidebar(true)}
                    >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    
                    <Image
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedConversation.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedConversation.isOnline ? 'Đang hoạt động' : 'Không hoạt động'}
                        {selectedConversation.isTyping && (
                          <span className="ml-2 text-blue-600 dark:text-blue-400">
                            • Đang nhập tin nhắn...
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                      msg.sender === 'me'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                    }`}>
                      {msg.type === 'file' ? (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-xs sm:text-sm">{msg.attachment}</span>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                      )}
                      <p className={`text-xs mt-2 ${
                        msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {msg.timestamp}
                        {msg.sender === 'me' && (
                          <span className="ml-2">
                            {msg.isRead ? '✓✓' : '✓'}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark relative">
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-3 sm:left-4 mb-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2 z-50">
                    <div className="grid grid-cols-5 gap-2">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => addEmoji(emoji)}
                          className="w-8 h-8 text-xl hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* File Picker */}
                {showFilePicker && (
                  <div className="absolute bottom-full left-3 sm:left-4 mb-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-3 z-50">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Chọn file</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Emoji Button */}
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
                  >
                    <span className="text-lg sm:text-xl">😀</span>
                  </button>

                  {/* File Attachment Button */}
                  <button 
                    onClick={() => setShowFilePicker(!showFilePicker)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nhập tin nhắn..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-2 sm:p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Welcome Screen */
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Chào mừng đến với Chat
                </h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Chọn một cuộc trò chuyện để bắt đầu nhắn tin
                </p>
                
                {/* Mobile: Show conversations button */}
                <button
                  className="sm:hidden mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => setShowSidebar(true)}
                >
                  Xem cuộc trò chuyện
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
