import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BeatMD — Биты для твоей музыки",
  description: "Купи профессиональные биты от лучших продюсеров. Trap, Drill, R&B, Hip-Hop и другие жанры.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080810] text-white min-h-screen`}
      >
        <Header />
        <main className="pt-16">{children}</main>
        <footer className="border-t border-white/10 mt-20 py-10 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} BeatMD. Все права защищены.</p>
        </footer>
      </body>
    </html>
  );
}
