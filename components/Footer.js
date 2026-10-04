import Link from "next/link";
import BugReportLine from "@/components/BugReportLine";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background pt-6 pb-24 md:pb-32 lg:pb-6">
      <div className="mx-auto w-full px-4 text-center leading-relaxed md:max-w-[720px]">
        <p className="text-sm font-bold text-foreground">
          🌸 무궁담 · 마음을 마주하는 이야기
        </p>
        <p className="mt-2 text-xs text-muted">
          영마인드링크 3기 덕성여대팀 DPSY:ON이 만든 학생 주도 마음건강 안내 사이트예요.
        </p>
        <p className="text-xs text-muted">
          학생상담센터 공식 사이트가 아니며, 상담 신청·문의는 덕성여자대학교 학생상담센터로 직접
          해주세요.
        </p>
        <p className="mt-4 text-[11px] text-muted">
          <Link href="/about" className="text-accent hover:text-accent-2">
            DPSY:ON 소개
          </Link>
          {" · 인스타그램 "}
          <a
            href="https://www.instagram.com/oreumi_dpsy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-2"
          >
            @oreumi_dpsy
          </a>
        </p>
        <BugReportLine />
        <p className="mt-1 text-[10px] text-muted">
          © 2026 DPSY:ON · 덕성여대 심리학전공 임상심리 소모임 DCP-ing
        </p>
      </div>
    </footer>
  );
}
