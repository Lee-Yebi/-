"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { supabase } from "@/lib/supabaseClient";

const filters = ["전체", "학습", "진로·취업", "심리", "집단", "심리검사"];

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!supabase) {
        setError("후기 목록 기능이 아직 설정되지 않았습니다.");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("reviews")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError("후기 목록을 불러오지 못했습니다.");
      } else {
        setReviews(data ?? []);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleReviews =
    activeFilter === "전체"
      ? reviews
      : reviews.filter((review) => review.category === activeFilter);

  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">이용후기</h1>

      <Link
        href="/reviews/new"
        className="mt-4 flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-2"
      >
        후기 작성하기
      </Link>

      <details className="group mt-6 rounded-xl border border-highlight-border bg-highlight p-5">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-accent marker:content-none">
          이용후기 가이드 필독
          <span
            aria-hidden
            className="shrink-0 text-accent transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>

        <div className="mt-4 text-[15px] leading-[1.7] text-foreground">
          <p>
            이용후기 게시판은 여러분이 학생상담센터와 관련된 경험을 나눌 수 있는 공간입니다.
            아래 가이드를 읽으신 후 규칙에 맞춰 작성 부탁드립니다.
          </p>

          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>상담사 선생님을 특정할 수 있는 정보(이름, 외모 등)는 빼고 써주세요.</li>
            <li>다른 학우의 개인정보(이름, 학번 등)는 언급하지 말아주세요.</li>
            <li>
              상담사나 학생상담센터에 대한 불편한 점이 있으셨다면, 아래 예시를 참고하여
              적어주세요.
            </li>
          </ol>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-border bg-card p-[18px]">
              <p className="font-semibold text-foreground">
                이런 후기, 다른 학우들에게 큰 도움이 돼요 👍
              </p>

              <div className="mt-3 space-y-2">
                {[
                  "심리상담을 받았는데, 제 자신을 더 잘 이해할 수 있는 시간이었어요.",
                  "학업 스트레스로 신청했는데, 생각보다 대기가 길어서 아쉬웠어요.",
                  "집단상담에 참여했는데, 비슷한 고민을 가진 사람들과 얘기하니 위로가 됐어요.",
                ].map((quote) => (
                  <p
                    key={quote}
                    className="border-l-2 border-highlight-border pl-3 text-foreground"
                  >
                    &quot;{quote}&quot;
                  </p>
                ))}
              </div>

              <p className="mt-3 text-sm text-muted">
                어떤 경험이었는지 구체적으로 적어주시면, 비슷한 고민을 가진 다른 학우가
                상담을 결정하는 데 실질적인 도움이 돼요. 좋았던 점도, 아쉬웠던 점도 모두
                환영이에요.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-[18px]">
              <p className="font-semibold text-foreground">
                이런 후기는 이렇게 다듬어서 올려주세요 ✏️
              </p>

              <p className="mt-3 text-accent-2">
                <span aria-hidden>❌</span> &quot;○○상담사 겁나 별로임. 가지 마셈.&quot;
              </p>
              <p className="mt-3 text-sm text-muted">
                특정 상담사를 지목하는 표현이 담기면 게시가 어렵습니다. 또한 &quot;별로다&quot;라는
                감상만으론, 읽는 사람이 실제로 어떤 점을 조심해야 할지 알기 어렵습니다.
              </p>

              <hr className="my-4 border-border" />

              <p className="text-sm font-semibold text-foreground">이렇게 바꿔볼 수 있어요</p>

              <p className="mt-2 text-accent">
                <span aria-hidden>✅</span> &quot;제 얘기를 충분히 들어주지 않는다는 느낌을
                받았어요. 상담 중간에 말이 자주 끊겨서 아쉬웠습니다.&quot;
              </p>
              <p className="mt-3 text-sm text-muted">
                상담사를 특정하지 않아도, 어떤 상황에서 어떤 점이 아쉬웠는지는 그대로
                전달되기 때문에, 부정적인 경험도 이렇게 적어주시면 있는 그대로 게시됩니다.
              </p>
            </div>
          </div>
        </div>
      </details>

      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? "bg-accent text-white"
                  : "border border-border bg-card text-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-muted">불러오는 중…</p>}

        {!loading && error && <p className="text-sm font-medium text-accent">{error}</p>}

        {!loading && !error && visibleReviews.length === 0 && (
          <p className="rounded-xl border border-border bg-card p-5 text-center text-sm text-muted">
            아직 등록된 후기가 없습니다
          </p>
        )}

        {!loading &&
          !error &&
          visibleReviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-highlight px-3 py-1 text-xs font-medium text-highlight-foreground">
                  {review.category}
                </span>
                <span className="text-xs text-[#8C8087]">{formatDate(review.created_at)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{review.content}</p>
            </div>
          ))}
      </div>
    </PageContainer>
  );
}
