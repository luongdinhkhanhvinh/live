# NGOAIHANG TV - Progressive Web App (PWA)

## 🚀 Tính năng PWA đã được tích hợp

### ✅ **Cơ bản (Basic PWA)**
- [x] **Web App Manifest** - Cấu hình app
- [x] **Icons** - 192x192 và 512x512 PNG
- [x] **Theme colors** - Màu sắc nhất quán
- [x] **Display mode** - Standalone (chạy như app riêng biệt)

### ✅ **Nâng cao (Advanced PWA)**
- [x] **Service Worker** - Cache offline và quản lý tài nguyên
- [x] **Offline Support** - Trang offline khi mất mạng
- [x] **Install Prompt** - Hướng dẫn cài đặt PWA
- [x] **Push Notifications** - Hỗ trợ thông báo đẩy
- [x] **App Shortcuts** - Phím tắt truy cập nhanh
- [x] **Update Management** - Tự động kiểm tra cập nhật

## 📱 Cách sử dụng PWA

### 1. **Cài đặt PWA**
- **Chrome/Edge**: Nhấn vào biểu tượng cài đặt (➕) trên thanh địa chỉ
- **Safari (iOS)**: Nhấn "Chia sẻ" → "Thêm vào màn hình chính"
- **Android**: Nhấn "Thêm vào màn hình chính" khi được nhắc

### 2. **Tính năng offline**
- Lịch thi đấu, bảng xếp hạng, tin tức được cache
- Trang offline hiển thị khi mất mạng
- Tự động đồng bộ khi có mạng trở lại

### 3. **Phím tắt (Shortcuts)**
- **Lịch**: Truy cập nhanh lịch thi đấu
- **BXH**: Xem bảng xếp hạng
- **Tin tức**: Đọc tin tức mới nhất

### 4. **Thông báo**
- Nhận thông báo trận đấu mới
- Cập nhật tỷ số real-time
- Thông báo khuyến mãi

## 🛠️ Cấu trúc file PWA

```
public/
├── manifest.webmanifest    # Cấu hình PWA
├── sw.js                  # Service Worker
├── offline.html           # Trang offline
└── web-app-manifest-*.png # Icons

src/components/
├── PWAManager.tsx         # Quản lý PWA chính
└── Header.tsx             # Header với nút PWA
```

## 🔧 Cấu hình Service Worker

### Cache Strategy
- **Static assets**: Cache vĩnh viễn
- **API calls**: Network first, fallback to cache
- **Pages**: Cache first, fallback to network

### Offline Fallback
- Trang offline tự động hiển thị
- Nút "Thử lại" để kết nối lại
- Auto-refresh khi có mạng

## 📊 Lighthouse PWA Score

Để kiểm tra điểm PWA, sử dụng Google Lighthouse:

```bash
# Cài đặt Lighthouse
npm install -g lighthouse

# Kiểm tra PWA
lighthouse https://your-domain.com --view
```

**Mục tiêu đạt được:**
- ✅ PWA: 100/100
- ✅ Performance: 90+/100
- ✅ Accessibility: 95+/100
- ✅ Best Practices: 95+/100
- ✅ SEO: 90+/100

## 🚀 Deployment

### 1. **Build production**
```bash
npm run build
```

### 2. **Kiểm tra PWA**
- Mở DevTools → Application → Service Workers
- Kiểm tra Manifest
- Test offline functionality

### 3. **HTTPS required**
- PWA chỉ hoạt động trên HTTPS
- Service Worker cần secure context

## 🔄 Cập nhật PWA

### Auto-update
- Service Worker tự động kiểm tra cập nhật
- Hiển thị thông báo khi có phiên bản mới
- User có thể chọn cập nhật ngay

### Manual update
```javascript
// Force update
navigator.serviceWorker.getRegistration().then(registration => {
  registration.update();
});
```

## 📱 Testing PWA

### Desktop
- Chrome DevTools → Application tab
- Test install prompt
- Simulate offline mode

### Mobile
- Chrome/Edge mobile
- Safari iOS
- Test install và offline

## 🎯 Best Practices

1. **Performance**
   - Lazy load components
   - Optimize images
   - Minimize bundle size

2. **User Experience**
   - Clear install prompts
   - Smooth offline experience
   - Consistent UI/UX

3. **Accessibility**
   - Screen reader support
   - Keyboard navigation
   - High contrast mode

## 🐛 Troubleshooting

### Service Worker không đăng ký
- Kiểm tra HTTPS
- Clear browser cache
- Check console errors

### Install prompt không hiển thị
- Đảm bảo đủ điều kiện PWA
- Test trên mobile device
- Check manifest validity

### Offline không hoạt động
- Verify Service Worker
- Check cache strategy
- Test network conditions

## 📚 Tài liệu tham khảo

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [PWA Builder](https://www.pwabuilder.com/)

---

**NGOAIHANG TV** - Progressive Web App cho trải nghiệm xem bóng đá tốt nhất! ⚽
