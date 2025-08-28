import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 text-white" style={{backgroundColor: 'oklch(0.25 0.15 155)'}}>
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo and Brand */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6">
              <Image
                src="/logo.svg"
                alt="ForPublic.id Logo"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <span className="text-lg font-bold">
              ForPublic<span className="text-red-600">.id</span>
            </span>
          </Link>

          {/* Project Description */}
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {locale === "id"
              ? "Platform jadwal shalat Indonesia dengan perhitungan akurat menggunakan parameter Kementerian Agama. Dilengkapi pencari masjid, arah kiblat, kalender Hijriah, dan konten Islami harian untuk mendukung ibadah sehari-hari umat Muslim Indonesia."
              : "Indonesian prayer times platform with accurate calculations using Ministry of Religion parameters. Features mosque finder, Qibla direction, Hijri calendar, and daily Islamic content to support the daily worship of Indonesian Muslims."}
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm">
            <Link
              href={`/${locale}/prayer-times`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {locale === "id" ? "Jadwal Shalat" : "Prayer Times"}
            </Link>
            <span className="hidden sm:inline text-gray-600">•</span>
            <Link
              href={`/${locale}/qibla`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {locale === "id" ? "Arah Kiblat" : "Qibla Direction"}
            </Link>
            <span className="hidden sm:inline text-gray-600">•</span>
            <Link
              href="https://forpublic.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {locale === "id" ? "Website Utama" : "Main Website"}
            </Link>
            <span className="hidden sm:inline text-gray-600">•</span>
            <Link
              href="https://forpublic.id/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {locale === "id" ? "Kontak" : "Contact"}
            </Link>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t" style={{borderColor: 'oklch(0.35 0.15 155)'}}>
            <p className="text-gray-400 text-sm">
              © {currentYear} ForPublic
              <span className="text-red-600">.id</span>.{" "}
              {locale === "id"
                ? "Semua hak dilindungi. Dibuat dengan ❤️ untuk kebaikan publik."
                : "All rights reserved. Made with ❤️ for public good."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
