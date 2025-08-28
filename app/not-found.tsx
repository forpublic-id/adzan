import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Adzan ForPublic.id",
  description: "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda untuk jadwal shalat Indonesia.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-islamic-600 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan periksa
            kembali alamat URL atau kembali ke beranda.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/id"
            className="inline-flex items-center justify-center rounded-md bg-islamic-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-islamic-700 focus:outline-none focus:ring-2 focus:ring-islamic-500 focus:ring-offset-2 transition-colors"
          >
            Kembali ke Beranda
          </Link>
          
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Link
              href="/id/prayer-times"
              className="text-islamic-600 hover:text-islamic-700 underline"
            >
              Jadwal Shalat
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/id/qibla"
              className="text-islamic-600 hover:text-islamic-700 underline"
            >
              Arah Kiblat
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/id/mosques"
              className="text-islamic-600 hover:text-islamic-700 underline"
            >
              Pencari Masjid
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Jika masalah ini terus berlanjut, silakan hubungi tim support kami
            melalui{" "}
            <Link
              href="https://forpublic.id/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-islamic-600 hover:text-islamic-700 underline"
            >
              ForPublic.id
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}