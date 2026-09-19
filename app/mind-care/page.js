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
        <p className="mt-2 text-sm text-text-sub">
          국가정신건강정보포털의 자료를 바탕으로 정리한 주제별 정보입니다.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {diseases.map((disease) => (
            <Link
              key={disease.slug}
              href={`/mind-care/${disease.slug}`}
              className="block rounded-2xl border border-[var(--color-border)] bg-card p-6 transition-colors hover:border-leaf"
            >
              <h2 className="text-lg font-semibold text-moss">{disease.DISS_SJ}</h2>
              {topTags(disease.KEY_WORD).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {topTags(disease.KEY_WORD).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-maroon"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
