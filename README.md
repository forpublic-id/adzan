# Adzan ForPublic.id

> **Aplikasi Jadwal Shalat dan Spiritual Companion untuk Muslim Indonesia**

Adzan ForPublic.id adalah aplikasi komprehensif untuk jadwal shalat, pencari masjid, arah kiblat, dan konten Islami harian. Dibangun sebagai bagian dari ekosistem ForPublic.id yang fokus pada pelayanan publik digital untuk kebaikan bersama.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Fitur Utama

### 🕌 **Prayer Times Engine**
- ✅ Perhitungan waktu shalat akurat menggunakan parameter Kemenag Indonesia
- ✅ GPS location detection untuk otomatisasi
- ✅ Support seluruh zona waktu Indonesia (WIB, WITA, WIT)
- ✅ Countdown waktu shalat selanjutnya dengan tampilan real-time
- ✅ Validasi terhadap jadwal resmi Kementerian Agama RI

### 📍 **Mosque Finder** (Coming Soon)
- Interactive map untuk pencarian masjid terdekat
- Detail informasi masjid (fasilitas, kontak, aksesibilitas)
- Directions dan estimasi jarak
- User reviews dan rating system

### 🧭 **Qibla Compass** (Coming Soon)  
- Arah kiblat akurat berbasis GPS
- Visual compass pointing ke Kaaba
- Kalibrasi untuk device compass
- Offline functionality

### 📅 **Islamic Calendar** (Coming Soon)
- Kalender Hijriah dengan konversi tanggal
- Important Islamic dates dan events
- Jadwal Ramadan dengan Iftar/Suhur times
- Integration dengan Indonesian Islamic holidays

### 📖 **Daily Islamic Content** (Coming Soon)
- Daily du'a dan dhikr reminders
- Asma'ul Husna dengan pronunciation guide
- Selected Quran verses untuk daily reading
- Spiritual guidance dan prayer tutorials

## 🚀 Quick Start

### Prerequisites

- **Bun** (recommended) atau Node.js 18+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/forpublic-id/adzan.git
cd adzan

# Install dependencies
bun install

# Start development server
bun run dev

# Open http://localhost:3000
```

### Development Commands

```bash
# Development
bun run dev          # Start development server with Turbopack
bun run dev:bun      # Development dengan Bun runtime optimization

# Production
bun run build        # Production build
bun run start        # Start production server

# Code Quality
bun run lint         # ESLint checks
bun run typecheck    # TypeScript validation
bun run format       # Format with Prettier
bun run clean        # Clean build cache
```

## 🏗️ Tech Stack

### Core Framework
- **Next.js 15** dengan App Router
- **React 19** untuk UI components
- **TypeScript** untuk type safety
- **Bun** sebagai runtime dan package manager

### Styling & UI
- **Tailwind CSS v4** dengan design tokens
- **shadcn/ui** component library
- **Geist font family** untuk typography
- **Lucide React** untuk icon system

### Islamic Calculation Engine
- **adhan.js library** - Astronomical calculations
- **Kemenag Indonesia parameters** - Official standards
- **GPS geolocation** - Automatic location detection
- **Timezone management** - WIB/WITA/WIT support

### Mapping & Location
- **Leaflet.js** - Interactive maps (planned)
- **react-leaflet** - React integration (planned)
- **GeoJSON data** - Mosque locations (planned)

### Data Architecture
- **JSON-based storage** - No database required
- **Static file serving** - Optimized for CDN
- **Client-side processing** - Fast user experience
- **PWA capabilities** - Offline functionality (planned)

## 📁 Project Structure

```
adzan/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # Internationalized routes (planned)
│   ├── globals.css                # Global styles with Islamic design
│   ├── layout.tsx                 # Root layout with PWA setup
│   └── page.tsx                   # Homepage with prayer times
├── components/                    # React components
│   ├── prayer/                    # Prayer-specific components
│   │   ├── PrayerTimesDisplay.tsx # ✅ Current prayer times display
│   │   └── PrayerCountdown.tsx    # ✅ Next prayer countdown
│   ├── ui/                        # Base UI components (shadcn/ui)
│   └── layout/                    # Layout components
├── lib/                           # Utilities and types
│   ├── prayer/                    # Prayer calculation utilities
│   │   ├── adhan-wrapper.ts       # ✅ adhan.js integration
│   │   └── kemenag-params.ts      # ✅ Indonesia parameters
│   ├── types/                     # TypeScript definitions
│   │   └── prayer.ts              # ✅ Prayer time types
│   └── utils.ts                   # Helper functions
├── public/data/adzan/             # JSON data files
│   ├── cities/                    # Indonesian cities coordinates
│   │   └── major-cities.json      # ✅ 34 major cities
│   └── mosques/                   # Mosque location data (planned)
└── tailwind.config.ts             # Tailwind configuration with Islamic theme
```

## 🎨 Design System

### Islamic Green Theme
```css
/* Primary Islamic colors */
--islamic-green: 142 71% 45%;    /* #16a34a */
--islamic-dark: 142 100% 15%;    /* Dark green */
--kaaba-gold: 45 100% 50%;       /* Gold accents */
```

### Typography
- **Arabic text support** dengan proper RTL direction
- **Hijri date formatting** dengan tabular numbers
- **Geist Sans/Mono** untuk content bahasa Indonesia/English

### Components
- **Prayer time cards** dengan countdown indicators
- **Islamic calendar** dengan Hijri date conversion
- **Qibla compass** dengan animated direction pointer
- **Mosque markers** dengan Islamic iconography

## 🔧 Configuration

### Environment Variables (Optional)
```bash
# Google Analytics (production)
NEXT_PUBLIC_GA_ID=your-ga-id

# API endpoints (if needed)
NEXT_PUBLIC_API_URL=your-api-url
```

### Calculation Methods
```typescript
// Default: Kemenag Indonesia
const params = {
  fajrAngle: 20.0,      // Kemenag standard
  maghribAngle: 0.0,    // Sunset
  ishaAngle: 18.0,      // Kemenag standard
  madhab: 'Shafi'       // Indonesia follows Shafi madhab
}
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Deploy to production
vercel --prod

# Configure domain: adzan.forpublic.id
```

### Manual Build
```bash
# Build for production
bun run build

# Start production server
bun run start
```

## 📊 Performance

### Optimization Features
- **Turbopack** untuk fast development builds
- **Bundle optimization** dengan tree-shaking
- **Image optimization** untuk assets
- **Static generation** untuk prayer schedules
- **Progressive loading** untuk large datasets

### Lighthouse Scores (Target)
- **Performance:** >90
- **Accessibility:** >95
- **Best Practices:** >95
- **SEO:** >95

## 🤝 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- **TypeScript strict mode** enabled
- **ESLint + Prettier** untuk code consistency
- **Component testing** dengan proper TypeScript types
- **Islamic terminology** accuracy verification

## 📋 Development Status

### ✅ **Completed Features**
- ✅ Next.js 15 project setup dengan Tailwind CSS v4
- ✅ Prayer time calculation engine (adhan.js + Kemenag parameters)
- ✅ Core UI components (PrayerTimesDisplay, PrayerCountdown)
- ✅ Indonesian cities data (34 major cities)
- ✅ TypeScript type definitions untuk prayer data
- ✅ Islamic design system dengan green theme
- ✅ Responsive layout dengan mobile-first approach

### 🚧 **In Progress**
- 🚧 Mosque finder dengan interactive maps (Leaflet.js)
- 🚧 Qibla compass component
- 🚧 PWA capabilities dengan notification system

### 📋 **Planned Features**
- 📋 Bilingual support (Indonesian/English) dengan next-intl
- 📋 Islamic calendar dengan Hijri date conversion
- 📋 Daily Islamic content (du'a, dhikr, Quran verses)
- 📋 User preferences dan settings
- 📋 Offline functionality
- 📋 Push notifications untuk prayer times

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kementerian Agama Republik Indonesia** - Official prayer time standards
- **adhan.js library** - Accurate astronomical calculations
- **ForPublic.id Team** - Digital solutions for public good
- **Indonesian Muslim Community** - Inspiration dan requirements

---

<div align="center">

**Dibuat dengan ❤️ untuk umat Islam Indonesia**

[ForPublic.id](https://forpublic.id) • [Budget](https://budget.forpublic.id) • [Salary](https://salary.forpublic.id) • [Holiday](https://holiday.forpublic.id)

</div>
