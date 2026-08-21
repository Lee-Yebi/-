import Link from "next/link";
import PageContainer from "@/components/PageContainer";

const entryCards = [
  {
    title: "마음 관리",
    desc: "지금 내 마음 상태를 살펴보고 싶다면",
    href: "/mind-care",
  },
  {
    title: "상담 알아보기",
    desc: "어떤 고민을 상담할 수 있는지, 어떻게 신청하는지",
    href: "/counsel",
  },
  {
    title: "이용후기",
    desc: "먼저 다녀온 학생들의 이야기",
    href: "/reviews",
  },
  {
    title: "교외 도움 찾기",
    desc: "학교 밖에서 도움받을 수 있는 곳",
    href: "/external",
  },
];

export default function Home() {
  return (
    <PageContainer>
      <h1 className="text-[28px] leading-snug font-semibold text-foreground">
        혼자 견디지 않아도 괜찮습니다
      </h1>
      <p className="mt-2 text-base text-muted">
        덕성여자대학교 학생상담센터는 재학생 누구나 무료로 이용할 수 있습니다.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {entryCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
          >
            <h2 className="text-lg font-semibold text-accent">{card.title}</h2>
            <p className="mt-1.5 text-sm text-muted">{card.desc}</p>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
