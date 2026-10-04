"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/counsel", label: "상담 알아보기" },
  { href: "/counsel/counselors", label: "상담사 소개" },
  { href: "/counsel/apply", label: "신청부터 진행까지" },
  { href: "/counsel/programs", label: "운영 프로그램" },
  { href: "/counsel/info", label: "이용 안내" },
  { href: "/counsel/privacy", label: "비밀보장·개인정보" },
  { href: "/counsel/faq", label: "FAQ" },
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

export default function CounselSubNav({ links: navLinks = links }) {
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

    // el has CSS scroll-behavior:smooth (for the arrow buttons), which makes
    // scrollIntoView's behavior:"auto"/"instant" unreliable (it can defer to
    // the CSS and animate instead of jumping, or throw on old Safari). Center
    // the active tab by setting scrollLeft directly instead -- that's always
    // an instant jump regardless of CSS, with no API support concerns. Do it
    // after a paint (rAF) so the geometry we read is settled, not mid-layout.
    const raf = requestAnimationFrame(() => {
      const activeEl = activeRef.current;
      if (activeEl) {
        const containerRect = el.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();
        const offset =
          itemRect.left -
          containerRect.left +
          el.scrollLeft -
          el.clientWidth / 2 +
          itemRect.width / 2;
        el.scrollLeft = Math.max(0, offset);
      }
      updateScrollState();
    });

    el.addEventListener("scroll", updateScrollState, { passive: true });

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateScrollState);
      ro.observe(el);
    } else {
      window.addEventListener("resize", updateScrollState);
    }

    const mo = new MutationObserver(updateScrollState);
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", updateScrollState);
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener("resize", updateScrollState);
      }
      mo.disconnect();
    };
  }, [pathname]);

  function scrollByDirection(dir) {
    const el = scrollRef.current;
    if (!el) return;
    try {
      el.scrollBy({ left: el.clientWidth * 0.7 * dir, behavior: "smooth" });
    } catch {}
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
        <div
          ref={scrollRef}
          className={`no-scrollbar -my-1.5 min-w-0 flex-1 overflow-x-auto py-4 text-sm [-webkit-overflow-scrolling:touch] [scroll-behavior:smooth] [scroll-padding-inline:16px] overscroll-x-contain ${
            hasOverflow ? "pr-7 sm:pr-0" : ""
          }`}
        >
        <ul className="mx-auto flex w-max flex-nowrap gap-1.5">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <li key={link.href} className="flex-none" ref={active ? activeRef : undefined}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onFocus={(e) => e.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest" })}
                  className={`flex min-h-11 items-center rounded-full border px-3 whitespace-nowrap transition-colors ${
                    active
                      ? "border-maroon/20 bg-blush font-normal text-maroon"
                      : "border-transparent text-text-sub hover:text-moss"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        </div>
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
