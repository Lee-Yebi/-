import PageContainer from "@/components/PageContainer";
import MountainIcon from "@/components/icons/MountainIcon";

const stats = [
  { number: "2명", label: "전임 상담원" },
  { number: "7명", label: "객원 상담원" },
  { number: "9명", label: "총 규모" },
];

export default function CounselorsPage() {
  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
      <h1 className="flex items-center gap-2 text-xl font-semibold text-moss">
        <MountainIcon className="text-moss" />
        상담사 소개
      </h1>

      <div className="mt-9 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--color-border)] bg-card p-4 text-center"
          >
            <p className="text-[32px] font-semibold text-moss">{stat.number}</p>
            <p className="mt-1 text-sm text-text-sub">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-maroon/20 bg-blush p-6 text-sm leading-relaxed text-maroon">
        모든 상담사는 임상심리사 또는 상담심리사 1·2급 이상의 자격증을 보유한
        전문가입니다.
      </div>
      </PageContainer>
    </div>
  );
}
