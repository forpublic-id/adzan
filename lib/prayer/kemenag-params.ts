// Kementerian Agama Indonesia calculation parameters for prayer times
// Official standard used by Indonesian government for Islamic prayers

import { CalculationMethod, Madhab } from "adhan";

// Kemenag Indonesia calculation parameters based on official guidelines
export const KemenagCalculationParams = (() => {
  const params = CalculationMethod.Other();

  // Official Kemenag parameters
  params.fajrAngle = 20.0; // Kemenag standard for Fajr
  params.maghribAngle = 0.0; // Sunset (standard)
  params.ishaAngle = 18.0; // Kemenag standard for Isha
  params.madhab = Madhab.Shafi; // Indonesia follows Shafi madhab

  return params;
})();

// Alternative calculation methods available in Indonesia
export const alternativeCalculationMethods = {
  MWL: {
    name: "Muslim World League",
    description: {
      id: "Liga Muslim Dunia",
      en: "Muslim World League",
    },
    params: CalculationMethod.MuslimWorldLeague(),
  },
  ISNA: {
    name: "Islamic Society of North America",
    description: {
      id: "Islamic Society of North America",
      en: "Islamic Society of North America",
    },
    params: CalculationMethod.NorthAmerica(),
  },
  UmmAlQura: {
    name: "Umm Al-Qura University",
    description: {
      id: "Universitas Umm Al-Qura",
      en: "Umm Al-Qura University",
    },
    params: CalculationMethod.UmmAlQura(),
  },
  Egyptian: {
    name: "Egyptian General Authority",
    description: {
      id: "Otoritas Umum Mesir",
      en: "Egyptian General Authority",
    },
    params: CalculationMethod.Egyptian(),
  },
};

// Regional adjustments for Indonesian geography
export const regionalAdjustments = {
  WIB: {
    timezone: "Asia/Jakarta",
    utcOffset: 7,
    regions: [
      "Jakarta",
      "Bandung",
      "Semarang",
      "Yogyakarta",
      "Surabaya",
      "Medan",
      "Palembang",
    ],
  },
  WITA: {
    timezone: "Asia/Makassar",
    utcOffset: 8,
    regions: ["Denpasar", "Makassar", "Banjarmasin", "Balikpapan"],
  },
  WIT: {
    timezone: "Asia/Jayapura",
    utcOffset: 9,
    regions: ["Manokwari", "Jayapura", "Sorong", "Ambon"],
  },
};

// Prayer name translations for Indonesia
export const prayerNames = {
  fajr: {
    arabic: "فجر",
    id: "Subuh",
    en: "Fajr",
    description: {
      id: "Waktu shalat sebelum matahari terbit",
      en: "Dawn prayer before sunrise",
    },
  },
  sunrise: {
    arabic: "شروق",
    id: "Matahari Terbit",
    en: "Sunrise",
    description: {
      id: "Waktu terbitnya matahari (tidak ada shalat)",
      en: "Sunrise time (no prayer)",
    },
  },
  dhuhr: {
    arabic: "ظهر",
    id: "Dzuhur",
    en: "Dhuhr",
    description: {
      id: "Waktu shalat tengah hari setelah matahari mencapai zenith",
      en: "Midday prayer after sun reaches zenith",
    },
  },
  asr: {
    arabic: "عصر",
    id: "Ashar",
    en: "Asr",
    description: {
      id: "Waktu shalat sore sebelum matahari terbenam",
      en: "Afternoon prayer before sunset",
    },
  },
  maghrib: {
    arabic: "مغرب",
    id: "Maghrib",
    en: "Maghrib",
    description: {
      id: "Waktu shalat setelah matahari terbenam",
      en: "Evening prayer after sunset",
    },
  },
  isha: {
    arabic: "عشاء",
    id: "Isya",
    en: "Isha",
    description: {
      id: "Waktu shalat malam setelah cahaya senja hilang",
      en: "Night prayer after twilight disappears",
    },
  },
};

// Validation data source information
export const dataSourceInfo = {
  primary: {
    name: "Kementerian Agama Republik Indonesia",
    website: "https://kemenag.go.id",
    description: {
      id: "Sumber resmi jadwal shalat pemerintah Indonesia",
      en: "Official Indonesian government prayer schedule source",
    },
  },
  methodology: {
    id: "Menggunakan perhitungan astronomis dengan parameter Kemenag RI yang telah disesuaikan untuk wilayah Indonesia",
    en: "Uses astronomical calculations with Kemenag RI parameters adjusted for Indonesian territory",
  },
  accuracy: {
    id: "Akurasi ±1-2 menit tergantung lokasi dan kondisi geografis",
    en: "Accuracy ±1-2 minutes depending on location and geographical conditions",
  },
};
