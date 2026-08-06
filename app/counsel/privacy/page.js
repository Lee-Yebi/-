const collection = [
  { item: "이름, 학과, 학년, 학번, 연락처, 주소", purpose: "상담" },
  { item: "필수항목 이외 (찾아온 경위, 문제유형 등)", purpose: "상담" },
  { item: "이전상담경험, 종교", purpose: "상담" },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-xl font-semibold">비밀보장 및 개인정보 보호</h1>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        덕성여자대학교 학생상담센터는 상담을 위하여 아래와 같이 개인정보 및 민감정보를
        수집·이용합니다.
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[480px] text-left text-sm">
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
                <td className="px-4 py-3 text-muted">5년</td>
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
    </div>
  );
}
