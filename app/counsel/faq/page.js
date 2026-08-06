import PageContainer from "@/components/PageContainer";

const faqs = [
  {
    question: "누구나 상담받을 수 있나요?",
    answer: null,
  },
  {
    question: "예약하면 얼마나 기다려야 하나요?",
    answer: "평균 2~3주 정도 소요됩니다. 위기 상황인 경우 우선 배정됩니다.",
  },
  {
    question: "상담 내용이 외부에 알려지나요?",
    answer: null,
  },
  {
    question: "방학 중에도 상담받을 수 있나요?",
    answer: null,
  },
  {
    question: "상담사를 선택할 수 있나요?",
    answer: null,
  },
  {
    question: "상담실은 어디에 있나요?",
    answer: "상담실은 덕우당 1층 106호에 있습니다.",
  },
  {
    question: "상담실에서 휠체어 사용이 가능한가요?",
    answer: "네, 가능합니다.",
  },
  {
    question: "상담사가 제 성향과 안 맞아서 바꾸는 게 가능한가요?",
    answer: null,
  },
];

export default function FaqPage() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">FAQ</h1>

      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {faqs.map((item) => (
          <details key={item.question} className="group px-4 py-3">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground marker:content-none">
              {item.question}
              <span
                aria-hidden
                className="shrink-0 text-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.answer ?? "내용을 준비 중입니다."}
            </p>
          </details>
        ))}
      </div>
    </PageContainer>
  );
}
