import { notFound } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { SLUGS, loadDisease } from "@/lib/mentalhealth";

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function DiseasePage({ params }) {
  const { slug } = await params;
  const disease = loadDisease(slug);
  if (!disease) notFound();

  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">{disease.DISS_SJ}</h1>

      {disease.keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {disease.keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-highlight px-3 py-1 text-xs font-medium text-highlight-foreground"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {disease.sections.map((section, i) => (
          <details key={section.num} className="group px-4 py-3" open={i === 0}>
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-foreground marker:content-none">
              {section.title === "Intro" ? "개요" : section.title}
              <span
                aria-hidden
                className="shrink-0 text-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div
              className="diss-body mt-2 text-[15px] leading-[1.7] text-foreground"
              dangerouslySetInnerHTML={{ __html: section.html }}
            />
          </details>
        ))}
      </div>

      <p className="mt-8 text-[13px] text-muted">
        이 정보는 이해를 돕기 위한 일반적인 설명이며, 진단이나 치료를 대신하지 않습니다.
      </p>

      <div className="mt-2 rounded-xl border border-border bg-card p-4 text-[13px] leading-[1.6] text-muted">
        본 저작물은 &apos;국가정신건강정보포털&apos;에서 작성하여 공공누리 제4유형으로
        개방한 &apos;{disease.DISS_SJ}&apos;(작성자: 보건복지부 국립정신건강센터,
        대한신경정신의학회)을 이용하였으며, 해당 저작물은 &apos;국가정신건강정보포털&apos;,{" "}
        <a
          href="https://www.mentalhealth.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          www.mentalhealth.go.kr
        </a>{" "}
        에서 무료로 다운받으실 수 있습니다.
      </div>

      <div className="mt-6 rounded-xl border border-crisis-border bg-crisis p-5 text-sm leading-relaxed text-crisis-foreground">
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
        className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-2"
      >
        상담 신청부터 진행까지 보기
      </Link>
    </PageContainer>
  );
}
