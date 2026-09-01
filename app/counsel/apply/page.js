"use client";

import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import SourceNote from "@/components/SourceNote";

const tabs = [
  { key: "individual", label: "개인상담" },
  { key: "test", label: "심리검사" },
  { key: "group", label: "집단상담·프로그램" },
  { key: "crisis", label: "위기상담" },
];

const tabsData = {
  individual: {
    meta: "주 1회 · 회기당 약 50분",
    steps: [
      {
        title: "신청서 작성",
        desc: "학생경력개발시스템에서 온라인으로 신청",
      },
      {
        title: "접수면접 및 심리검사",
        desc: "어떤 도움이 필요한지 파악하고, 필요한 검사를 함께 진행",
      },
      {
        title: "개인상담 진행",
        desc: "배정된 상담 선생님과 1:1로 정기 상담 시작",
      },
    ],
    note: "전체 상담 횟수는 정해져 있지 않고, 다루는 문제의 성격과 정도에 따라 조정됩니다.",
  },
  test: {
    meta: null,
    steps: [
      { title: "신청서 작성", desc: "학생경력개발시스템에서 온라인으로 신청" },
      { title: "심리검사 실시", desc: "원하는 영역에 맞는 검사를 진행" },
      { title: "해석상담 진행", desc: "상담 선생님과 함께 결과를 읽어보는 시간" },
    ],
    note: "검사만 받는 것이 아니라, 결과를 함께 읽어주는 해석상담이 반드시 따라옵니다.",
  },
  group: {
    meta: null,
    steps: [
      {
        title: "홈페이지·비교과통합관리시스템 공고",
        desc: "학생상담센터 홈페이지와 비교과통합관리시스템에 게시",
      },
      { title: "온라인 신청", desc: "비교과통합관리시스템에서 신청" },
      { title: "프로그램 참여", desc: "소그룹으로 모여 활동과 대화 진행" },
    ],
    note: "상시 접수가 아니라 모집 공고 → 신청 방식이므로, 학기 초 공지를 챙겨보는 것이 중요합니다.",
  },
};

const infoRows = [
  {
    label: "학기 중",
    value: "월~금 10:00 ~ 16:00 (점심시간 12:00 ~ 13:00 제외)",
  },
  {
    label: "방학 중",
    value: "기존 진행 사례와 위기상담만 운영",
    badge: "신규 상담 신청 불가",
  },
  {
    label: "위치",
    value: "덕성여자대학교 덕우당(한옥) 1층 106호 (서울 도봉구 삼양로144길 33)",
  },
  { label: "전화", href: "tel:0290018056", value: "02-901-8056" },
  {
    label: "이메일",
    href: "mailto:counsel@duksung.ac.kr",
    value: "counsel@duksung.ac.kr",
  },
  { label: "신청 경로", value: "학생경력개발시스템 / 비교과통합관리시스템" },
  { label: "비용", value: "재학생 대상 학내 서비스" },
];

// 개인상담 탭에 이어붙이는 내용 (/counsel/programs 개인상담 탭에서 이동)
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

// 심리검사 탭에 이어붙이는 내용 (/counsel/programs 심리검사 탭에서 이동)
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

// 집단상담·프로그램 탭에 이어붙이는 내용 (/counsel/programs 집단상담 탭에서 이동)
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

// 위기상담 탭에 이어붙이는 내용 (/external 페이지에서 이동)
const crisisSigns = [
  "일상생활이 어려울 정도의 극심한 정서적 고통과 혼란",
  "자살에 대한 생각이나 계획",
  "극심한 우울·불안, 감당하기 힘든 스트레스",
  "중독 문제",
  "폭력 피해",
];

const crisisSteps = [
  "본인 신청 또는 타인 의뢰",
  "방문·전화 접수 및 위기 정도 확인",
  "전문 상담원의 접수상담 및 위기 평가",
  "위험 수준에 따른 맞춤 개입",
];

const levelResponseRows = [
  { label: "응급 상황", value: "경찰·119 연락 및 응급의료센터 연계" },
  { label: "고위험군", value: "의뢰서 작성 후 전문 연계기관에 의뢰" },
  { label: "저위험군", value: "개인상담·심리검사 진행 및 사례회의" },
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

export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState("individual");
  const active = tabsData[activeTab];

  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">상담 신청부터 진행까지</h1>

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

      {activeTab !== "crisis" && (
        <>
          {/* (1) 한 줄 소개 */}
          <div className="mt-6 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
            {active.note}
          </div>

          {/* (2) 신청 절차 */}
          <h2 className="mt-8 text-base font-semibold text-foreground">신청 절차</h2>
          {active.meta && (
            <p className="mt-1 text-sm font-medium text-accent">{active.meta}</p>
          )}
          <ol className="mt-4 space-y-3">
            {active.steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-base font-semibold text-foreground">{step.title}</p>
                  {step.desc && (
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.desc}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* (3) 구분선 */}
          <hr className="mt-10 border-border" />
        </>
      )}

      {/* 위기상담: 노란 안내 박스 -> 이럴 때는 바로 연락하세요 -> 진행 절차 -> 수준별 대응 (external 페이지에서 이동) */}
      {activeTab === "crisis" && (
        <>
          <div className="mt-6 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
            평소의 대처 방법으로는 감당하기 어려운 상태라면 위기상담 대상입니다.
          </div>

          <h2 className="mt-8 text-base font-semibold text-foreground">
            이럴 때는 바로 연락하세요
          </h2>
          <ul className="mt-4 space-y-2 rounded-xl border border-border bg-card p-5">
            {crisisSigns.map((sign) => (
              <li key={sign} className="text-sm leading-relaxed text-muted">
                · {sign}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-base font-semibold text-foreground">진행 절차</h2>
          <ol className="mt-4 space-y-3">
            {crisisSteps.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-base font-semibold text-foreground">{step}</p>
              </li>
            ))}
          </ol>

          <hr className="mt-10 border-border" />

          <div className="mt-8">
            <h2 className="text-base font-semibold text-foreground">수준별 대응</h2>
            <InfoTable rows={levelResponseRows} labelHeader="수준" valueHeader="대응" />
          </div>

          <div className="mt-8 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
            지금 도움이 필요하다면{" "}
            <a href="tel:109" className="font-semibold underline underline-offset-2">
              109
            </a>
            (자살예방 상담전화·24시간)로 바로 연락하세요. 교내 상담은{" "}
            <a href="tel:029018056" className="font-semibold underline underline-offset-2">
              02-901-8056
            </a>
            입니다.
          </div>
        </>
      )}

      {/* (4) 상세 내용 */}
      {/* 개인상담: 프로그램 상세 (programs 페이지에서 이동) */}
      {activeTab === "individual" && (
        <div className="mt-8">
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

      {/* 심리검사: 프로그램 상세 (programs 페이지에서 이동) */}
      {activeTab === "test" && (
        <div className="mt-8">
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

      {/* 집단상담·프로그램: 프로그램 상세 (programs 페이지에서 이동) */}
      {activeTab === "group" && (
        <div className="mt-8">
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

      {/* common info */}
      <section className="mt-10">
        <h2 className="text-base font-semibold text-foreground">이용 시간 및 문의처</h2>
        <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1.5 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-4"
            >
              <dt className="text-sm font-medium text-foreground">{row.label}</dt>
              <dd className="flex flex-col items-start gap-2 text-sm text-muted md:items-end">
                {row.href ? (
                  <a href={row.href} className="text-accent hover:text-accent-2">
                    {row.value}
                  </a>
                ) : (
                  <span>{row.value}</span>
                )}
                {row.badge && (
                  <span className="rounded-full border border-highlight-border bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">
                    {row.badge}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <SourceNote />
    </PageContainer>
  );
}
