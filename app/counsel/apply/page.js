"use client";

import { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import SourceNote from "@/components/SourceNote";
import MountainIcon from "@/components/icons/MountainIcon";
import DecoImage from "@/components/Deco";

const tabs = [
  { key: "individual", label: "개인상담" },
  { key: "test", label: "해석상담" },
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
        link: { label: "학생경력개발시스템 바로가기", href: "https://job.duksung.ac.kr/" },
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
      {
        title: "신청서 작성",
        desc: "학생경력개발시스템에서 온라인으로 신청",
        link: { label: "학생경력개발시스템 바로가기", href: "https://job.duksung.ac.kr/" },
      },
      {
        title: "심리검사 실시",
        desc: "원하는 영역에 맞는 검사를 진행",
        tip: "상담은 필요한 검사를 완료한 후 진행되며, 검사를 빠르게 완료할수록 대기 기간이 짧아질 수 있습니다.",
      },
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
        link: {
          label: "비교과통합관리시스템(De:light) 바로가기",
          href: "https://delight.duksung.ac.kr/",
        },
      },
      {
        title: "온라인 신청",
        desc: "비교과통합관리시스템에서 신청",
        link: {
          label: "비교과통합관리시스템(De:light) 바로가기",
          href: "https://delight.duksung.ac.kr/",
        },
      },
      { title: "프로그램 참여", desc: "소그룹으로 모여 활동과 대화 진행" },
    ],
    note: "상시 접수가 아니라 모집 공고 → 신청 방식이므로, 학기 초 공지를 챙겨보는 것이 중요합니다.",
  },
};

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
const individualTraits = [
  "전문 상담자와 1:1로 진행돼요",
  "남에게 말하기 어려운 이야기도 편하게 꺼낼 수 있어요",
  "문제가 급하거나 복잡할 때, 여러 사람 앞에서 얘기하는 게 부담스러울 때 더 잘 맞아요",
];

const groupTraits = [
  "비슷한 고민을 가진 사람들 8~15명 정도가 함께해요",
  "서로 공감하고 실시간으로 피드백을 주고받으며 새로운 시각을 얻을 수 있어요",
  "사람들과 어울리는 연습이나 소속감·유대감이 필요할 때 더 잘 맞아요",
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

function InfoLink() {
  return (
    <Link
      href="/counsel/info"
      className="mt-9 inline-block text-[14px] text-moss-deep underline underline-offset-2"
    >
      이용 시간과 위치 보기
    </Link>
  );
}

function InfoTable({ rows, labelHeader = "구분", valueHeader = "내용" }) {
  return (
    <>
      <div className="mt-4 space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl border border-[var(--color-border)] bg-card p-4">
            <p className="text-sm font-medium text-text">{row.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-text-sub">{row.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-[var(--color-border)] md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-border)]/20 text-text">
              <th className="px-4 py-3 font-medium">{labelHeader}</th>
              <th className="px-4 py-3 font-medium">{valueHeader}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)] bg-card">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 font-medium text-text">{row.label}</td>
                <td className="px-4 py-3 text-text-sub">{row.value}</td>
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
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
      <h1 className="flex items-center gap-2 text-xl font-semibold text-moss">
        <MountainIcon className="text-moss" />
        상담 신청부터 진행까지
      </h1>

      {/* tabs */}
      <div className="mt-9 overflow-x-auto">
        <div className="flex gap-6 border-b border-[var(--color-border)]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "border-moss text-moss"
                  : "border-transparent text-text-sub"
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
          {activeTab !== "test" && (
            <div className="mt-9 rounded-2xl border border-maroon/20 bg-blush p-6 text-sm leading-relaxed text-maroon">
              {active.note}
            </div>
          )}

          {/* (2) 신청 절차 */}
          <h2 className="relative mt-12 text-base font-semibold text-text">
            신청 절차
            {activeTab === "individual" && (
              <DecoImage
                src="/oreumi_fighting.png"
                className="absolute top-1/2 right-0 w-[72px] -translate-y-1/2"
              />
            )}
          </h2>
          {active.meta && (
            <p className="mt-1 text-sm font-medium text-moss">{active.meta}</p>
          )}
          <ol className="mt-4 space-y-3">
            {active.steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-card p-6"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moss-deep text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-base font-semibold text-text">{step.title}</p>
                  {step.desc && (
                    <p className="mt-1 text-sm leading-relaxed text-text-sub">{step.desc}</p>
                  )}
                  {step.tip && (
                    <p className="mt-[6px] text-[13px] text-text-sub">
                      <span className="font-semibold text-moss">TIP</span> {step.tip}
                    </p>
                  )}
                  {step.link && (
                    <a
                      href={step.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-[6px] inline-block text-[14px] text-moss-deep underline underline-offset-2"
                    >
                      {step.link.label} ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* (3) 구분선 */}
          <hr className="mt-[60px] border-[var(--color-border)]" />
        </>
      )}

      {/* 위기상담: 노란 안내 박스 -> 이럴 때는 바로 연락하세요 -> 진행 절차 -> 수준별 대응 (external 페이지에서 이동) */}
      {activeTab === "crisis" && (
        <>
          <h2 className="mt-9 text-base font-semibold text-text">
            이럴 때는 바로 연락하세요
          </h2>
          <ul className="mt-4 space-y-2 rounded-2xl border border-[var(--color-border)] bg-card p-6">
            {crisisSigns.map((sign) => (
              <li key={sign} className="text-sm leading-relaxed text-text-sub">
                · {sign}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-base font-semibold text-text">진행 절차</h2>
          <ol className="mt-4 space-y-3">
            {crisisSteps.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-card p-6"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moss-deep text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-base font-semibold text-text">{step}</p>
              </li>
            ))}
          </ol>

          <hr className="mt-[60px] border-[var(--color-border)]" />

          <div className="mt-12">
            <h2 className="text-base font-semibold text-text">수준별 대응</h2>
            <InfoTable rows={levelResponseRows} labelHeader="수준" valueHeader="대응" />
          </div>

          <div className="mt-12 rounded-2xl border border-maroon/20 bg-blush p-6 text-sm leading-relaxed text-maroon">
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

          <InfoLink />
        </>
      )}

      {/* (4) 상세 내용 */}
      {/* 개인상담: 프로그램 상세 (programs 페이지에서 이동) */}
      {activeTab === "individual" && (
        <div className="mt-12">
          <p className="text-sm leading-relaxed text-text-sub">
            <span className="font-medium text-text">개인상담이란?</span> 대학생활이나
            일상에서 혼자 풀기 어려운 주제를, 상담 전문 선생님과 1:1로 만나 깊이 있게
            다루는 상담 서비스입니다. 문제의 해결책을 찾는 것뿐 아니라, 그 과정에서
            자신을 이해하고 내적으로 성숙해지는 것을 목표로 합니다.
          </p>

          <h2 className="mt-12 text-base font-semibold text-text">주로 다루는 주제</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {individualTopics.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-[var(--color-border)] bg-card p-6">
                <h3 className="text-base font-semibold text-moss">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-sub">{topic.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-base font-semibold text-text">
            함께 제공되는 상담 형태
          </h2>
          <InfoTable rows={individualFormatRows} />

          <InfoLink />
        </div>
      )}

      {/* 심리검사: 프로그램 상세 (programs 페이지에서 이동) */}
      {activeTab === "test" && (
        <div className="mt-12">
          <h2 className="text-base font-semibold text-text">검사 영역</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {testAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-blush px-3 py-1.5 text-sm text-maroon"
              >
                {area}
              </span>
            ))}
          </div>

          <h2 className="mt-12 text-base font-semibold text-text">주요 검사 종류</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {testItems.map((item) => (
              <div key={item.name} className="rounded-2xl border border-[var(--color-border)] bg-card p-6">
                <h3 className="text-base font-semibold text-moss">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-sub">{item.desc}</p>
                {item.time && (
                  <p className="mt-2 text-xs font-medium text-text-sub">소요 시간: {item.time}</p>
                )}
              </div>
            ))}
          </div>

          <InfoLink />
        </div>
      )}

      {/* 집단상담·프로그램: 프로그램 상세 (programs 페이지에서 이동) */}
      {activeTab === "group" && (
        <div className="mt-12">
          <p className="text-sm leading-relaxed text-text-sub">
            <span className="font-medium text-text">집단상담이란?</span> 상담 전문가
            선생님과 비슷한 관심사를 가진 학생들과 함께 모여 여러 활동이나 대화를
            통해서 자신의 경험을 나누고 공감함으로써 자신과 타인을 보다 잘 이해하게
            되어 내적인 성장을 돕는 프로그램입니다. 집단상담의 종류로는 긍정적
            자아상/자기표현향상/발표불안감소/마음챙김명상/대인관계향상/진로탐색
            프로그램 등이 있습니다. 진행하는 집단상담의 주제는 매학기 변동될 수
            있으며 일시는 게시판에 공고합니다.
          </p>
          <p className="mt-2 text-[12px] text-text-sub">
            출처:{" "}
            <a
              href="https://www.duksung.ac.kr/contents/contents.do?ciIdx=327&menuId=1246"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-moss-deep"
            >
              덕성여자대학교 공식 홈페이지
            </a>{" "}
            — 대학생활 &gt; 학생상담센터 안내, 2026.9 확인
          </p>

          <h2 className="mt-12 text-base font-semibold text-text">개인상담과 다른 점</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-border)] bg-card p-6">
              <h3 className="text-base font-semibold text-moss">개인상담</h3>
              <ul className="mt-3 space-y-2">
                {individualTraits.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-text-sub">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-card p-6">
              <h3 className="text-base font-semibold text-moss">집단상담</h3>
              <ul className="mt-3 space-y-2">
                {groupTraits.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-text-sub">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-2 text-[12px] text-text-sub">
            참고: 최낙현(수원시청소년육성재단 청소년상담센터 상담사),{" "}
            <a
              href="https://www.kyeonggi.com/article/201707180933865"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-moss-deep"
            >
              「[청소년상담] 개인상담과 집단상담의 차이」
            </a>
            , 경기신문, 2017.7.18.
          </p>

          <h2 className="mt-12 text-base font-semibold text-text">운영 방식</h2>
          <ul className="mt-3 space-y-2">
            {groupOperations.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-text-sub">
                · {item}
              </li>
            ))}
          </ul>

          <InfoLink />
        </div>
      )}

      <SourceNote />
      </PageContainer>
    </div>
  );
}
