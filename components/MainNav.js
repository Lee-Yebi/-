"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/mind-care", label: "마음 관리" },
  { href: "/counsel", label: "상담 알아보기" },
  { href: "/reviews", label: "이용후기" },
  { href: "/external", label: "교외 도움 찾기" },
];

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="w-full border-b border-border md:border-b-0">
      <div className="mx-auto max-w-5xl px-4 py-2">
        {/* mobile: hamburger toggle */}
        <div className="flex items-center justify-between md:hidden">
          <span className="text-sm font-medium text-muted">메뉴</span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="main-nav-menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground"
          >
            <span className="sr-only">메뉴 {open ? "닫기" : "열기"}</span>
            {open ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>

        {/* mobile: dropdown menu */}
        {open && (
          <ul id="main-nav-menu" className="mt-2 flex flex-col gap-1 pb-1 md:hidden">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 items-center rounded-lg px-4 text-sm transition-colors ${
                      active
                        ? "bg-highlight font-medium text-highlight-foreground"
                        : "text-muted hover:bg-border/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* desktop: horizontal nav, always visible */}
        <ul className="hidden gap-1 rounded-full bg-border/40 p-1 md:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href} className="flex-1">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full px-3 py-2 text-center text-sm whitespace-nowrap transition-colors ${
                    active
                      ? "bg-card font-medium text-accent shadow-sm"
                      : "text-muted hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
