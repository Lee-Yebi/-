"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_PATHS = ["/reviews/new", "/admin"];

export default function BugReportLine() {
  const pathname = usePathname();

  if (pathname.startsWith("/mind-care/") || HIDDEN_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <p className="mt-2 text-[11px] text-muted">
      사이트 오류를 발견하셨다면{" "}
      <Link
        href="/about/bug-report"
        className="text-maroon underline underline-offset-2 hover:text-accent hover:decoration-2"
      >
        제보해 주세요 →
      </Link>
    </p>
  );
}
