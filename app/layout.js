import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import CrisisBanner from "@/components/CrisisBanner";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "덕성여자대학교 학생상담센터",
  description: "덕성여자대학교 학생상담센터 안내 사이트",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <CrisisBanner />
        <header>
          <Link
            href="/"
            className="mx-auto block max-w-5xl px-4 py-4 text-base font-semibold text-accent hover:text-accent-2"
          >
            덕성여자대학교 학생상담센터
          </Link>
        </header>
        <MainNav />
        <main className="w-full flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
