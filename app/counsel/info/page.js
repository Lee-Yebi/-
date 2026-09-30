"use client";

// 약도를 넣으려면
// 1) 이미지를 public/map.png 로 저장
// 2) MAP_IMAGE_SRC 를 '/map.png' 로 변경

import PageContainer from "@/components/PageContainer";
import SourceNote from "@/components/SourceNote";
import MountainIcon from "@/components/icons/MountainIcon";
import DecoImage from "@/components/Deco";

const MAP_IMAGE_SRC = "/map.png";
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
    note: ["정문에서 도보 3분, 후문에서 도보 6분"],
    link: { label: "네이버 지도에서 보기 ↗", href: "https://naver.me/FEUSCKS3" },
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
            <div
              key={row.label}
              className="flex flex-col items-start gap-4 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <dt className="flex-none text-left text-xs font-semibold text-text">{row.label}</dt>
              <dd className="min-w-0 flex-1 text-left text-sm leading-relaxed text-text-sub sm:text-right">
                {row.href ? (
                  <a href={row.href} className="text-moss-deep hover:opacity-80">
                    {row.value}
                  </a>
                ) : (
                  <span>{row.value}</span>
                )}
                {row.link && (
                  <a
                    href={row.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-moss-deep underline underline-offset-2"
                  >
                    {row.link.label}
                  </a>
                )}
                {row.note && (
                  <p className="mt-1.5 text-[14px] leading-relaxed text-text-sub">
                    {row.note.flatMap((line, i) => (i === 0 ? [line] : [<br key={i} />, line]))}
                  </p>
                )}
                {row.badge && (
                  <span className="mt-1 inline-block rounded-full border border-maroon/20 bg-blush px-3 py-1 text-xs font-semibold text-maroon">
                    {row.badge}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-base font-semibold text-text">
          <DecoImage src="/oreumi_hiking_left.png" className="hidden w-14 shrink-0 sm:block" />
          찾아오시는 길
        </h2>
        {MAP_IMAGE_SRC && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={MAP_IMAGE_SRC}
            alt={MAP_IMAGE_ALT}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="mt-4 block h-auto w-full rounded-2xl border border-[var(--color-border)]"
          />
        )}
        <p className={`text-[14px] text-text-sub ${MAP_IMAGE_SRC ? "mt-2" : "mt-4"}`}>
          {infoRows.find((row) => row.label === "위치").value}
        </p>
      </section>

      <SourceNote />
      </PageContainer>
    </div>
  );
}
