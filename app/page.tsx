import { PrayerTimesDisplay } from '@/components/prayer/PrayerTimesDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Settings, 
  Info,
  Building2 
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-islamic-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-islamic-800">Adzan</h1>
                <p className="text-xs text-muted-foreground">ForPublic.id</p>
              </div>
            </div>
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings">
                  <Settings className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/about">
                  <Info className="w-4 h-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
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
                      <h4 className="font-semibold text-sm mb-2">Doa Hari Ini</h4>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm arabic-text text-center mb-2">
                          اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ
                        </p>
                        <p className="text-xs text-muted-foreground text-center">
                          &quot;Ya Allah, bantulah aku untuk mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.&quot;
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="islamic" 
                      size="sm" 
                      className="w-full" 
                      asChild
                    >
                      <Link href="/content">
                        Lihat Konten Lengkap
                      </Link>
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
                      <span className="text-sm font-semibold">ForPublic.id</span>
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
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-sm mb-3">Fitur</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/prayer-times" className="hover:text-foreground">Jadwal Shalat</Link></li>
                <li><Link href="/qibla" className="hover:text-foreground">Arah Kiblat</Link></li>
                <li><Link href="/mosques" className="hover:text-foreground">Pencari Masjid</Link></li>
                <li><Link href="/calendar" className="hover:text-foreground">Kalender Hijriah</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm mb-3">Konten</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/content/dua" className="hover:text-foreground">Doa Harian</Link></li>
                <li><Link href="/content/asmaul-husna" className="hover:text-foreground">Asma&apos;ul Husna</Link></li>
                <li><Link href="/content/quran" className="hover:text-foreground">Ayat Pilihan</Link></li>
                <li><Link href="/content/dhikr" className="hover:text-foreground">Dzikir</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm mb-3">Bantuan</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">Tentang</Link></li>
                <li><Link href="/settings" className="hover:text-foreground">Pengaturan</Link></li>
                <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Kontak</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm mb-3">ForPublic.id</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://forpublic.id" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">Website Utama</a></li>
                <li><a href="https://budget.forpublic.id" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">Budget</a></li>
                <li><a href="https://salary.forpublic.id" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">Salary</a></li>
                <li><a href="https://holiday.forpublic.id" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">Holiday</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Adzan ForPublic.id. Dibuat dengan ❤️ untuk umat Islam Indonesia.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Waktu shalat dihitung menggunakan parameter resmi Kementerian Agama RI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}