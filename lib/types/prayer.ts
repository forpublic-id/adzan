// Prayer time calculation types for Indonesian Islamic application

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PrayerTimesData {
  location: {
    city: string;
    coordinates: Coordinates;
    timezone: 'WIB' | 'WITA' | 'WIT';
  };
  date: {
    gregorian: string;
    hijri: string;
  };
  times: {
    fajr: string;      // "04:45"
    sunrise: string;   // "05:58" 
    dhuhr: string;     // "12:15"
    asr: string;       // "15:30"
    maghrib: string;   // "18:32"
    isha: string;      // "19:45"
  };
  qibla: {
    direction: number; // degrees from North
  };
  calculationMethod: string;
  lastUpdated: string;
}

export interface PrayerTime {
  name: 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  time: Date;
  arabicName: string;
  indonesianName: string;
  englishName: string;
}

export interface NextPrayerInfo {
  prayer: PrayerTime;
  timeRemaining: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export type CalculationMethodType = 
  | 'Kemenag' 
  | 'MWL' 
  | 'ISNA' 
  | 'MakkahUmmalQura' 
  | 'Egyptian' 
  | 'Karachi' 
  | 'Tehran' 
  | 'Jafari';

export interface CalculationMethodParams {
  name: string;
  description: { id: string; en: string };
  fajrAngle: number;
  maghribAngle: number;
  ishaAngle: number;
  madhab: 'Shafi' | 'Hanafi';
}

export interface PrayerNotificationSettings {
  enabled: boolean;
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  timeBefore: number; // minutes before prayer time
  soundEnabled: boolean;
  adhanAudio: 'mecca' | 'medina' | 'local' | 'none';
  vibrationEnabled: boolean;
}

export interface LocationInfo {
  city: string;
  province: string;
  country: string;
  coordinates: Coordinates;
  timezone: string;
  accuracy: number; // GPS accuracy in meters
  source: 'gps' | 'manual' | 'ip' | 'cached';
}