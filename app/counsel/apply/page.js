import PageContainer from "@/components/PageContainer";

const timeSlots = ["10~11시", "11~12시", "13~14시", "14~15시", "15~16시", "16~17시"];

export default function ApplyPage() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">상담 신청부터 진행까지</h1>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-foreground">상담 가능 시간</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          평일 오전 10시부터 오후 5시까지, 아래 시간대 중 선택하여 신청할 수 있습니다.
          (점심시간 12~13시 제외)
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <span
              key={slot}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground"
            >
              {slot}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">요일: 월요일 ~ 금요일</p>
      </section>
    </PageContainer>
  );
}
