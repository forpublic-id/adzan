// Prayer time calculation wrapper using adhan.js library
// Implements Kemenag Indonesia standards for accurate Islamic prayer times

import { PrayerTimes, Coordinates, Qibla } from 'adhan';
import { PrayerTimesData, PrayerTime, NextPrayerInfo, LocationInfo } from '@/lib/types/prayer';
import { KemenagCalculationParams, prayerNames } from './kemenag-params';

/**
 * Calculate prayer times for given location and date using Kemenag parameters
 */
export function calculatePrayerTimes(
  latitude: number,
  longitude: number,
  date: Date = new Date()
): PrayerTimesData {
  const coordinates = new Coordinates(latitude, longitude);
  const prayerTimes = new PrayerTimes(coordinates, date, KemenagCalculationParams);
  
  // Determine timezone based on longitude (Indonesia specific)
  const timezone = getIndonesianTimezone(longitude);
  
  // Calculate Qibla direction
  const qiblaDirection = Qibla(coordinates);

  // Format prayer times
  const times = {
    fajr: formatTime(prayerTimes.fajr),
    sunrise: formatTime(prayerTimes.sunrise),
    dhuhr: formatTime(prayerTimes.dhuhr),
    asr: formatTime(prayerTimes.asr),
    maghrib: formatTime(prayerTimes.maghrib),
    isha: formatTime(prayerTimes.isha),
  };

  return {
    location: {
      city: '', // To be filled by geocoding
      coordinates: { latitude, longitude },
      timezone,
    },
    date: {
      gregorian: date.toISOString().split('T')[0],
      hijri: getHijriDate(date),
    },
    times,
    qibla: {
      direction: qiblaDirection,
    },
    calculationMethod: 'Kemenag Indonesia',
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get next prayer time with countdown
 */
export function getNextPrayerTime(prayerTimesData: PrayerTimesData): NextPrayerInfo | null {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Convert prayer time strings to Date objects
  const prayerTimesList: PrayerTime[] = [
    {
      name: 'fajr',
      time: parseTimeString(prayerTimesData.times.fajr, today),
      arabicName: prayerNames.fajr.arabic,
      indonesianName: prayerNames.fajr.id,
      englishName: prayerNames.fajr.en,
    },
    {
      name: 'dhuhr',
      time: parseTimeString(prayerTimesData.times.dhuhr, today),
      arabicName: prayerNames.dhuhr.arabic,
      indonesianName: prayerNames.dhuhr.id,
      englishName: prayerNames.dhuhr.en,
    },
    {
      name: 'asr',
      time: parseTimeString(prayerTimesData.times.asr, today),
      arabicName: prayerNames.asr.arabic,
      indonesianName: prayerNames.asr.id,
      englishName: prayerNames.asr.en,
    },
    {
      name: 'maghrib',
      time: parseTimeString(prayerTimesData.times.maghrib, today),
      arabicName: prayerNames.maghrib.arabic,
      indonesianName: prayerNames.maghrib.id,
      englishName: prayerNames.maghrib.en,
    },
    {
      name: 'isha',
      time: parseTimeString(prayerTimesData.times.isha, today),
      arabicName: prayerNames.isha.arabic,
      indonesianName: prayerNames.isha.id,
      englishName: prayerNames.isha.en,
    },
  ];

  // Find next prayer
  for (const prayer of prayerTimesList) {
    if (prayer.time > now) {
      const timeDiff = prayer.time.getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return {
        prayer,
        timeRemaining: { hours, minutes, seconds },
      };
    }
  }

  // If no prayer found for today, return Fajr for tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowPrayerTimes = calculatePrayerTimes(
    prayerTimesData.location.coordinates.latitude,
    prayerTimesData.location.coordinates.longitude,
    tomorrow
  );

  const fajrTomorrow = parseTimeString(tomorrowPrayerTimes.times.fajr, tomorrow);
  const timeDiff = fajrTomorrow.getTime() - now.getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return {
    prayer: {
      name: 'fajr',
      time: fajrTomorrow,
      arabicName: prayerNames.fajr.arabic,
      indonesianName: prayerNames.fajr.id,
      englishName: prayerNames.fajr.en,
    },
    timeRemaining: { hours, minutes, seconds },
  };
}

/**
 * Get user's location using GPS
 */
export function getCurrentLocation(): Promise<LocationInfo> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        resolve({
          city: '', // To be filled by reverse geocoding
          province: '',
          country: 'Indonesia',
          coordinates: { latitude, longitude },
          timezone: getIndonesianTimezone(longitude),
          accuracy: accuracy || 0,
          source: 'gps',
        });
      },
      (error: GeolocationPositionError) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
}

/**
 * Calculate Qibla direction from given coordinates
 */
export function calculateQiblaDirection(latitude: number, longitude: number): number {
  const coordinates = new Coordinates(latitude, longitude);
  return Qibla(coordinates);
}

// Helper functions

function formatTime(date: Date): string {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function parseTimeString(timeString: string, baseDate: Date): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function getIndonesianTimezone(longitude: number): 'WIB' | 'WITA' | 'WIT' {
  // Indonesia timezone boundaries (approximate)
  if (longitude < 120) return 'WIB';   // Western Indonesia Time (UTC+7)
  if (longitude < 135) return 'WITA';  // Central Indonesia Time (UTC+8)
  return 'WIT';                        // Eastern Indonesia Time (UTC+9)
}

function getHijriDate(gregorianDate: Date): string {
  // Simple Hijri date calculation (approximation)
  // In production, use a proper Hijri calendar library
  const hijriEpoch = new Date('622-07-16'); // Approximate start of Islamic calendar
  const daysDiff = Math.floor((gregorianDate.getTime() - hijriEpoch.getTime()) / (1000 * 60 * 60 * 24));
  const hijriYear = Math.floor(daysDiff / 354.37) + 1; // Islamic year is ~354.37 days
  const hijriMonth = Math.floor((daysDiff % 354.37) / 29.53) + 1;
  const hijriDay = Math.floor((daysDiff % 354.37) % 29.53) + 1;

  return `${hijriDay}/${hijriMonth}/${hijriYear} H`;
}

/**
 * Validate prayer time calculation accuracy
 */
export function validatePrayerTimes(prayerTimesData: PrayerTimesData): boolean {
  const { times } = prayerTimesData;
  
  // Basic validation: times should be in chronological order
  const timeOrder = [times.fajr, times.sunrise, times.dhuhr, times.asr, times.maghrib, times.isha];
  
  for (let i = 1; i < timeOrder.length; i++) {
    const prevTime = parseTimeString(timeOrder[i - 1], new Date());
    const currentTime = parseTimeString(timeOrder[i], new Date());
    
    if (currentTime <= prevTime) {
      return false;
    }
  }
  
  return true;
}