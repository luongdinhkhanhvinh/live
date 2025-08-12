const CACHE_NAME = 'ngoaihang-tv-v1';
const urlsToCache = [
  '/',
  '/bxh-va-lich-thi-dau',
  '/lich-truc-tiep/bong-da',
  '/tin-tuc',
  '/khuyen-mai',
  '/tuyen-dung',
  '/ty-so-cac-tran-va-giai-dau',
  '/manifest.webmanifest',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Use individual add calls instead of addAll to avoid errors
        const cachePromises = urlsToCache.map(url => {
          return cache.add(url).catch(err => {
            console.log('Failed to cache:', url, err);
            return Promise.resolve(); // Continue with other URLs
          });
        });
        return Promise.all(cachePromises);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Return offline page when both cache and network fail
        if (event.request.destination === 'document') {
          return caches.match('/offline.html');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Có trận đấu mới!',
    icon: '/web-app-manifest-192x192.png',
    badge: '/web-app-manifest-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Xem ngay',
        icon: '/web-app-manifest-192x192.png'
      },
      {
        action: 'close',
        title: 'Đóng',
        icon: '/web-app-manifest-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('NGOAIHANG TV', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
