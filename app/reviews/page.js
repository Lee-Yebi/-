"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { supabase } from "@/lib/supabaseClient";

const filters = ["전체", "심리", "집단", "심리검사"];

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
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
      <h1 className="text-xl font-semibold text-moss">이용후기</h1>

      <Link
        href="/reviews/new"
        className="mt-4 flex min-h-11 w-full items-center justify-center rounded-2xl bg-moss-deep px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        후기 작성하기
      </Link>

      <div className="mt-9 rounded-2xl border border-maroon/25 bg-blush p-[18px] text-[15px] leading-[1.7] text-maroon">
        상담 과정에서 느낀 불편한 점이 있다면, 접수실 조교 선생님이나{" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdeczpU3kP8Wy4eIPYFP6UaOnscbsjPuI7JDRBmPq4bmDURPg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="text-maroon underline underline-offset-2"
        >
          설문 링크
        </a>
        를 통해 말씀해 주세요. 상담사 교체, 불편사항 모두 가능합니다.
      </div>

      <details className="group mt-9 rounded-2xl border border-maroon/20 bg-blush p-6">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-moss marker:content-none">
          이용후기 가이드 필독
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 text-moss transition-transform group-open:rotate-180"
          >
            <path d="M5 7.5 L10 12.5 L15 7.5" />
          </svg>
        </summary>

        <div className="mt-4 text-[15px] leading-[1.7] text-text">
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
            <li>
              학습과 진로·취업 관련 상담은 학생상담센터 관할이 아니어서 이용후기 대상에서
              제외했습니다. 심리상담, 집단상담, 심리검사 경험을 나눠주세요.
            </li>
          </ol>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-[var(--color-border)] bg-card p-[18px]">
              <p className="font-semibold text-text">
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
                    className="border-l-2 border-maroon/20 pl-3 text-text"
                  >
                    &quot;{quote}&quot;
                  </p>
                ))}
              </div>

              <p className="mt-3 text-sm text-text-sub">
                어떤 경험이었는지 구체적으로 적어주시면, 비슷한 고민을 가진 다른 학우가
                상담을 결정하는 데 실질적인 도움이 돼요. 좋았던 점도, 아쉬웠던 점도 모두
                환영이에요.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-card p-[18px]">
              <p className="font-semibold text-text">
                이런 후기는 이렇게 다듬어서 올려주세요 ✏️
              </p>

              <p className="mt-3 text-text-sub">
                <span aria-hidden>❌</span> &quot;○○상담사 겁나 별로임. 가지 마셈.&quot;
              </p>
              <p className="mt-3 text-sm text-text-sub">
                특정 상담사를 지목하는 표현이 담기면 게시가 어렵습니다. 또한 &quot;별로다&quot;라는
                감상만으론, 읽는 사람이 실제로 어떤 점을 조심해야 할지 알기 어렵습니다.
              </p>

              <hr className="my-4 border-[var(--color-border)]" />

              <p className="text-sm font-semibold text-text">이렇게 바꿔볼 수 있어요</p>

              <p className="mt-2 text-moss">
                <span aria-hidden>✅</span> &quot;제 얘기를 충분히 들어주지 않는다는 느낌을
                받았어요. 상담 중간에 말이 자주 끊겨서 아쉬웠습니다.&quot;
              </p>
              <p className="mt-3 text-sm text-text-sub">
                상담사를 특정하지 않아도, 어떤 상황에서 어떤 점이 아쉬웠는지는 그대로
                전달되기 때문에, 부정적인 경험도 이렇게 적어주시면 있는 그대로 게시됩니다.
              </p>
            </div>
          </div>

          <hr className="mt-5 border-[var(--color-border)]" />

          <p className="mt-4 text-[14px] leading-[1.7] text-text-sub">
            상담센터에 직접 후기를 남기고 싶다면{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSebPWGMsBQJB_FMBAWtEW1_a5-_gGMHzZQ2a4mVYpgFl97lvw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-moss-deep underline underline-offset-2"
            >
              학생상담센터 이용후기 폼
            </a>
            을 이용하실 수도 있습니다.
          </p>
        </div>
      </details>

      <div className="mt-9 overflow-x-auto">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? "bg-moss-deep text-white"
                  : "border border-[var(--color-border)] bg-card text-text-sub"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-9 space-y-3">
        {loading && <p className="text-sm text-text-sub">불러오는 중…</p>}

        {!loading && error && <p className="text-sm font-medium text-maroon">{error}</p>}

        {!loading && !error && visibleReviews.length === 0 && (
          <p className="rounded-2xl border border-[var(--color-border)] bg-card p-6 text-center text-sm text-text-sub">
            아직 등록된 후기가 없습니다
          </p>
        )}

        {!loading &&
          !error &&
          visibleReviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-[var(--color-border)] bg-card p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-maroon">
                  {review.category}
                </span>
                <span className="text-xs text-[#8C8087]">{formatDate(review.created_at)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text">{review.content}</p>
            </div>
          ))}
      </div>
      </PageContainer>
    </div>
  );
}
