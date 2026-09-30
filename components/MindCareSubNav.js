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

function ChevronIcon({ direction }) {
  const d = direction === "prev" ? "M9 3 L4.5 8 L9 13" : "M4.5 3 L9 8 L4.5 13";
  return (
    <svg width="16" height="16" viewBox="0 0 13 16" fill="none" aria-hidden="true">
      <path d={d} stroke="#3C5233" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScrollButton({ direction, onClick, disabled, hasOverflow }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "이전 항목 보기" : "다음 항목 보기"}
      className={`group hidden h-11 w-11 shrink-0 items-center justify-center sm:flex ${
        !hasOverflow ? "sm:invisible" : ""
      } ${disabled ? "cursor-default opacity-35" : "cursor-pointer"}`}
    >
      <span
        className={`flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#DCD2BE] bg-white transition-colors ${
          disabled ? "" : "group-hover:border-[#6B8E4E] group-hover:bg-[#FCFBF4]"
        }`}
      >
        <ChevronIcon direction={direction} />
      </span>
    </button>
  );
}

export default function MindCareSubNav() {
  const pathname = usePathname();
  const activeRef = useRef(null);
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function updateScrollState() {
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
      setHasOverflow(el.scrollWidth - el.clientWidth > 1);
    }

    activeRef.current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "instant" });
    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    const mo = new MutationObserver(updateScrollState);
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  function scrollByDirection(dir) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.7 * dir, behavior: "smooth" });
  }

  return (
    <div className="brand-scope w-full border-b border-[var(--color-border)] bg-card">
      <div className="mx-auto flex items-center gap-2 px-4 md:max-w-[720px]">
        <ScrollButton
          direction="prev"
          onClick={() => scrollByDirection(-1)}
          disabled={atStart}
          hasOverflow={hasOverflow}
        />
        <ul
          ref={scrollRef}
          className="no-scrollbar -my-1.5 flex min-w-0 flex-1 flex-nowrap gap-1.5 overflow-x-auto py-4 pr-7 text-sm sm:pr-0 [-webkit-overflow-scrolling:touch] [scroll-behavior:smooth] [scroll-padding-inline:16px] overscroll-x-contain"
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
        <ScrollButton
          direction="next"
          onClick={() => scrollByDirection(1)}
          disabled={atEnd}
          hasOverflow={hasOverflow}
        />
      </div>
    </div>
  );
}
