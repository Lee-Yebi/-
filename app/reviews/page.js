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
