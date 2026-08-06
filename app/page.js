import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">메인</h1>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <Link
          href="/counsel"
          className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-accent px-5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-2"
        >
          상담 알아보기
        </Link>
        <Link
          href="/mind-care"
          className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border bg-card px-5 text-center text-sm font-medium text-accent transition-colors hover:bg-border/20"
        >
          마음 관리
        </Link>
      </div>
    </PageContainer>
  );
}
