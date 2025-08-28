import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format time for display in Indonesian format
 */
export function formatIndonesianTime(date: Date): string {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Format date for display in Indonesian format
 */
export function formatIndonesianDate(date: Date): string {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = degreesToRadians(lat2 - lat1);
  const dLng = degreesToRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

/**
 * Calculate bearing from one coordinate to another
 */
export function calculateBearing(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLng = degreesToRadians(lng2 - lng1);
  const lat1Rad = degreesToRadians(lat1);
  const lat2Rad = degreesToRadians(lat2);
  
  const y = Math.sin(dLng) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
  
  const bearing = radiansToDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360; // Normalize to 0-360 degrees
}

/**
 * Format distance for display
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Check if browser supports geolocation
 */
export function supportsGeolocation(): boolean {
  return 'geolocation' in navigator;
}

/**
 * Check if browser supports push notifications
 */
export function supportsPushNotifications(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!supportsPushNotifications()) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/**
 * Get time remaining until a specific time
 */
export function getTimeRemaining(targetTime: Date): {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = new Date();
  const total = targetTime.getTime() - now.getTime();
  
  if (total < 0) {
    return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds, total };
}

/**
 * Format time remaining for display
 */
export function formatTimeRemaining(timeRemaining: {
  hours: number;
  minutes: number;
  seconds: number;
}): string {
  const { hours, minutes, seconds } = timeRemaining;
  
  if (hours > 0) {
    return `${hours}j ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}d`;
  } else {
    return `${seconds}d`;
  }
}

/**
 * Get Islamic greeting based on time of day
 */
export function getIslamicGreeting(hour: number): {
  arabic: string;
  indonesian: string;
  english: string;
} {
  if (hour >= 5 && hour < 11) {
    return {
      arabic: 'صباح الخير',
      indonesian: 'Selamat Pagi',
      english: 'Good Morning',
    };
  } else if (hour >= 11 && hour < 15) {
    return {
      arabic: 'السلام عليكم',
      indonesian: 'Selamat Siang',
      english: 'Good Afternoon',
    };
  } else if (hour >= 15 && hour < 18) {
    return {
      arabic: 'مساء الخير',
      indonesian: 'Selamat Sore',
      english: 'Good Evening',
    };
  } else {
    return {
      arabic: 'مساء الخير',
      indonesian: 'Selamat Malam',
      english: 'Good Night',
    };
  }
}