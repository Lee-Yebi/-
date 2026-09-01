"use client";

import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { supabase } from "@/lib/supabaseClient";

const reviewTypes = ["학습", "진로·취업", "심리", "집단", "심리검사"];
const MIN_LENGTH = 20;

export default function NewReviewPage() {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const trimmedLength = content.trim().length;
  const canSubmit = Boolean(type) && trimmedLength >= MIN_LENGTH && !submitting;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    if (!supabase) {
      setError("후기 저장 기능이 아직 설정되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setSubmitting(true);
    setError("");

    const { error: insertError } = await supabase.from("reviews").insert({
      type,
      content: content.trim(),
      status: "pending",
    });

    setSubmitting(false);

    if (insertError) {
      setError("후기를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <PageContainer>
        <h1 className="text-xl font-semibold text-foreground">
          소중한 후기 감사합니다. 검토 후 게시됩니다.
        </h1>

        <div className="mt-6 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
          혼자 감당하기 어려운 일이 있다면{" "}
          <a href="tel:109" className="font-semibold underline underline-offset-2">
            109
          </a>
          (자살예방 상담전화·24시간)로 언제든 연락하세요.
          <br />
          교내 상담은{" "}
          <a href="tel:029018056" className="font-semibold underline underline-offset-2">
            02-901-8056
          </a>
          입니다.
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">후기 작성</h1>

      <div className="mt-6 rounded-xl border border-highlight-border bg-highlight p-5 text-sm leading-relaxed text-highlight-foreground">
        작성한 후기는 검토 후 게시됩니다.
        <br />
        이름이나 학번 등 본인을 알아볼 수 있는 정보는 적지 말아주세요.
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>
        <span className="text-sm font-medium text-foreground">상담 유형</span>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="상담 유형">
          {reviewTypes.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={type === t}
              onClick={() => setType(t)}
              className={`flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                type === t
                  ? "bg-accent text-white"
                  : "border border-border bg-card text-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <label
          htmlFor="review-content"
          className="mt-6 block text-sm font-medium text-foreground"
        >
          후기 내용
        </label>
        <textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="상담 경험을 자유롭게 남겨주세요."
          className="mt-2 w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <p className="mt-1 text-xs text-muted">
          {trimmedLength}/{MIN_LENGTH}자 이상
        </p>

        {error && <p className="mt-3 text-sm font-medium text-accent">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "제출 중…" : "제출하기"}
        </button>
      </form>
    </PageContainer>
  );
}
