"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO_SRC = "/logo-v2.png";
// 헤더: 모바일 48px / PC 64px
const LOGO_HEADER_HEIGHT_CLASS = "h-12 md:h-16";
// 메인 페이지 제목: 모바일 90px / PC 120px
const LOGO_HOME_HEIGHT_CLASS = "h-[90px] md:h-[120px]";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [imgError, setImgError] = useState(false);

  return (
    <header className={`py-4 ${isHome ? "mb-4" : ""}`}>
      <Link href="/" aria-label="무궁담 홈으로" className="mx-auto block max-w-5xl px-4">
        {imgError ? (
          <span
            className={`inline-block font-semibold tracking-[-0.02em] text-moss hover:text-moss-deep ${
              isHome ? "text-[32px] md:text-[48px]" : "text-[22px] md:text-[30px]"
            }`}
          >
            무궁담
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={LOGO_SRC}
            alt="무궁담"
            onError={() => setImgError(true)}
            className={`w-auto ${isHome ? LOGO_HOME_HEIGHT_CLASS : LOGO_HEADER_HEIGHT_CLASS}`}
          />
        )}
      </Link>
    </header>
  );
}
