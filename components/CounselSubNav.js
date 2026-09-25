"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/counsel", label: "상담 알아보기" },
  { href: "/counsel/apply", label: "신청부터 진행까지" },
  { href: "/counsel/info", label: "이용 안내" },
  { href: "/counsel/privacy", label: "비밀보장·개인정보" },
  { href: "/counsel/counselors", label: "상담사 소개" },
  { href: "/counsel/programs", label: "운영 프로그램" },
  { href: "/counsel/faq", label: "FAQ" },
];

export default function CounselSubNav() {
  const pathname = usePathname();

  return (
    <div className="brand-scope w-full border-b border-[var(--color-border)] bg-card">
      <ul className="mx-auto flex max-w-5xl gap-1.5 overflow-x-auto px-4 py-2.5 text-sm">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
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
    </div>
  );
}
