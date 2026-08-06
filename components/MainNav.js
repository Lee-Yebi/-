"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/mind-care", label: "마음 관리" },
  { href: "/counsel", label: "상담 알아보기" },
  { href: "/reviews", label: "이용후기" },
  { href: "/external", label: "교외 도움 찾기" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <div className="mx-auto max-w-5xl px-4 py-2">
        <ul className="flex gap-1 rounded-full bg-border/40 p-1">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href} className="flex-1">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full px-1 py-2 text-center text-[13px] whitespace-nowrap transition-colors sm:text-sm ${
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
