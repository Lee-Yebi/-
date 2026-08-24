"use client";

import { useState } from "react";
import PageContainer from "@/components/PageContainer";

const tabs = [
  { key: "individual", label: "개인상담" },
  { key: "test", label: "심리검사" },
  { key: "group", label: "집단상담" },
  { key: "etc", label: "기타 프로그램" },
];

const individualTopics = [
  { title: "적응", desc: "대학생활 적응의 어려움, 새로운 환경에서의 부적응" },
  { title: "대인관계", desc: "친구·선후배·연인·가족 등 관계에서의 갈등과 어려움" },
  { title: "정서", desc: "우울, 불안, 정서적 불편감, 일상적인 정서적 고통" },
  { title: "자기이해 / 자아실현", desc: "나에 대한 이해, 성장 욕구, 진로와 연결된 자기탐색" },
];

const individualFormatRows = [
  { label: "개인상담", value: "1:1 면담으로 위 주제들을 다루며 해결책을 모색하는 심층 상담" },
  {
    label: "해석상담",
    value: "심리검사 결과를 바탕으로 성격·흥미·적성·가치를 객관적으로 이해하는 단회기 상담",
  },
];

const testAreas = ["성격 유형", "적성 및 흥미", "정서 및 적응", "진로"];

const testItems = [
  {
    name: "MBTI (성격유형검사)",
    desc: "16가지 선호 유형을 통해 나와 타인의 심리적 특성 이해",
    time: "약 30분",
  },
  {
    name: "TCI (기질 및 성격검사)",
    desc: "타고난 기질과 후천적으로 형성된 성격을 구분해 이해",
    time: "약 40분",
  },
  {
    name: "MMPI (다면적 인성검사)",
    desc: "성격 특성과 정서적 적응 등 심리 내적 영역을 폭넓게 측정",
    time: "약 60분",
  },
  {
    name: "STRONG (직업흥미검사)",
    desc: "흥미 유형을 파악해 진로 탐색에 활용",
    time: "약 40분",
  },
  {
    name: "CST (성격강점검사)",
    desc: "자신이 가진 강점을 확인하고 발전 방향 탐색",
    time: null,
  },
];

const groupComparisonRows = [
  { label: "형태", individual: "상담자와 1:1", group: "소그룹 + 상담자" },
  {
    label: "강점",
    individual: "나의 문제를 깊이 있게 다룸",
    group: "내 문제를 다른 시각에서 보게 됨",
  },
  {
    label: "부수 효과",
    individual: "자기이해",
    group: "또래의 격려·피드백을 통한 대인관계 능력 향상",
  },
];

const groupOperations = [
  "운영 주제는 매 학기 달라집니다.",
  "모집 공고는 학생상담센터 홈페이지와 비교과통합관리시스템에 게시됩니다.",
  "신청은 비교과통합관리시스템에서 온라인으로 진행합니다.",
];

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

function ComparisonTable({ rows }) {
  return (
    <>
      <div className="mt-4 space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">{row.label}</p>
            <dl className="mt-2 space-y-1 text-sm text-muted">
              <div className="flex justify-between gap-4">
                <dt>개인상담</dt>
                <dd>{row.individual}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>집단상담</dt>
                <dd>{row.group}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-border/20 text-foreground">
              <th className="px-4 py-3 font-medium"></th>
              <th className="px-4 py-3 font-medium">개인상담</th>
              <th className="px-4 py-3 font-medium">집단상담</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                <td className="px-4 py-3 text-muted">{row.individual}</td>
                <td className="px-4 py-3 text-muted">{row.group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState("individual");

  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">센터 운영 프로그램</h1>

      {/* tabs */}
      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "border-accent text-accent"
                  : "border-transparent text-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 개인상담 */}
      {activeTab === "individual" && (
        <div className="mt-6">
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-medium text-foreground">개인상담이란?</span> 대학생활이나
            일상에서 혼자 풀기 어려운 주제를, 상담 전문 선생님과 1:1로 만나 깊이 있게
            다루는 상담 서비스입니다. 문제의 해결책을 찾는 것뿐 아니라, 그 과정에서
            자신을 이해하고 내적으로 성숙해지는 것을 목표로 합니다.
          </p>

          <h2 className="mt-8 text-base font-semibold text-foreground">주로 다루는 주제</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {individualTopics.map((topic) => (
              <div key={topic.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-accent">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{topic.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-base font-semibold text-foreground">
            함께 제공되는 상담 형태
          </h2>
          <InfoTable rows={individualFormatRows} />
        </div>
      )}

      {/* 심리검사 */}
      {activeTab === "test" && (
        <div className="mt-6">
          <h2 className="text-base font-semibold text-foreground">검사 영역</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {testAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-highlight px-3 py-1.5 text-sm text-highlight-foreground"
              >
                {area}
              </span>
            ))}
          </div>

          <h2 className="mt-8 text-base font-semibold text-foreground">주요 검사 종류</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {testItems.map((item) => (
              <div key={item.name} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-accent">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                {item.time && (
                  <p className="mt-2 text-xs font-medium text-muted">소요 시간: {item.time}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
            검사는 안내 → 실시 → 결과 해석상담 순으로 진행되며, 해석상담은 보통 단회기로
            이루어집니다.
          </div>
        </div>
      )}

      {/* 집단상담 */}
      {activeTab === "group" && (
        <div className="mt-6">
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-medium text-foreground">집단상담이란?</span> 비슷한
            관심사나 고민을 가진 학생들이 상담 전문 선생님과 함께 모여, 활동과 대화를
            통해 서로의 경험을 나누는 프로그램입니다.
          </p>

          <h2 className="mt-8 text-base font-semibold text-foreground">개인상담과 다른 점</h2>
          <ComparisonTable rows={groupComparisonRows} />

          <h2 className="mt-8 text-base font-semibold text-foreground">운영 방식</h2>
          <ul className="mt-3 space-y-2">
            {groupOperations.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-muted">
                · {item}
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
            운영 주제는 매 학기 달라집니다.
          </div>
        </div>
      )}

      {/* 기타 프로그램 */}
      {activeTab === "etc" && (
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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

          <h2 className="mt-8 text-base font-semibold text-foreground">
            상담 종류별 세부 프로그램
          </h2>
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
        </div>
      )}
    </PageContainer>
  );
}
