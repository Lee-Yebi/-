import PageContainer from "@/components/PageContainer";

const programs = [
  {
    name: "진로/취업상담",
    items: [
      {
        label: "커리어어드바이저",
        desc: "학교 생활 및 진로 문제 해결을 돕고 경력관리에 필요한 정보 제공",
      },
      {
        label: "1:1 취업클리닉",
        desc: "희망 업종·직무에 대한 구체적인 취업 전략 수립과 목표기업 합격을 위한 종합 상담",
      },
      { label: "SOS 입사서류 클리닉", desc: "이력서·자기소개서 맞춤형 첨삭 지도" },
      {
        label: "REAL 모의면접 클리닉",
        desc: "면접 에티튜드 및 유형별·질문별 대응 방법 지도",
      },
      {
        label: "교과목 연계 상담",
        desc: "진로·취업 교과목과 관련한 직업심리검사 결과 해석 상담 또는 취업 상담",
      },
      { label: "직업심리검사", desc: "진로·적성 등에 관련된 심리검사 진행 및 결과 해석 상담" },
      {
        label: "캐치업상담",
        desc: "학사경고자 및 학사경고 위험군을 대상으로 진행되는 '캐치업 프로그램' 상담",
      },
    ],
  },
  {
    name: "심리상담",
    description:
      "정서적 고통, 대인관계에서의 갈등, 사회생활에서의 부적응 등 일상생활에서 겪는 다양한 문제에서 벗어나 보다 적응적이고 편안한 삶을 누릴 수 있도록 상담자와 내담자가 협력하여 문제를 풀어나가는 과정입니다.",
    items: [
      {
        label: "개인상담",
        desc: "대학생활 및 일상생활에서 발생하는 적응 문제, 대인관계의 어려움, 정서적 불편감, 자아실현의 욕구 등을 상담 전문가와의 1:1 면담을 통해 다루는 과정",
      },
      {
        label: "해석상담",
        desc: "심리검사(MMPI-2, TCI, RS, CST 등)를 통해 자신의 성격과 심리적 특성, 적성과 흥미 등을 객관적으로 이해하는 과정",
      },
    ],
  },
  { name: "창업상담", items: [] },
  { name: "학습상담", items: [] },
];

export default function ProgramsPage() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">센터 운영 프로그램</h1>

      <div className="mt-6 space-y-4">
        {programs.map((program) => (
          <section
            key={program.name}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h2 className="text-base font-semibold text-foreground">
              {program.name}
            </h2>

            {program.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {program.description}
              </p>
            )}

            {program.items.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {program.items.map((item) => (
                  <li key={item.label} className="text-sm leading-relaxed text-muted">
                    <span className="font-medium text-foreground">{item.label}</span>
                    {": "}
                    {item.desc}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">내용을 준비 중입니다.</p>
            )}
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
