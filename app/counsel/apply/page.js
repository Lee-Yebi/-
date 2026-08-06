const concernCategories = [
  { title: "1. 자아성장", items: ["자기탐색 및 성장", "자기표현 향상"] },
  { title: "2. 정서적 문제", items: ["우울, 무기력, 급격한 기분변화", "불안"] },
  {
    title: "3. 성격 문제",
    items: ["성격적 결함으로 인한 타인과의 마찰", "자신의 성격 특성 파악 및 회피"],
  },
  {
    title: "4. 행동 및 습관의 문제",
    items: [
      "주의집중 곤란, 우유부단",
      "강박적 행동, 식습관",
      "중독(음주, 흡연, 인터넷, 게임, 도박 등)",
      "성문제",
    ],
  },
  { title: "5. 실존적 문제", items: ["삶에 대한 회의, 가치관의 혼란", "죽음에 대한 생각"] },
  { title: "6. 가정 문제", items: ["부모와의 마찰 및 불일치", "형제자매와의 마찰 및 불화"] },
  { title: "7. 대인관계", items: ["이성친구와의 관계, 친구 관계", "선후배 관계, 사제 관계"] },
  { title: "8. 학업 및 진로 문제", items: ["학업부진, 적성문제, 진로문제"] },
  {
    title: "9. 적응 문제",
    items: ["소속 학과에 대한 적응, 소속 동아리에 대한 적응", "그 외 학교 환경에 대한 적응"],
  },
  {
    title: "10. 경제적 또는 현실적 문제",
    items: ["학비, 생활비, 기타", "학교환경, 주거환경"],
  },
];

const timeSlots = ["10~11시", "11~12시", "13~14시", "14~15시", "15~16시", "16~17시"];

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-xl font-semibold">상담 신청부터 진행까지</h1>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-foreground">
          이런 고민, 상담받을 수 있어요
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {concernCategories.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-medium text-foreground">{cat.title}</p>
              <ul className="mt-1.5 space-y-1">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
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
    </div>
  );
}
