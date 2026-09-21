import PageContainer from "@/components/PageContainer";
import MountainIcon from "@/components/icons/MountainIcon";

const faqs = [
  {
    question: "누구나 상담받을 수 있나요?",
    answer: "덕성여자대학교 재학생이라면 누구나 받을 수 있습니다.",
  },
  {
    question: "상담까지 얼마나 기다려야 하나요?",
    answer:
      "평균적으로 2~3주 정도 소요되나, 상담까지 걸리는 기간은 개인의 심리검사 완료 시점에 따라 달라집니다. 신청 후 필요한 심리검사를 완료해야 상담을 진행할 수 있으며, 검사를 빠르게 완료할수록 상담까지 걸리는 기간이 짧아질 수 있습니다.",
  },
  {
    question: "상담 내용이 외부에 알려지나요?",
    answer:
      "외부인에게 유출되지 않으며, 상담 기록은 관련 법령에 따라 5년간 보관 후 폐기됩니다.",
  },
  {
    question: "방학 중에도 상담받을 수 있나요?",
    answer:
      "방학 중에도 상담이 가능합니다. 위기상담을 이용할 수 있으며, 비대면 온라인(ZOOM) 상담도 운영됩니다.",
  },
  {
    question: "상담사를 선택할 수 있나요?",
    answer:
      "해석상담은 상담사가 배정됩니다. 개인상담(다회기)은 상담사의 성별이나 상담 성향 등을 고려하여 배정받을 수 있습니다. 남성 상담사가 배정될 경우 상담 가능 여부를 먼저 확인하며, 불편한 경우 여성 상담사로 조정할 수 있습니다.",
  },
  {
    question: "상담사가 저와 맞지 않으면 바꿀 수 있나요?",
    answer: "배정받은 상담사가 맞지 않는다고 느낀다면 상담사 교체를 요청할 수 있습니다.",
  },
  {
    question: "휠체어를 사용하는데 상담을 받을 수 있나요?",
    answer:
      "휠체어를 사용하는 학생의 경우, 장애학생지원센터 내 휴게실에서 상담을 진행할 수 있습니다. 상담을 신청할 때 이용에 필요한 사항을 미리 알려주세요.",
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

      <p className="mt-[60px] text-xs text-text-sub">
        일부 답변은{" "}
        <a
          href="https://www.dspress.org/news/articleView.html?idxno=11955"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-moss-deep"
        >
          덕성여대신문
        </a>{" "}
        기사를 참고했으며, 방학 중 운영·상담사 배정·대기 기간·휠체어 이용 안내는
        덕성여자대학교 학생상담센터에 직접 확인한 내용입니다.
      </p>
      </PageContainer>
    </div>
  );
}
