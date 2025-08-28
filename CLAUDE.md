# Adzan ForPublic.id - Development Guide

Islamic Prayer Times and Spiritual Companion for Indonesia

## Project Overview

Adzan ForPublic.id is a comprehensive Islamic prayer times application serving the Muslim community in Indonesia (87% of population). Built as part of the ForPublic.id ecosystem focusing on spiritual and religious public services, providing accurate prayer times, mosque finder, Qibla compass, and daily Islamic content.

## Tech Stack & Architecture

**Framework & Runtime:**
- Next.js 15 with App Router
- React 19  
- TypeScript
- Bun (primary runtime, package manager, and development server)

**Styling & UI:**
- Tailwind CSS v4 with design tokens
- shadcn/ui component library
- Geist font family
- Responsive mobile-first design

**Islamic Calculation Engine:**
- **adhan.js library** - Astronomical prayer time calculations
- Kemenag Indonesia calculation parameters
- Multiple calculation methods support (MWL, ISNA, Umm al-Qura)
- GPS-based location detection

**Internationalization:**
- next-intl for bilingual support (Indonesian/English)
- Islamic terminology in both languages
- Locale-based routing (/id/, /en/)

**Mapping & Location:**
- Leaflet.js for interactive maps
- react-leaflet for React integration
- GPS geolocation for accurate positioning
- Mosque locations with GeoJSON data

**Data Architecture:**
- JSON-based data storage (NO DATABASE)
- Static files in /public/data/adzan/
- Client-side data loading and processing
- PWA capabilities for offline functionality

## Development Commands

```bash
# Development (Recommended: Bun Runtime)
bun install          # Install dependencies
bun run dev         # Start development server (localhost:3000)
bun run dev:bun     # Development with Bun runtime optimization

# Production
bun run build       # Production build
bun run start       # Start production server

# Code Quality
bun run lint        # ESLint checks
bun run typecheck   # TypeScript validation
bun run format      # Format with Prettier
bun run clean       # Clean build cache
```

## Project Structure

```
adzan/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # Internationalized routes
│   │   ├── prayer-times/         # Prayer schedule pages
│   │   ├── mosques/              # Mosque finder
│   │   ├── qibla/                # Qibla compass
│   │   ├── calendar/             # Islamic calendar
│   │   ├── content/              # Daily Islamic content
│   │   ├── settings/             # App preferences
│   │   ├── about/                # About page
│   │   ├── layout.tsx            # Locale layout
│   │   └── page.tsx              # Homepage with current prayer times
│   ├── globals.css               # Global styles with Islamic design
│   └── layout.tsx                # Root layout with PWA setup
├── components/                    # React components
│   ├── prayer/                   # Prayer-specific components
│   │   ├── PrayerTimesDisplay.tsx # Current prayer times
│   │   ├── PrayerCountdown.tsx   # Next prayer countdown
│   │   ├── NotificationManager.tsx # Push notifications
│   │   └── CalculationSettings.tsx # Method preferences
│   ├── mosque/                   # Mosque finder components
│   │   ├── MosqueMap.tsx         # Interactive map
│   │   ├── MosqueList.tsx        # Mosque listings
│   │   └── MosqueDetails.tsx     # Mosque information
│   ├── qibla/                    # Qibla direction components
│   │   ├── QiblaCompass.tsx      # GPS-based compass
│   │   └── QiblaCalibration.tsx  # Calibration guide
│   ├── islamic/                  # Islamic content components
│   │   ├── IslamicCalendar.tsx   # Hijri calendar
│   │   ├── DailyContent.tsx      # Daily duas/dhikr
│   │   ├── AsmaUlHusna.tsx       # 99 Names of Allah
│   │   └── QuranVerses.tsx       # Daily verses
│   ├── ui/                       # Base UI components (shadcn/ui)
│   └── layout/                   # Layout components
├── lib/                          # Utilities and types
│   ├── prayer/                   # Prayer calculation utilities
│   │   ├── adhan-wrapper.ts      # adhan.js integration
│   │   ├── kemenag-params.ts     # Indonesia parameters
│   │   └── location-utils.ts     # GPS utilities
│   ├── islamic/                  # Islamic utilities
│   │   ├── hijri-calendar.ts     # Hijri date conversion
│   │   ├── qibla-calculation.ts  # Qibla direction
│   │   └── content-loader.ts     # Islamic content management
│   ├── types/                    # TypeScript definitions
│   │   ├── prayer.ts             # Prayer time types
│   │   ├── mosque.ts             # Mosque data types
│   │   └── islamic.ts            # Islamic content types
│   └── utils.ts                  # Helper functions
├── i18n/                         # Internationalization
│   ├── messages/                 # Translation files
│   │   ├── id.json               # Indonesian (Islamic terms)
│   │   └── en.json               # English translations
│   └── request.ts                # i18n configuration
├── public/data/adzan/            # JSON data files
│   ├── prayer-times/             # Prayer calculation data
│   │   ├── calculation-methods/  # Various calculation methods
│   │   ├── cities/               # Indonesian cities coordinates
│   │   └── validation/           # Kemenag validation data
│   ├── mosques/                  # Mosque location data
│   │   ├── jakarta-mosques.json  # Major city mosques
│   │   ├── bandung-mosques.json
│   │   └── [...city-mosques].json
│   ├── islamic-content/          # Daily Islamic content
│   │   ├── calendar/             # Hijri calendar events
│   │   ├── spiritual/            # Duas, dhikr, Asma'ul Husna
│   │   └── guidance/             # Prayer guidance
│   └── meta/                     # Metadata and sources
└── middleware.ts                 # next-intl middleware
```

## Core Islamic Features

### 🕌 Prayer Times Engine
- Accurate prayer times using astronomical calculations
- Kemenag Indonesia calculation parameters (official standard)
- Support for all Indonesian regions (WIB, WITA, WIT timezones)
- GPS-based location detection
- Multiple calculation method preferences
- Automatic Daylight Saving Time handling

### ⏰ Smart Notifications  
- PWA push notifications for 5 daily prayers
- Customizable notification timing (5-30 minutes before)
- Multiple adzan audio options (Mecca, Medina, local)
- Silent/vibration mode support
- Background notification scheduling

### 📍 Mosque Finder
- Interactive map showing nearby mosques
- Detailed mosque information (address, facilities, contact)
- Distance calculation and GPS directions
- User ratings and reviews system
- Accessibility information (wheelchair access, etc.)

### 🧭 Qibla Compass
- Accurate Qibla direction using GPS coordinates
- Visual compass pointing to Kaaba in Mecca
- Calibration instructions for device accuracy
- Works offline after initial calculation
- Magnetic declination correction

### 📅 Islamic Calendar
- Complete Hijri calendar with date conversion
- Important Islamic dates and events
- Ramadan schedule with Iftar/Suhur times
- Integration with Indonesian Islamic holidays
- Prayer time adjustments during Ramadan

### 📖 Daily Islamic Content
- Daily du'a (supplications) and dhikr (remembrance)
- Asma'ul Husna (99 Beautiful Names of Allah)
- Selected Quran verses for daily reflection
- Prayer guidance for new Muslims
- Spiritual reminders and Islamic quotes

## Prayer Calculation Implementation

### Key Libraries & Configuration

```typescript
// lib/prayer/adhan-wrapper.ts
import { PrayerTimes, CalculationMethod, Coordinates } from 'adhan'

// Kemenag Indonesia parameters
export const KemenagCalculationParams = (() => {
  const params = CalculationMethod.Other()
  params.fajrAngle = 20.0      // Kemenag standard
  params.maghribAngle = 0.0    // Sunset
  params.ishaAngle = 18.0      // Kemenag standard
  params.madhab = Madhab.Shafi // Indonesia follows Shafi madhab
  return params
})()

export function calculatePrayerTimes(lat: number, lng: number, date: Date) {
  const coordinates = new Coordinates(lat, lng)
  return new PrayerTimes(coordinates, date, KemenagCalculationParams)
}
```

### Data Structure Examples

```typescript
// Prayer times response
interface PrayerTimesData {
  location: {
    city: string
    coordinates: { lat: number; lng: number }
    timezone: 'WIB' | 'WITA' | 'WIT'
  }
  date: {
    gregorian: string
    hijri: string
  }
  times: {
    fajr: string      // "04:45"
    sunrise: string   // "05:58" 
    dhuhr: string     // "12:15"
    asr: string       // "15:30"
    maghrib: string   // "18:32"
    isha: string      // "19:45"
  }
  qibla: {
    direction: number // degrees from North
  }
  calculationMethod: string
}

// Mosque data structure
interface Mosque {
  id: string
  name: { id: string; en: string }
  address: string
  coordinates: { lat: number; lng: number }
  facilities: string[]
  contact?: { phone?: string; website?: string }
  accessibility: boolean
  rating: number
  reviews: number
  distance?: number // calculated from user location
}
```

## Component Development Guidelines

### Prayer Times Components

```typescript
// Real-time prayer times with countdown
const PrayerTimesDisplay: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null)
  const [location, setLocation] = useState<Coordinates | null>(null)
  
  // Get user location and calculate prayer times
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = new Coordinates(
        position.coords.latitude, 
        position.coords.longitude
      )
      setLocation(coords)
      
      const times = calculatePrayerTimes(
        coords.latitude, 
        coords.longitude, 
        new Date()
      )
      setPrayerTimes(formatPrayerTimes(times))
    })
  }, [])
}
```

### Qibla Compass Component

```typescript
// GPS-based Qibla direction
const QiblaCompass: React.FC = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number>(0)
  const [deviceHeading, setDeviceHeading] = useState<number>(0)
  
  // Calculate Qibla direction from user location to Kaaba
  const calculateQiblaDirection = (userLat: number, userLng: number) => {
    const KAABA_LAT = 21.4225
    const KAABA_LNG = 39.8262
    
    // Qibla calculation using spherical trigonometry
    const direction = calculateBearing(userLat, userLng, KAABA_LAT, KAABA_LNG)
    return direction
  }
}
```

## Performance Optimization

### Prayer Time Caching
- Cache prayer times for current day and week
- Background updates for next day's schedule  
- Efficient storage using localStorage/IndexedDB
- Offline fallback with pre-calculated times

### Notification Optimization
- Service Worker for background notifications
- Efficient scheduling with precise timing
- Battery usage optimization
- User preference-based notification logic

## SEO & Accessibility

### Islamic SEO Implementation
- Dynamic metadata with Islamic terms in Indonesian/English
- Structured data for prayer times and mosque information
- Local SEO for mosque finder functionality  
- Religious content optimization for Islamic search terms

### Accessibility for Islamic Community
- Right-to-left text support for Arabic content
- High contrast mode for better visibility
- Voice announcements for prayer times
- Large text support for elderly users

## Deployment & PWA

### Progressive Web App Features
- Offline prayer time calculations
- Push notification support
- App-like experience on mobile devices
- Home screen installation prompt
- Background sync for updated prayer times

### Vercel Deployment Configuration
```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["sin1"],
  "functions": {
    "app/[locale]/prayer-times/page.tsx": {
      "maxDuration": 10
    }
  }
}
```

## Data Sources & Islamic Compliance

### Official Islamic Authorities
- Kementerian Agama Republik Indonesia (Kemenag)
- Majelis Ulama Indonesia (MUI) guidelines
- Local Islamic organizations for mosque data
- Verified Islamic content from reliable sources

### Calculation Method Accuracy
- Kemenag parameters as primary standard
- Validation against official prayer time schedules
- Regional adjustments for Indonesian geography
- Clear disclaimers about calculation methods

## Religious Considerations

### Islamic Guidelines Compliance
- Accurate Qibla direction calculations
- Proper Islamic terminology usage
- Respectful presentation of religious content
- Cultural sensitivity in UI/UX design

### Community Features
- User feedback for prayer time accuracy
- Community-contributed mosque information
- Islamic event notifications
- Respectful handling of religious imagery

This application serves as a spiritual companion for Indonesian Muslims, combining modern technology with authentic Islamic practices to support daily religious observances.