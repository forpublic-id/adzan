import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adzan - ForPublic.id | Jadwal Shalat Indonesia',
  description: 'Aplikasi jadwal shalat akurat untuk seluruh Indonesia dengan fitur pencari masjid, arah kiblat, dan konten Islami harian.',
  keywords: 'jadwal shalat, prayer times, indonesia, kiblat, masjid, islamic calendar, adzan, islamic app',
  authors: [{ name: 'ForPublic.id Team' }],
  creator: 'ForPublic.id',
  publisher: 'ForPublic.id',
  applicationName: 'Adzan ForPublic.id',
  category: 'Religious',
  openGraph: {
    title: 'Adzan - ForPublic.id | Jadwal Shalat Indonesia',
    description: 'Aplikasi jadwal shalat akurat untuk seluruh Indonesia dengan fitur pencari masjid, arah kiblat, dan konten Islami harian.',
    url: 'https://adzan.forpublic.id',
    siteName: 'Adzan ForPublic.id',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adzan - ForPublic.id | Jadwal Shalat Indonesia',
    description: 'Aplikasi jadwal shalat akurat untuk seluruh Indonesia dengan fitur pencari masjid, arah kiblat, dan konten Islami harian.',
  },
  manifest: '/manifest.json',
  themeColor: '#16a34a',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}