import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CrisisBanner from "@/components/CrisisBanner";
import SiteHeader from "@/components/SiteHeader";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import Mascot from "@/components/Mascot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "무궁담",
  description: "무궁담 · 덕성여자대학교 학생상담센터 안내 사이트",
  manifest: "/manifest.json",
  openGraph: {
    title: "무궁담",
    description: "덕성여자대학교 학생상담센터 안내",
    images: ["/logo-circle.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "무궁담",
    description: "덕성여자대학교 학생상담센터 안내",
    images: ["/logo-circle.png"],
  },
};

export const viewport = {
  themeColor: "#6B8E4E",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <CrisisBanner />
        <SiteHeader />
        <MainNav />
        <main className="w-full flex-1">{children}</main>
        <Footer />
        <Mascot />
        <Analytics />
      </body>
    </html>
  );
}
