import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/PageContainer";
import { TEAM } from "@/data/team";

const entryCards = [
  {
    title: "마음 관리",
    desc: "지금 내 마음 상태를 살펴보고 싶다면",
    href: "/mind-care",
  },
  {
    title: "상담센터 안내",
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
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
        <h1 className="text-[28px] leading-snug font-semibold text-text">
          혼자 견디지 않아도 괜찮습니다
        </h1>
        <p className="mt-2 text-base text-text-sub">
          덕성여자대학교 학생상담센터는 재학생 누구나 무료로 이용할 수 있습니다.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          {entryCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="block rounded-2xl border border-sprout bg-card p-6 transition-colors hover:border-leaf"
            >
              <h2 className="text-lg font-semibold text-moss">{card.title}</h2>
              <p className="mt-1.5 text-sm text-text-sub">{card.desc}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-maroon/20 bg-blush p-5 text-center sm:flex-row sm:text-left"
        >
          <Image
            src={TEAM.mascot.image}
            alt={TEAM.mascot.name}
            width={56}
            height={56}
            className="shrink-0 object-contain"
          />
          <div>
            <p className="text-[15px] font-semibold text-maroon">
              이 사이트는 {TEAM.name}이 만들었습니다
            </p>
            <p className="mt-1 text-[14px] text-maroon">
              덕성여대 재학생들이 상담을 더 쉽게 찾을 수 있도록
            </p>
          </div>
        </Link>
      </PageContainer>
    </div>
  );
}
