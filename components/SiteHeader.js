"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO_SRC = "/logo-v2.png";
// 헤더: 640px 이하 30px / 그 초과는 기존 그대로(68px, md 이상 96px)
const LOGO_HEADER_HEIGHT_CLASS = "h-[30px] sm:h-[68px] md:h-24";

export default function SiteHeader() {
  const pathname = usePathname();
  const [imgError, setImgError] = useState(false);

  // 메인 페이지는 배너 이미지를 자체적으로 보여주므로, 세로형 헤더 로고는
  // 탭 내비게이션과 같은 방식으로 숨긴다(중복 방지).
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="bg-cream pt-3 pb-2">
      <Link href="/" aria-label="무궁담 홈으로" className="mx-auto block max-w-[720px] px-[18px] sm:px-4">
        {imgError ? (
          <span className="inline-block text-[22px] font-bold tracking-[-0.02em] text-moss hover:text-moss-deep md:text-[30px]">
            무궁담
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={LOGO_SRC}
            alt="무궁담"
            onError={() => setImgError(true)}
            className={`block w-auto max-w-full ${LOGO_HEADER_HEIGHT_CLASS}`}
          />
        )}
      </Link>
    </header>
  );
}
