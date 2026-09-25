"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO_SRC = "/logo-v2.png";
// 헤더: 모바일 68px / PC 96px
const LOGO_HEADER_HEIGHT_CLASS = "h-[68px] md:h-24";
// 메인 페이지 제목: 모바일 110px / PC 150px
const LOGO_HOME_HEIGHT_CLASS = "h-[110px] md:h-[150px]";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [imgError, setImgError] = useState(false);

  return (
    <header className="bg-cream pt-3 pb-2">
      <Link href="/" aria-label="무궁담 홈으로" className="mx-auto block max-w-[720px] px-4">
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
