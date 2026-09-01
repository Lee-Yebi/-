import PageContainer from "@/components/PageContainer";
import SourceNote from "@/components/SourceNote";

const etcPrograms = [
  {
    title: "Workshop",
    keyword: "자아성찰 · 협업 · 자아성장",
    desc: "진로나 성격에 대한 객관적 검사 결과를 바탕으로 자신을 돌아보고, 다른 학생들과 협력하며 서로를 이해·수용하는 경험을 하는 프로그램",
    extra: "대표 프로그램: MBTI Workshop",
    badge: "참여 전 사전검사 실시가 필수입니다",
  },
  {
    title: "찾아가는 심리측정 페스티벌 '심심해(心心解)'",
    desc: "매년 진행되는 심리건강 증진 행사로, 온라인으로 참여 가능. 간단한 심리검사로 현재의 심리 상태를 확인하고, 심박변이도·호흡 등 생리신호 측정을 통한 스트레스 점검도 함께 진행합니다.",
    extra: "실시 검사: CES-D(부정적 정서 경험, 일상의 흥미·활동 에너지 저하 여부 확인), 진로정체감검사(진로 결정 수준 확인)",
  },
  {
    title: "정신건강 특강 및 교육",
    desc: "교양 함양과 인격 성숙을 목표로, 매 학기 각 분야 전문가를 초빙해 강연회 개최",
  },
];

const careerRows = [
  {
    label: "커리어어드바이저",
    value: "학교생활 전반 및 진로 문제 해결 지원, 경력관리 정보 제공",
  },
  {
    label: "1:1 취업클리닉",
    value: "희망 업종·직무별 취업 전략 수립과 목표기업 취업을 위한 종합 상담",
  },
  { label: "SOS 입사서류 클리닉", value: "목표기업 제출용 이력서·자기소개서 맞춤 첨삭" },
  {
    label: "REAL 모의면접 클리닉",
    value: "면접 애티튜드, 면접 유형별·질문별 대응 방법 지도",
  },
  {
    label: "교과목 연계 상담",
    value: "진로·취업 교과목과 연계한 직업심리검사 해석 및 취업 상담",
  },
  { label: "직업심리검사", value: "진로·적성 관련 심리검사 실시 및 결과 해석" },
  {
    label: "캐치업 상담",
    value: "학사경고자 및 위험군(평점평균 1.75 이상 ~ 2.0 이하) 대상 '캐치업 프로그램'",
  },
];

const psychRows = [
  {
    label: "개인상담",
    value: "적응 문제, 대인관계, 정서적 불편감, 자아실현 욕구 등을 1:1 면담으로 다룸",
  },
  {
    label: "해석상담",
    value: "심리검사(MMPI, TCI, STRONG, CST 등) 결과를 통해 성격·흥미·적성·가치를 객관적으로 이해",
  },
];

const studyRows = [
  {
    label: "MLST-2 학습전략검사",
    value: "학습 과정의 습관적·행동적·전략적 효율성 측정",
  },
  {
    label: "KCM-2 대학전공선택검사",
    value: "적성과 흥미에 맞는 전공 선택·결정에 필요한 정보 제공",
  },
  { label: "CAT 대학적응력검사", value: "중도탈락 경향성 및 대학생활 적응력 진단" },
  { label: "1:1 컨설팅", value: "학업 문제 해결과 효과적인 학습전략 수립을 돕는 상담" },
  { label: "학습컨설팅 특강", value: "학습동기·학습전략·대학적응 관련 특강" },
];

function InfoTable({ rows, labelHeader = "구분", valueHeader = "내용" }) {
  return (
    <>
      <div className="mt-4 space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">{row.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{row.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-border/20 text-foreground">
              <th className="px-4 py-3 font-medium">{labelHeader}</th>
              <th className="px-4 py-3 font-medium">{valueHeader}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                <td className="px-4 py-3 text-muted">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ProgramsPage() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">센터 운영 프로그램</h1>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {etcPrograms.map((program) => (
          <div key={program.title} className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-accent">{program.title}</h3>
            {program.keyword && (
              <p className="mt-1 text-xs font-medium text-muted">{program.keyword}</p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-muted">{program.desc}</p>
            {program.extra && (
              <p className="mt-2 text-sm leading-relaxed text-muted">{program.extra}</p>
            )}
            {program.badge && (
              <p className="mt-3 inline-block rounded-full border border-highlight-border bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">
                {program.badge}
              </p>
            )}
          </div>
        ))}
      </div>

      <hr className="mt-10 border-border" />

      <h2 className="mt-8 text-base font-semibold text-foreground">상담 종류별 세부 프로그램</h2>
      <p className="mt-2 text-sm text-muted">
        학생상담센터(심리상담)와 진로·학습 상담 창구가 나뉘어 있습니다.
      </p>

      <h3 className="mt-6 text-sm font-semibold text-foreground">진로 / 취업 상담</h3>
      <InfoTable rows={careerRows} labelHeader="프로그램" valueHeader="내용" />

      <h3 className="mt-8 text-sm font-semibold text-foreground">심리 상담</h3>
      <InfoTable rows={psychRows} labelHeader="프로그램" valueHeader="내용" />

      <h3 className="mt-8 text-sm font-semibold text-foreground">학습 상담</h3>
      <InfoTable rows={studyRows} labelHeader="프로그램" valueHeader="내용" />

      <h3 className="mt-8 text-sm font-semibold text-foreground">창업 상담</h3>
      <div className="mt-4 rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted">세부 내용 확인 중</p>
      </div>

      <SourceNote />
    </PageContainer>
  );
}
