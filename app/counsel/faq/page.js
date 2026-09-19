import PageContainer from "@/components/PageContainer";
import MountainIcon from "@/components/icons/MountainIcon";

const faqs = [
  {
    question: "누구나 상담받을 수 있나요?",
    answer: "덕성여자대학교 재학생이라면 누구나 받을 수 있습니다.",
  },
  {
    question: "예약하면 얼마나 기다려야 하나요?",
    answer: "평균 2~3주 정도 소요됩니다. 위기 상황인 경우 우선 배정됩니다.",
  },
  {
    question: "상담 내용이 외부에 알려지나요?",
    answer:
      "외부인에게 유출되지 않으며, 상담 기록은 관련 법령에 따라 5년간 보관 후 폐기됩니다.",
  },
  {
    question: "방학 중에도 상담받을 수 있나요?",
    answer: "방학 중에는 학생상담센터의 내부 사정에 따라 위기 상담 사례만 진행됩니다.",
  },
  {
    question: "상담사를 선택할 수 있나요?",
    answer: "상담 내용과 내담자의 성향에 맞춰 상담사가 배정됩니다.",
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
    question: "상담사가 저와 맞지 않으면 바꿀 수 있나요?",
    answer: "배정받은 상담사가 맞지 않는다고 느낀다면 상담사 교체를 요청할 수 있습니다.",
  },
];

export default function FaqPage() {
  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
      <h1 className="flex items-center gap-2 text-xl font-semibold text-moss">
        <MountainIcon className="text-moss" />
        FAQ
      </h1>

      <div className="mt-9 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-card">
        {faqs.map((item) => (
          <details key={item.question} className="group px-4 py-3">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-text marker:content-none">
              {item.question}
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-text-sub transition-transform group-open:rotate-180"
              >
                <path d="M5 7.5 L10 12.5 L15 7.5" />
              </svg>
            </summary>
            <p className="mt-2 text-[15px] leading-[1.7] text-text-sub">
              {item.answer ?? "내용을 준비 중입니다."}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-[60px] text-xs text-[#8C8087]">
        출처:{" "}
        <a
          href="https://www.dspress.org/news/articleView.html?idxno=11955"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-moss-deep"
        >
          덕성여대신문 (dspress.org)
        </a>
      </p>
      </PageContainer>
    </div>
  );
}
