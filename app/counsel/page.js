import Link from "next/link";
import PageContainer from "@/components/PageContainer";

const concernCategories = [
  { title: "자아성장", tags: ["자기탐색 및 성장", "자기표현 향상"] },
  { title: "정서적 문제", tags: ["우울", "무기력", "급격한 기분변화", "불안"] },
  {
    title: "성격 문제",
    tags: ["성격적 결함으로 인한 타인과의 마찰", "자신의 성격 특성 파악 및 회피"],
  },
  {
    title: "행동 및 습관의 문제",
    tags: [
      "주의집중 곤란",
      "우유부단",
      "강박적 행동",
      "식습관",
      "중독(음주, 흡연, 인터넷, 게임, 도박 등)",
      "성문제",
    ],
  },
  {
    title: "실존적 문제",
    tags: ["삶에 대한 회의", "가치관의 혼란", "죽음에 대한 생각"],
    crisisNote: true,
  },
  { title: "가정 문제", tags: ["부모와의 마찰 및 불일치", "형제자매와의 마찰 및 불화"] },
  {
    title: "대인관계",
    tags: ["이성친구와의 관계", "친구 관계", "선후배 관계", "사제 관계"],
  },
  { title: "학업 및 진로 문제", tags: ["학업부진", "적성문제", "진로문제"] },
  {
    title: "적응 문제",
    tags: ["소속 학과에 대한 적응", "소속 동아리에 대한 적응", "그 외 학교 환경에 대한 적응"],
  },
  {
    title: "경제적 또는 현실적 문제",
    tags: ["학비", "생활비", "기타", "학교환경", "주거환경"],
  },
];

export default function CounselPage() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">상담 알아보기</h1>

      <p className="mt-2 text-sm text-muted">
        아래 중 하나라도 해당된다면 편하게 신청하셔도 됩니다
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {concernCategories.map((cat) => (
          <div key={cat.title} className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-accent">{cat.title}</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[20px] bg-highlight px-[11px] py-1.5 text-[13px] whitespace-nowrap text-highlight-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {cat.crisisNote && (
              <>
                <hr className="mt-4 border-border" />
                <p className="mt-3 text-[13px] text-highlight-foreground">
                  지금 많이 힘드시다면{" "}
                  <a href="tel:109" className="font-semibold underline underline-offset-2">
                    109
                  </a>
                  (24시간)로 바로 연락하셔도 됩니다
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      <Link
        href="/counsel/apply"
        className="mt-8 flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-2"
      >
        상담 신청부터 진행까지 보기
      </Link>
    </PageContainer>
  );
}
