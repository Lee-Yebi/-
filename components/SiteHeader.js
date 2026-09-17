"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={`py-3.5 ${isHome ? "mb-4" : ""}`}>
      <Link
        href="/"
        className={`mx-auto block max-w-5xl px-4 font-semibold tracking-[-0.02em] text-accent hover:text-accent-2 ${
          isHome ? "text-[32px] md:text-[40px]" : "text-[22px] md:text-[26px]"
        }`}
      >
        무궁담
      </Link>
    </header>
  );
}
