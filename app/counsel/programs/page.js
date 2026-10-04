import PageContainer from "@/components/PageContainer";
import SourceNote from "@/components/SourceNote";
import MountainIcon from "@/components/icons/MountainIcon";

const etcPrograms = [
  {
    title: "Workshop",
    keyword: "자아성찰 · 협업 · 자아성장",
    desc: "진로나 성격에 대한 객관적 검사 결과를 바탕으로 자신을 돌아보고, 다른 학생들과 협력하며 서로를 이해·수용하는 경험을 하는 프로그램",
    extra: "대표 프로그램: MBTI Workshop",
    badge: "참여 전 사전검사 실시가 필수입니다",
    column: 1,
  },
  {
    title: "찾아가는 심리측정 페스티벌 '심심해(心心解)'",
    desc: "매년 진행되는 심리건강 증진 행사로, 온라인으로 참여 가능. 간단한 심리검사로 현재의 심리 상태를 확인하고, 심박변이도·호흡 등 생리신호 측정을 통한 스트레스 점검도 함께 진행합니다.",
    extra: "실시 검사: CES-D(부정적 정서 경험, 일상의 흥미·활동 에너지 저하 여부 확인), 진로정체감검사(진로 결정 수준 확인)",
    link: {
      label: "비교과통합관리시스템(De:light)에서 신청하기",
      href: "https://delight.duksung.ac.kr/",
    },
    linkNote: "모집 기간에만 신청할 수 있습니다.",
    column: 2,
  },
  {
    title: "정신건강 특강 및 교육",
    desc: "교양 함양과 인격 성숙을 목표로, 매 학기 각 분야 전문가를 초빙해 강연회 개최",
    column: 1,
  },
];

function ProgramCard({ program }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-card p-6">
      <h3 className="text-base font-bold text-moss">{program.title}</h3>
      {program.keyword && (
        <p className="mt-1 text-xs font-normal text-text-sub">{program.keyword}</p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-text-sub">{program.desc}</p>
      {program.extra && (
        <p className="mt-2 text-sm leading-relaxed text-text-sub">{program.extra}</p>
      )}
      {program.badge && (
        <p className="mt-3 inline-block rounded-full border border-maroon/20 bg-blush px-3 py-1 text-xs font-bold text-maroon">
          {program.badge}
        </p>
      )}
      {program.link && (
        <a
          href={program.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[14px] text-moss-deep underline underline-offset-2"
        >
          {program.link.label} ↗
        </a>
      )}
      {program.linkNote && (
        <p className="mt-1 text-[13px] text-text-sub">{program.linkNote}</p>
      )}
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
      <h1 className="flex items-center gap-2 text-xl font-bold text-moss">
        <MountainIcon className="text-moss" />
        센터 운영 프로그램
      </h1>

      <div className="mt-9">
        {/* 모바일: 원래 데이터 순서 그대로 한 줄로 쌓기 */}
        <div className="flex flex-col gap-[14px] md:hidden">
          {etcPrograms.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>

        {/* PC: program.column(1 또는 2) 값으로 열을 나눠 각 열을 독립적으로 세로로 쌓기 */}
        <div className="hidden md:flex md:items-start md:gap-[14px]">
          {[1, 2].map((col) => (
            <div key={col} className="flex flex-1 flex-col gap-[14px]">
              {etcPrograms
                .filter((program) => program.column === col)
                .map((program) => (
                  <ProgramCard key={program.title} program={program} />
                ))}
            </div>
          ))}
        </div>
      </div>

      <SourceNote />
      </PageContainer>
    </div>
  );
}
