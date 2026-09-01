import PageContainer from "@/components/PageContainer";

const stats = [
  { number: "2명", label: "전임 상담원" },
  { number: "7명", label: "객원 상담원" },
  { number: "9명", label: "총 규모" },
];

export default function CounselorsPage() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">상담사 소개</h1>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <p className="text-[32px] font-semibold text-accent">{stat.number}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
        모든 상담사는 임상심리사 또는 상담심리사 1·2급 이상의 자격증을 보유한
        전문가입니다.
      </div>
    </PageContainer>
  );
}
