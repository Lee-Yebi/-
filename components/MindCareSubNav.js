"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [pathname]);

  return (
    <div className="w-full border-b border-border bg-card">
      <ul className="no-scrollbar mx-auto flex max-w-5xl gap-1.5 overflow-x-auto px-4 py-2.5 text-sm">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <li key={link.href} className="shrink-0" ref={active ? activeRef : undefined}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-full border px-3 whitespace-nowrap transition-colors ${
                  active
                    ? "border-highlight-border bg-highlight font-semibold text-accent"
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
