import { notFound } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { SLUGS, loadDisease } from "@/lib/mentalhealth";
import SproutIcon from "@/components/icons/SproutIcon";

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function DiseasePage({ params }) {
  const { slug } = await params;
  const disease = loadDisease(slug);
  if (!disease) notFound();

  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-moss">
          <SproutIcon className="text-leaf" />
          {disease.DISS_SJ}
        </h1>

        {disease.keywords.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {disease.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-maroon"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        <div className="mt-9 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-card">
          {disease.sections.map((section, i) => (
            <details key={section.num} className="group px-4 py-3" open={i === 0}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-text marker:content-none">
                {section.title === "Intro" ? "개요" : section.title}
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-text-sub transition-transform group-open:rotate-180"
                >
                  <path d="M5 7.5 L10 12.5 L15 7.5" />
                </svg>
              </summary>
              <div
                className="diss-body mt-2 text-[15px] leading-[1.7] text-text"
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            </details>
          ))}
        </div>

        <p className="mt-12 text-[13px] text-text-sub">
          이 정보는 이해를 돕기 위한 일반적인 설명이며, 진단이나 치료를 대신하지 않습니다.
        </p>

        <div className="mt-2 rounded-2xl border border-[var(--color-border)] bg-card p-4 text-[13px] leading-[1.6] text-text-sub">
          본 저작물은 &apos;국가정신건강정보포털&apos;에서 작성하여 공공누리 제4유형으로
          개방한 &apos;{disease.DISS_SJ}&apos;(작성자: 보건복지부 국립정신건강센터,
          대한신경정신의학회)을 이용하였으며, 해당 저작물은 &apos;국가정신건강정보포털&apos;,{" "}
          <a
            href="https://www.mentalhealth.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-moss-deep"
          >
            www.mentalhealth.go.kr
          </a>{" "}
          에서 무료로 다운받으실 수 있습니다.
        </div>

        <div className="mt-9 rounded-2xl border border-maroon/20 bg-blush p-5 text-sm leading-relaxed text-maroon">
          혼자 감당하기 어렵다면 교내 상담을 신청해보세요.{" "}
          <a href="tel:029018056" className="font-semibold underline underline-offset-2">
            02-901-8056
          </a>
          <br />
          지금 많이 힘드시다면{" "}
          <a href="tel:109" className="font-semibold underline underline-offset-2">
            109
          </a>
          (자살예방 상담전화·24시간)로 바로 연락하셔도 됩니다.
        </div>

        <Link
          href="/counsel/apply"
          className="mt-3 flex min-h-11 w-full items-center justify-center rounded-2xl bg-moss-deep px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          상담 신청부터 진행까지 보기
        </Link>
      </PageContainer>
    </div>
  );
}
