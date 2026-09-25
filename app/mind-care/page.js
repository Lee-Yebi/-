import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { loadAllDiseases } from "@/lib/mentalhealth";
import SproutIcon from "@/components/icons/SproutIcon";

function topTags(keyWord) {
  if (!keyWord) return [];
  return keyWord
    .split(",")
    .map((k) => k.replace(/&nbsp;/g, "").trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default function MindCarePage() {
  const diseases = loadAllDiseases();

  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-moss">
          <SproutIcon className="text-leaf" />
          마음 관리
        </h1>
        <p className="mt-3 text-sm text-text-sub">
          국가정신건강정보포털의 자료를 바탕으로 정리한 주제별 정보입니다.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-[14px] md:grid-cols-2">
          {diseases.map((disease) => (
            <Link
              key={disease.slug}
              href={`/mind-care/${disease.slug}`}
              className="group relative flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-card p-[22px] transition-colors duration-150 hover:border-leaf"
            >
              <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-moss">
                {disease.DISS_SJ}
              </h2>
              <div className="mt-[14px] flex min-h-[54px] flex-wrap content-start gap-[6px] pr-5">
                {topTags(disease.KEY_WORD).map((tag) => (
                  <span
                    key={tag}
                    className="flex h-6 items-center rounded-[20px] border border-sprout px-[10px] text-[12px] text-text-sub"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                aria-hidden
                className="absolute bottom-[22px] right-[22px] text-[16px] text-sprout transition-all duration-150 group-hover:translate-x-[2px] group-hover:text-moss"
              >
                ›
              </span>
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
