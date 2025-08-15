# 🚀 3D Portfolio - Nguyễn Văn Thuần (🇬🇧/🇻🇳)

Một portfolio website 3D tương tác được xây dựng với Three.js, featuring stunning visual effects và animations.

![Portfolio Preview](preview.png)

## ✨ Tính năng

### 🎨 3D Effects & Animations
- **Three.js Background**: Particle system động với stars và floating geometries
- **3D Hero Model**: Animated wireframe cubes với gradient colors
- **Parallax Scrolling**: Smooth scroll effects với depth perception
- **Interactive Elements**: Magnetic buttons, 3D tilt cards, và hover animations

### 📱 Responsive Design
- Mobile-first approach
- Hamburger menu cho mobile devices
- Optimized cho tất cả screen sizes
- Touch-friendly interactions

### 🌐 Multilingual Support
- Hỗ trợ tiếng Anh và tiếng Việt
- Chuyển đổi ngôn ngữ dễ dàng với nút trong thanh điều hướng
- Lưu trữ ngôn ngữ ưa thích trong localStorage
- Thiết kế responsive cho nút ngôn ngữ trên cả desktop và mobile

### 🎯 Sections
- **Hero Section**: Typing animation với 3D background
- **About**: Statistics counters với animated progress
- **Skills**: 3D skill cards với hover effects
- **Experience**: Interactive timeline với pulse animations
- **Projects**: 3D flip cards với project details
- **Contact**: Glassmorphism form design

### 🛠️ Technologies Used
- **Three.js**: 3D graphics và animations
- **Particles.js**: Interactive particle systems
- **AOS Library**: Scroll animations
- **CSS3**: Glassmorphism, gradients, và modern effects
- **Vanilla JavaScript**: Pure JS cho performance tối ưu
- **Multilingual Support**: Chức năng chuyển đổi ngôn ngữ (Anh/Việt)

## 📦 Cài đặt

### Option 1: Sử dụng npm (Recommended)

```bash
# Clone repository
git clone https://github.com/vthuan-dev/portfolio-3d.git
cd portfolio-3d

# Install dependencies
npm install

# Start development server
npm start
```

Portfolio sẽ chạy tại `http://localhost:3000`

### Option 2: Mở trực tiếp

1. Download tất cả files
2. Mở file `index.html` trong browser
3. Done! 🎉

### Option 3: Sử dụng Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Truy cập `http://localhost:8000`

### Option 4: Sử dụng VS Code Live Server

1. Install extension "Live Server" trong VS Code
2. Right-click vào `index.html`
3. Chọn "Open with Live Server"

## 🚀 Deploy

### Deploy lên GitHub Pages

1. Push code lên GitHub repository
2. Vào Settings → Pages
3. Chọn Source: Deploy from a branch
4. Chọn Branch: main, Folder: / (root)
5. Save và đợi vài phút
6. Portfolio sẽ live tại: `https://[username].github.io/[repo-name]`

### Deploy lên Netlify

1. Đăng nhập [Netlify](https://www.netlify.com)
2. Drag & drop folder project vào Netlify
3. Done! URL sẽ được tạo tự động

### Deploy lên Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy lên Surge.sh

```bash
# Install Surge
npm install -g surge

# Deploy
surge
```

## 🎨 Customization

### Thay đổi màu sắc

Edit các CSS variables trong `style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --bg-dark: #0a0e27;
    /* ... */
}
```

### Thay đổi nội dung

1. Mở `index.html`
2. Tìm và thay đổi text content
3. Update links và social media URLs

### Thay đổi 3D effects

Edit `main.js`:

```javascript
// Particle count
const particlesCount = 3000; // Tăng/giảm số particles

// Animation speed
particles.rotation.x += 0.0005; // Thay đổi tốc độ xoay
```

## 📁 Cấu trúc Project

```
portfolio-3d/
│
├── index.html          # Main HTML file
├── style.css          # Styles và animations
├── main.js           # Three.js và interactions
├── package.json      # Dependencies
├── README.md        # Documentation
└── CV-Nguyen-Van-Thuan.md  # CV content
```

## 🔧 Browser Support

- Chrome (recommended) ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Opera ✅

## 📱 Mobile Performance

Portfolio đã được optimize cho mobile:
- Reduced particle count trên mobile devices
- Touch-optimized interactions
- Simplified animations cho better performance

## 🐛 Troubleshooting

### Three.js không load

- Kiểm tra console errors
- Đảm bảo browser support WebGL
- Try refresh page hoặc clear cache

### Animations lag

- Reduce particle count trong `main.js`
- Disable một số effects trên older devices
- Update graphics drivers

### Font không hiển thị

- Check internet connection (Google Fonts)
- Fallback fonts đã được set up

## 📄 License

MIT License - feel free to use cho personal và commercial projects!

## 🤝 Contact

- **Email**: vthuan.dev@gmail.com
- **GitHub**: [https://github.com/vthuan-dev](https://github.com/vthuan-dev)
- **LinkedIn**: [Thuan Nguyen Van](https://www.linkedin.com/in/thuan-nguyen-van-297534323)

## 🙏 Credits

- Three.js cho 3D graphics
- AOS Library cho scroll animations
- Font Awesome cho icons
- Google Fonts cho typography

---

⭐ Nếu bạn thích project này, hãy cho một star trên GitHub!

Made with ❤️ và Three.js by Nguyễn Văn Thuần
