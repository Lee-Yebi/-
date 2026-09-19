import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { loadAllDiseases } from "@/lib/mentalhealth";

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
    <PageContainer>
      <h1 className="text-xl font-semibold">마음 관리</h1>
      <p className="mt-2 text-sm text-muted">
        국가정신건강정보포털의 자료를 바탕으로 정리한 주제별 정보입니다.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {diseases.map((disease) => (
          <Link
            key={disease.slug}
            href={`/mind-care/${disease.slug}`}
            className="block rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
          >
            <h2 className="text-lg font-semibold text-accent">{disease.DISS_SJ}</h2>
            {topTags(disease.KEY_WORD).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {topTags(disease.KEY_WORD).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-highlight px-3 py-1 text-xs font-medium text-highlight-foreground"
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
  );
}
