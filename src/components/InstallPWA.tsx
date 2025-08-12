'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    // Event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Có thể cài đặt PWA
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setCanInstall(false);
    } else {
      // Không thể cài đặt PWA, hiển thị hướng dẫn chi tiết
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocalhost) {
        alert(`🚀 NGOAIHANG TV - Hướng dẫn cài đặt PWA

📱 **Trên Mobile (Chrome/Edge):**
1. Nhấn vào menu 3 chấm (⋮) ở góc phải
2. Chọn "Thêm vào màn hình chính" hoặc "Install app"

📱 **Trên Mobile (Safari):**
1. Nhấn nút "Chia sẻ" (□↑)
2. Chọn "Thêm vào màn hình chính"

💻 **Trên Desktop:**
1. F12 → Application → Manifest → Install
2. Hoặc nhấn vào biểu tượng cài đặt (➕) trên thanh địa chỉ

⚠️ **Lưu ý:** 
- Biểu tượng cài đặt chỉ xuất hiện khi website được deploy lên HTTPS
- Trên localhost, sử dụng DevTools để cài đặt PWA
- **PWA trên mobile sẽ KHÔNG có thanh search/địa chỉ**

🔧 **Kiểm tra PWA:**
F12 → Application → Manifest để xem trạng thái PWA`);
      } else {
        // Trên production, hướng dẫn theo trình duyệt
        if (navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Edge')) {
          alert('🚀 Để cài đặt NGOAIHANG TV:\n\n1. Nhấn vào biểu tượng cài đặt (➕) trên thanh địa chỉ\n2. Chọn "Cài đặt NGOAIHANG TV"\n\nNếu không thấy biểu tượng, hãy thử:\n- Refresh trang\n- Đợi vài giây\n- Kiểm tra kết nối mạng\n- F12 → Application → Manifest để kiểm tra PWA\n\n📱 **Sau khi cài đặt PWA trên mobile:**\n- Không có thanh search/địa chỉ\n- Giao diện giống app native');
        } else if (navigator.userAgent.includes('Safari')) {
          alert('🚀 Để cài đặt NGOAIHANG TV:\n\n1. Nhấn "Chia sẻ" (□↑)\n2. Chọn "Thêm vào màn hình chính"\n\n📱 **Sau khi cài đặt PWA trên mobile:**\n- Không có thanh search/địa chỉ\n- Giao diện giống app native');
        } else {
          alert('🚀 NGOAIHANG TV\n\nTrình duyệt này không hỗ trợ cài đặt PWA.\nVui lòng sử dụng Chrome, Edge hoặc Safari để có trải nghiệm tốt nhất!\n\n📱 **PWA trên mobile:**\n- Không có thanh search/địa chỉ\n- Giao diện giống app native');
        }
      }
    }
  };

  // Không hiển thị nếu đã cài đặt
  if (isInstalled) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
        canInstall 
          ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
      }`}
      title={canInstall ? "🎉 Cài đặt NGOAIHANG TV ngay!" : "📱 Hướng dẫn cài đặt PWA"}
    >
      <span className="text-lg">
        {canInstall ? '🎉' : '📱'}
      </span>
      <span className="hidden sm:inline">
        {canInstall ? 'Cài App' : 'Cài App'}
      </span>
    </button>
  );
}
