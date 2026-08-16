# BOOSTLY — Social Media Marketing Platform (React + Vite)

Dự án website dịch vụ marketing tăng trưởng mạng xã hội đa nền tảng (Facebook, TikTok, Instagram, YouTube), được xây dựng bằng **React 18 + Vite + TailwindCSS**, tối ưu hoàn hảo cho cả máy tính và điện thoại di động (iOS / Android), sẵn sàng deploy lên **Vercel** chỉ với 1 cú click.

---

## 🚀 Hướng Dẫn Triển Khai Lên Vercel (Khuyên Dùng)

### Cách 1: Deploy thông qua GitHub (Cách đơn giản và tự động nhất)

1. **Đẩy mã nguồn lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: migrate to React Vite & mobile optimization"
   git branch -M main
   git remote add origin <URL-REPOSITORY-GITHUB-CỦA-BẠN>
   git push -u origin main
   ```

2. **Kết nối và Deploy trên Vercel:**
   - Truy cập [https://vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
   - Nhấn **"Add New..."** → Chọn **"Project"**.
   - Chọn kho lưu trữ GitHub chứa mã nguồn `boostly-web` vừa đẩy lên.
   - Vercel sẽ tự động nhận diện Framework Preset là **Vite** (Build command: `npm run build`, Output Directory: `dist`).
   - Nhấn **Deploy**.
   - Sau ~30 giây, Vercel sẽ cung cấp đường link website trực tiếp của bạn (dạng `https://ten-du-an.vercel.app`).

---

### Cách 2: Deploy trực tiếp bằng Vercel CLI

1. Cài đặt Vercel CLI (nếu chưa có):
   ```bash
   npm i -g vercel
   ```
2. Chạy lệnh deploy tại thư mục dự án:
   ```bash
   vercel
   ```
   *(Nhập các thiết lập mặc định theo hướng dẫn trên màn hình)*

3. Deploy lên môi trường Production:
   ```bash
   vercel --prod
   ```

---

## 💻 Hướng Dẫn Chạy Trên Máy Cá Nhân (Local Development)

1. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
2. Khởi động môi trường phát triển:
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại: `http://localhost:3000`

3. Tạo bản build tối ưu:
   ```bash
   npm run build
   ```

---

## 📱 Các Điểm Tối Ưu Cho Điện Thoại (Mobile)

- **Hiệu ứng Video Mask / Spotlight cảm ứng**: Hỗ trợ đầy đủ các thao tác vuốt chạm (`touchmove`, `touchstart`) cùng hiệu ứng chuyển động thở nhẹ (ambient movement) khi ở chế độ chờ.
- **Typography Fluid & Chống vỡ layout**: Tiêu đề "BOOSTLY" tự động co giãn theo kích thước màn hình điện thoại, không bị che khuất hay tràn mép màn hình.
- **Bottom Sheet Modal**: Trên điện thoại, tất cả các hộp thoại (Dịch vụ, Bảng giá, Đặt dịch vụ, FAQ, Liên hệ) tự động biến thành dạng khay trượt bo tròn (Bottom Sheet) tiện lợi khi thao tác một tay.
- **Nút bấm & Form chuẩn Touch-friendly**: Chiều cao phím bấm đạt chuẩn tối thiểu 44px - 48px, tích hợp các phím chọn số lượng nhanh (+500, +1000, +2000, +5000) và 1 chạm mở app Zalo nhanh chóng.
- **Tương thích Safe Area Insets**: Hỗ trợ đầy đủ các dòng iPhone có tai thỏ / Dynamic Island thông qua `env(safe-area-inset-bottom)`.

---

## 📁 Cấu Trúc Thư Mục

```
boostly-web/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Modals/
│   │   │   ├── ContactModal.jsx
│   │   │   ├── FaqModal.jsx
│   │   │   ├── ModalWrapper.jsx
│   │   │   ├── OrderModal.jsx
│   │   │   ├── PricingModal.jsx
│   │   │   └── ServicesModal.jsx
│   │   ├── HeroSection.jsx
│   │   └── Navbar.jsx
│   ├── data/
│   │   └── servicesData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── README.md
```
