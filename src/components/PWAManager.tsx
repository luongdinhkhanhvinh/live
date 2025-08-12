'use client';

import { useEffect, useState } from 'react';

interface PWAManagerProps {
  children: React.ReactNode;
}

export default function PWAManager({ children }: PWAManagerProps) {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  if (confirm('Có phiên bản mới! Bạn có muốn cập nhật?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      console.log('PWA was installed');
    };

    // Network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Event listeners
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
        // Subscribe to push notifications here
      }
    }
  };

  return (
    <>
      {children}
      
      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white text-center py-2 px-4 text-sm font-medium">
          🔴 Bạn đang offline - Một số tính năng có thể không hoạt động
        </div>
      )}

      {/* Notification Permission Request */}
      {!isInstalled && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={requestNotificationPermission}
            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-lg shadow-lg transition-colors"
            title="Bật thông báo"
          >
            🔔
          </button>
        </div>
      )}
    </>
  );
}
