"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/counsel", label: "상담 알아보기" },
  { href: "/counsel/counselors", label: "상담사 소개" },
  { href: "/counsel/apply", label: "신청부터 진행까지" },
  { href: "/counsel/info", label: "이용 안내" },
  { href: "/counsel/privacy", label: "비밀보장·개인정보" },
  { href: "/counsel/faq", label: "FAQ" },
  { href: "/counsel/programs", label: "운영 프로그램" },
];

export default function CounselSubNav() {
  const pathname = usePathname();
  const activeRef = useRef(null);
  const scrollRef = useRef(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function updateFade() {
      setShowFade(el.scrollWidth - el.clientWidth - el.scrollLeft > 1);
    }

    activeRef.current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "instant" });
    updateFade();

    el.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);
    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [pathname]);

  return (
    <div className="brand-scope relative w-full border-b border-[var(--color-border)] bg-card">
      <ul
        ref={scrollRef}
        className="no-scrollbar mx-auto -my-1.5 flex flex-nowrap gap-1.5 overflow-x-auto px-4 py-4 text-sm md:max-w-[720px] [-webkit-overflow-scrolling:touch] [scroll-behavior:smooth] [scroll-padding-inline:16px] overscroll-x-contain"
      >
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <li key={link.href} className="flex-none" ref={active ? activeRef : undefined}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                onFocus={(e) => e.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest" })}
                className={`flex min-h-11 items-center rounded-full border px-3 whitespace-nowrap transition-colors ${
                  active
                    ? "border-maroon/20 bg-blush font-medium text-maroon"
                    : "border-transparent text-text-sub hover:text-moss"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 right-0 bottom-0 w-[28px] bg-[linear-gradient(to_right,transparent,var(--color-card))] transition-opacity duration-150 ${
          showFade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
