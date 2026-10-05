import { Geist, Geist_Mono } from "next/font/google";
// import localFont from "next/font/local"; // 강원교육모두 비활성화 (비교용으로 남김)
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CrisisBanner from "@/components/CrisisBanner";
import SiteHeader from "@/components/SiteHeader";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import Mascot from "@/components/Mascot";
import SeasonalFall from "@/components/SeasonalFall";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 강원교육모두 비활성화 (국민연금체로 교체, 비교/복원용으로 남김)
// 복원: 이 블록과 위 import 주석을 풀고, html className에 ${gangwon.variable} 추가,
//       globals.css body font-family 맨 앞에 var(--font-main) 추가
// const gangwon = localFont({
//   src: [
//     { path: "./fonts/GangwonEduAll-Light.woff2", weight: "300", style: "normal" },
//     { path: "./fonts/GangwonEduAll-Bold.woff2", weight: "700", style: "normal" },
//   ],
//   variable: "--font-main",
//   display: "swap",
//   fallback: ["Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
// });

export const metadata = {
  metadataBase: new URL("https://mugungdam.vercel.app"),
  title: "무궁담",
  description: "무궁담 · 덕성여자대학교 학생상담센터 안내 사이트",
  manifest: "/manifest.json",
  openGraph: {
    title: "무궁담",
    description: "덕성여자대학교 학생상담센터 안내",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "무궁담 - 마음을 마주하는 이야기",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "무궁담",
    description: "덕성여자대학교 학생상담센터 안내",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  themeColor: "#6B8E4E",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} /* ${gangwon.variable} 비활성화 */
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SeasonalFall />
        <div className="relative z-[1] flex flex-1 flex-col">
          <CrisisBanner />
          <SiteHeader />
          <MainNav />
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </div>
        <Mascot />
        <Analytics />
      </body>
    </html>
  );
}
