"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [imgError, setImgError] = useState(false);

  return (
    <header className={`py-3.5 ${isHome ? "mb-4" : ""}`}>
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
            src="/logo.png"
            alt="무궁담"
            onError={() => setImgError(true)}
            className={`w-auto ${isHome ? "h-11 md:h-14" : "h-7 md:h-[34px]"}`}
          />
        )}
      </Link>
    </header>
  );
}
