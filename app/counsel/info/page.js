"use client";

// 약도를 넣으려면
// 1) 이미지를 public/map.png 로 저장
// 2) MAP_IMAGE_SRC 를 '/map.png' 로 변경

import PageContainer from "@/components/PageContainer";
import SourceNote from "@/components/SourceNote";
import MountainIcon from "@/components/icons/MountainIcon";

const MAP_IMAGE_SRC = null; // 예: '/map.png'
const MAP_IMAGE_ALT = "덕성여자대학교 학생상담센터 약도";

const infoRows = [
  {
    label: "학기 중",
    value: "월~금 10:00 ~ 16:00 (점심시간 12:00 ~ 13:00 제외)",
  },
  {
    label: "방학 중",
    value: "기존 진행 사례와 위기상담 운영, 비대면 상담 가능",
  },
  {
    label: "위치",
    value: "덕성여자대학교 덕우당(한옥) 1층 106호 (서울 도봉구 삼양로144길 33)",
    note: [
      "휠체어를 사용하는 학생은 장애학생지원센터 내 휴게실에서 상담을 진행할 수 있습니다.",
      "신청 시 미리 알려주세요.",
    ],
  },
  { label: "전화", href: "tel:029018056", value: "02-901-8056" },
  {
    label: "이메일",
    href: "mailto:counsel@duksung.ac.kr",
    value: "counsel@duksung.ac.kr",
  },
  { label: "신청 경로", value: "학생경력개발시스템 / 비교과통합관리시스템" },
  { label: "비용", value: "재학생 대상 학내 서비스" },
];

export default function CounselInfoPage() {
  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
      <h1 className="flex items-center gap-2 text-xl font-semibold text-moss">
        <MountainIcon className="text-moss" />
        이용 안내
      </h1>

      <section className="mt-9">
        <h2 className="text-base font-semibold text-text">이용 시간 및 문의처</h2>
        <dl className="mt-4 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-card">
          {infoRows.map((row) => (
            <div key={row.label}>
              <div className="flex flex-col gap-1.5 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-4">
                <dt className="text-sm font-medium text-text">{row.label}</dt>
                <dd className="flex flex-col items-start gap-2 text-sm text-text-sub md:items-end">
                  {row.href ? (
                    <a href={row.href} className="text-moss-deep hover:opacity-80">
                      {row.value}
                    </a>
                  ) : (
                    <span>{row.value}</span>
                  )}
                  {row.badge && (
                    <span className="rounded-full border border-maroon/20 bg-blush px-3 py-1 text-xs font-semibold text-maroon">
                      {row.badge}
                    </span>
                  )}
                </dd>
              </div>
              {row.note && (
                <p className="px-5 pb-4 text-[14px] leading-relaxed text-text-sub">
                  {row.note.flatMap((line, i) => (i === 0 ? [line] : [<br key={i} />, line]))}
                </p>
              )}
            </div>
          ))}
        </dl>
      </section>

      {MAP_IMAGE_SRC && (
        <section className="mt-12">
          <h2 className="text-base font-semibold text-text">찾아오시는 길</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MAP_IMAGE_SRC}
            alt={MAP_IMAGE_ALT}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="mt-4 block h-auto w-full rounded-2xl border border-[var(--color-border)]"
          />
          <p className="mt-2 text-[14px] text-text-sub">
            {infoRows.find((row) => row.label === "위치").value}
          </p>
        </section>
      )}

      <SourceNote />
      </PageContainer>
    </div>
  );
}
