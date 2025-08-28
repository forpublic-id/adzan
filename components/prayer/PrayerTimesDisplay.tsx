"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, Compass } from "lucide-react";
import { PrayerTimesData, NextPrayerInfo } from "@/lib/types/prayer";
import {
  calculatePrayerTimes,
  getNextPrayerTime,
  getCurrentLocation,
} from "@/lib/prayer/adhan-wrapper";
import { formatIndonesianDate, getIslamicGreeting } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrayerCountdown } from "./PrayerCountdown";

interface PrayerTimesDisplayProps {
  className?: string;
  showNextPrayer?: boolean;
}

export function PrayerTimesDisplay({
  className,
  showNextPrayer = true,
}: PrayerTimesDisplayProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [nextPrayer, setNextPrayer] = useState<NextPrayerInfo | null>(null);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prayerDisplayOrder = [
    { key: "fajr" as const, name: "Subuh", arabic: "فجر" },
    { key: "dhuhr" as const, name: "Dzuhur", arabic: "ظهر" },
    { key: "asr" as const, name: "Ashar", arabic: "عصر" },
    { key: "maghrib" as const, name: "Maghrib", arabic: "مغرب" },
    { key: "isha" as const, name: "Isya", arabic: "عشاء" },
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user location
        const locationInfo = await getCurrentLocation();
        const { latitude, longitude } = locationInfo.coordinates;

        // Calculate prayer times
        const times = calculatePrayerTimes(latitude, longitude);
        setPrayerTimes(times);

        // Get next prayer
        const next = getNextPrayerTime(times);
        setNextPrayer(next);

        // Set location (in production, use reverse geocoding)
        setLocation(
          locationInfo.city ||
            `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal mendapatkan jadwal shalat",
        );

        // Fallback: Use Jakarta coordinates
        const jakartaTimes = calculatePrayerTimes(-6.2088, 106.8456);
        setPrayerTimes(jakartaTimes);
        setLocation("Jakarta (Default)");

        const next = getNextPrayerTime(jakartaTimes);
        setNextPrayer(next);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  // Separate effect for updating next prayer countdown
  useEffect(() => {
    if (!prayerTimes) return;

    const interval = setInterval(() => {
      const next = getNextPrayerTime(prayerTimes);
      setNextPrayer(next);
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const currentHour = new Date().getHours();
  const greeting = getIslamicGreeting(currentHour);

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Memuat jadwal shalat...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prayerTimes) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Gagal memuat jadwal shalat</p>
            {error && <p className="text-sm mt-2">{error}</p>}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      {/* Greeting and Date */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              {greeting.indonesian}
            </h2>
            <p className="text-lg mb-1">{formatIndonesianDate(new Date())}</p>
            <p className="text-sm text-muted-foreground">
              {prayerTimes.date.hijri}
            </p>
            <div className="flex items-center justify-center mt-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Prayer Countdown */}
      {showNextPrayer && nextPrayer && (
        <PrayerCountdown nextPrayer={nextPrayer} className="mb-4" />
      )}

      {/* Prayer Times Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Compass className="w-5 h-5 mr-2 text-islamic-600" />
            Jadwal Shalat Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {prayerDisplayOrder.map((prayer, index) => {
              const time = prayerTimes.times[prayer.key];
              const isNext = nextPrayer?.prayer.name === prayer.key;

              return (
                <div
                  key={prayer.key}
                  className={`p-4 flex items-center justify-between transition-colors ${
                    isNext
                      ? "bg-islamic-50 border-l-4 border-l-islamic-500"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isNext
                            ? "bg-islamic-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{prayer.name}</p>
                      <p className="text-sm text-muted-foreground arabic-text">
                        {prayer.arabic}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold">{time}</p>
                    {isNext && (
                      <Badge variant="secondary" className="mt-1">
                        Selanjutnya
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Qibla Direction */}
      <Card className="mt-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-islamic-600" />
              <span className="font-medium">Arah Kiblat</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold">
                {prayerTimes.qibla.direction.toFixed(1)}°
              </span>
              <p className="text-sm text-muted-foreground">dari Utara</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Method Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Dihitung menggunakan parameter {prayerTimes.calculationMethod}
        </p>
      </div>
    </div>
  );
}
