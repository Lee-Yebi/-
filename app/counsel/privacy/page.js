import PageContainer from "@/components/PageContainer";

const collection = [
  { item: "이름, 학과, 학년, 학번, 연락처, 주소", purpose: "상담", period: "5년" },
  { item: "필수항목 이외 (찾아온 경위, 문제유형 등)", purpose: "상담", period: "5년" },
  { item: "이전상담경험, 종교", purpose: "상담", period: "5년" },
];

const faqs = [
  "상담 내용이 학교나 부모님에게 전달되나요?",
  "상담 기록은 얼마나 보관되나요?",
  "상담받은 사실이 학적부나 성적에 남나요?",
  "교수님이나 지인과 마주치면 어떡하나요?",
  "비밀보장에 예외가 있나요?",
];

export default function PrivacyPage() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">비밀보장 및 개인정보 보호</h1>

      <p className="mt-6 rounded-xl border border-highlight-border bg-highlight p-5 text-base leading-relaxed text-highlight-foreground">
        상담 내용과 개인정보는 철저히 비밀이 보장됩니다.
      </p>

      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {faqs.map((question) => (
          <details key={question} className="group px-4 py-3">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground marker:content-none">
              {question}
              <span
                aria-hidden
                className="shrink-0 text-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 inline-block rounded-full border border-highlight-border bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">
              [확인 중]
            </p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-sm leading-relaxed text-muted">
        덕성여자대학교 학생상담센터는 상담을 위하여 아래와 같이 개인정보 및 민감정보를
        수집·이용합니다.
      </p>

      {/* mobile: stacked cards, one row per item */}
      <div className="mt-4 space-y-3 md:hidden">
        {collection.map((row) => (
          <div key={row.item} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">{row.item}</p>
            <dl className="mt-2 space-y-1 text-sm text-muted">
              <div className="flex justify-between gap-4">
                <dt>수집 목적</dt>
                <dd>{row.purpose}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>보유 기간</dt>
                <dd>{row.period}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* desktop: table */}
      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-border/20 text-foreground">
              <th className="px-4 py-3 font-medium">수집 항목</th>
              <th className="px-4 py-3 font-medium">수집 목적</th>
              <th className="px-4 py-3 font-medium">보유 기간</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {collection.map((row) => (
              <tr key={row.item}>
                <td className="px-4 py-3 text-muted">{row.item}</td>
                <td className="px-4 py-3 text-muted">{row.purpose}</td>
                <td className="px-4 py-3 text-muted">{row.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
        <li>
          · 위 개인정보(민감정보) 수집·이용에 대한 동의를 거부할 권리가 있습니다. 다만
          동의를 거부할 경우 원활한 상담에 제한을 받을 수 있습니다.
        </li>
        <li>
          · 심리검사 결과가 연구 목적으로 사용될 경우 익명으로 처리됩니다. 원활한 상담
          진행을 위해 상담 내용이 기록·녹음될 경우 비밀이 보장됩니다.
        </li>
        <li>
          · 연계상담(진로, 학습, 취업상담) 시 검사 결과지를 타 부서에서 열람할 수
          있습니다.
        </li>
      </ul>
    </PageContainer>
  );
}
