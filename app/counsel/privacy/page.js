import PageContainer from "@/components/PageContainer";
import MountainIcon from "@/components/icons/MountainIcon";

const collection = [
  { item: "이름, 학과, 학년, 학번, 연락처, 주소", purpose: "상담", period: "5년" },
  { item: "필수항목 이외 (찾아온 경위, 문제유형 등)", purpose: "상담", period: "5년" },
  { item: "이전상담경험, 종교", purpose: "상담", period: "5년" },
];

export default function PrivacyPage() {
  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
      <h1 className="flex items-center gap-2 text-xl font-semibold text-moss">
        <MountainIcon className="text-moss" />
        비밀보장 및 개인정보 보호
      </h1>

      <p className="mt-9 rounded-2xl border border-maroon/20 bg-blush p-6 text-base leading-relaxed text-maroon">
        상담 내용과 개인정보는 철저히 비밀이 보장됩니다.
      </p>

      <p className="mt-9 text-sm leading-relaxed text-text-sub">
        덕성여자대학교 학생상담센터는 상담을 위하여 아래와 같이 개인정보 및 민감정보를
        수집·이용합니다.
      </p>

      {/* mobile: stacked cards, one row per item */}
      <div className="mt-4 space-y-3 md:hidden">
        {collection.map((row) => (
          <div key={row.item} className="rounded-2xl border border-[var(--color-border)] bg-card p-4">
            <p className="text-sm font-medium text-text">{row.item}</p>
            <dl className="mt-2 space-y-1 text-sm text-text-sub">
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
      <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-[var(--color-border)] md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-border)]/20 text-text">
              <th className="px-4 py-3 font-medium">수집 항목</th>
              <th className="px-4 py-3 font-medium">수집 목적</th>
              <th className="px-4 py-3 font-medium">보유 기간</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)] bg-card">
            {collection.map((row) => (
              <tr key={row.item}>
                <td className="px-4 py-3 text-text-sub">{row.item}</td>
                <td className="px-4 py-3 text-text-sub">{row.purpose}</td>
                <td className="px-4 py-3 text-text-sub">{row.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-9 space-y-3 text-sm leading-relaxed text-text-sub">
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
    </div>
  );
}
