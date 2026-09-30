"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/mind-care", label: "전체" },
  { href: "/mind-care/stress", label: "스트레스" },
  { href: "/mind-care/anxiety", label: "불안장애" },
  { href: "/mind-care/adjustment", label: "적응장애" },
  { href: "/mind-care/adult-adhd", label: "성인 ADHD" },
  { href: "/mind-care/pmdd", label: "월경 전 불쾌감 증상" },
  { href: "/mind-care/anorexia", label: "거식증" },
  { href: "/mind-care/bulimia", label: "신경성 폭식증" },
  { href: "/mind-care/addiction", label: "중독(의존)" },
];

export default function MindCareSubNav() {
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
                    ? "border-maroon/20 bg-blush font-semibold text-maroon"
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
