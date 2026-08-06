"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/counsel", label: "상담 알아보기" },
  { href: "/counsel/apply", label: "신청부터 진행까지" },
  { href: "/counsel/privacy", label: "비밀보장·개인정보" },
  { href: "/counsel/counselors", label: "상담사 소개" },
  { href: "/counsel/programs", label: "운영 프로그램" },
  { href: "/counsel/faq", label: "FAQ" },
];

export default function CounselSubNav() {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-border bg-card">
      <ul className="mx-auto flex max-w-5xl gap-1.5 overflow-x-auto px-4 py-2.5 text-sm">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-block rounded-full border px-3 py-1.5 whitespace-nowrap transition-colors ${
                  active
                    ? "border-highlight-border bg-highlight font-medium text-highlight-foreground"
                    : "border-transparent text-muted hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
