"use client";

import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import SourceNote from "@/components/SourceNote";

const tabs = [
  { key: "individual", label: "개인상담" },
  { key: "test", label: "심리검사" },
  { key: "group", label: "집단상담·프로그램" },
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
      { title: "신청서 작성", desc: null },
      { title: "심리검사 실시", desc: null },
      { title: "해석상담 진행", desc: null },
    ],
    note: "검사만 받고 끝나는 것이 아니라, 결과를 함께 읽어주는 해석상담이 반드시 따라옵니다.",
  },
  group: {
    meta: null,
    steps: [
      { title: "홈페이지·비교과통합관리시스템 공고", desc: null },
      { title: "온라인 신청", desc: null },
      { title: "프로그램 참여", desc: null },
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

      {/* tab content */}
      <div className="mt-6">
        {active.meta && (
          <p className="text-sm font-medium text-accent">{active.meta}</p>
        )}

        <ol className={active.meta ? "mt-4 space-y-3" : "space-y-3"}>
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

        {active.note && (
          <div className="mt-4 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
            {active.note}
          </div>
        )}
      </div>

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
