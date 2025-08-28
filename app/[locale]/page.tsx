import { PrayerTimesDisplay } from "@/components/prayer/PrayerTimesDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, MapPin, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-50 to-green-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Prayer Times - Main Column */}
          <div className="lg:col-span-8">
            <PrayerTimesDisplay className="w-full" />
          </div>

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fitur Utama</CardTitle>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/qibla">
                      <Compass className="w-4 h-4 mr-2" />
                      Arah Kiblat
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/mosques">
                      <MapPin className="w-4 h-4 mr-2" />
                      Pencari Masjid
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/calendar">
                      <Calendar className="w-4 h-4 mr-2" />
                      Kalender Hijriah
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/content">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Konten Islami
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Daily Islamic Content Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Konten Harian</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Doa Hari Ini
                      </h4>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm arabic-text text-center mb-2">
                          اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ
                          عِبَادَتِكَ
                        </p>
                        <p className="text-xs text-muted-foreground text-center">
                          &quot;Ya Allah, bantulah aku untuk mengingat-Mu,
                          bersyukur kepada-Mu, dan beribadah dengan baik
                          kepada-Mu.&quot;
                        </p>
                      </div>
                    </div>

                    <Button size="sm" className="w-full" asChild>
                      <Link href="/content">Lihat Konten Lengkap</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* App Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                      Bagian dari ekosistem
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 bg-red-600 rounded text-white text-xs font-bold flex items-center justify-center">
                        FP
                      </div>
                      <span className="text-sm font-semibold">
                        ForPublic.id
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Digital solutions for public good
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
