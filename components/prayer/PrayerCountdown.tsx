"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { NextPrayerInfo } from "@/lib/types/prayer";
import { getTimeRemaining } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PrayerCountdownProps {
  nextPrayer: NextPrayerInfo;
  className?: string;
}

export function PrayerCountdown({
  nextPrayer,
  className,
}: PrayerCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(nextPrayer.prayer.time),
  );

  useEffect(() => {
    // Double-check prayer time is valid
    if (!nextPrayer?.prayer?.time || isNaN(nextPrayer.prayer.time.getTime())) {
      return;
    }

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(nextPrayer.prayer.time);
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer.prayer.time]);

  // Check if prayer time is valid after hooks have been called
  if (!nextPrayer?.prayer?.time || isNaN(nextPrayer.prayer.time.getTime())) {
    console.error('Invalid prayer time in PrayerCountdown:', nextPrayer?.prayer?.time);
    return null;
  }

  const { hours, minutes, seconds, total } = timeRemaining;
  const isUrgent = total < 30 * 60 * 1000; // Less than 30 minutes

  if (total <= 0) {
    return null; // Don't show countdown if time has passed
  }

  return (
    <Card
      className={`${className} ${isUrgent ? "ring-2 ring-islamic-400 bg-islamic-50/50" : ""}`}
    >
      <CardContent className="p-6">
        <div className="text-center">
          <Badge
            variant={isUrgent ? "default" : "secondary"}
            className={`mb-3 ${isUrgent ? "bg-islamic-500 hover:bg-islamic-600" : ""}`}
          >
            <Clock className="w-3 h-3 mr-1" />
            Shalat Selanjutnya
          </Badge>

          <h3 className="text-2xl font-bold mb-2">
            {nextPrayer.prayer.indonesianName}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 arabic-text">
            {nextPrayer.prayer.arabicName}
          </p>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-center">
              <div
                className={`text-3xl font-mono font-bold ${isUrgent ? "text-islamic-600" : ""}`}
              >
                {hours.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Jam
              </div>
            </div>

            <div
              className={`text-2xl font-bold ${isUrgent ? "text-islamic-600" : "text-muted-foreground"}`}
            >
              :
            </div>

            <div className="text-center">
              <div
                className={`text-3xl font-mono font-bold ${isUrgent ? "text-islamic-600" : ""}`}
              >
                {minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Menit
              </div>
            </div>

            <div
              className={`text-2xl font-bold ${isUrgent ? "text-islamic-600" : "text-muted-foreground"}`}
            >
              :
            </div>

            <div className="text-center">
              <div
                className={`text-3xl font-mono font-bold ${isUrgent ? "text-islamic-600" : ""}`}
              >
                {seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Detik
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            pada pukul{" "}
            <span className="font-semibold">
              {nextPrayer.prayer.time.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </p>

          {isUrgent && (
            <div className="mt-4 p-3 bg-islamic-100 rounded-lg">
              <p className="text-sm text-islamic-800 font-medium">
                🕌 Waktu shalat akan segera tiba. Bersiaplah untuk beribadah.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Optional: Progress ring component for visual countdown
interface CountdownRingProps {
  total: number;
  remaining: number;
  size?: number;
}

export function CountdownRing({
  total,
  remaining,
  size = 120,
}: CountdownRingProps) {
  const progress = ((total - remaining) / total) * 100;
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-muted-foreground/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-islamic-500 transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Clock className="w-6 h-6 text-islamic-600" />
      </div>
    </div>
  );
}
